import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import javascriptLanguage from '@treelight/javascript';
import javascriptBrowserLanguage from '@treelight/javascript/browser';
import javascriptEmbeddedLanguage from '@treelight/javascript/embedded';
import test from 'ava';
import { build } from 'vite';
import treelight from '../../core/dist/index.js';

const { Treelight } = treelight;

test.serial(
  'concurrent browser language loads fetch their grammar only once',
  async (t) => {
    const wasmPath = fileURLToPath(
      new URL(
        '../../languages/javascript/dist/wasm/tree-sitter-javascript.wasm',
        import.meta.url,
      ),
    );
    const wasm = await readFile(wasmPath);
    const wasmUrl = `data:application/wasm;base64,${wasm.toString('base64')}`;
    const isolated = new Treelight();
    const definition = {
      ...javascriptBrowserLanguage,
      wasmUrl,
    };
    isolated.registerLanguage('javascript-a', definition);
    isolated.registerLanguage('javascript-b', definition);

    const originalFetch = globalThis.fetch;
    let grammarRequests = 0;
    globalThis.fetch = (...args) => {
      if (args[0] === wasmUrl) {
        grammarRequests += 1;
      }
      return originalFetch(...args);
    };
    t.teardown(() => {
      globalThis.fetch = originalFetch;
    });

    const [first, duplicate, alias] = await Promise.all([
      isolated.loadLanguage('javascript-a'),
      isolated.loadLanguage('javascript-a'),
      isolated.loadLanguage('javascript-b'),
    ]);
    const cachedAlias = await isolated.loadLanguage('javascript-b');

    t.is(grammarRequests, 1);
    t.is(first, duplicate);
    t.is(first, alias);
    t.is(first, cachedAlias);
  },
);

test('failed language loads can be retried', async (t) => {
  let attempts = 0;
  const isolated = new Treelight();
  isolated.registerLanguage('javascript', async () => {
    attempts += 1;
    if (attempts === 1) {
      throw new Error('temporary failure');
    }
    return javascriptLanguage;
  });

  await t.throwsAsync(isolated.loadLanguage('javascript'), {
    message: 'temporary failure',
  });
  await isolated.loadLanguage('javascript');

  t.is(attempts, 2);
});

test('Node language imports use the embedded grammar', (t) => {
  t.truthy(javascriptLanguage.wasm);
  t.falsy(javascriptLanguage.wasmUrl);
  t.deepEqual(javascriptLanguage, javascriptEmbeddedLanguage);
});

test.serial(
  'Vite resolves bare language imports to hashed WASM assets',
  async (t) => {
    const fixture = fileURLToPath(
      new URL('../fixtures/browser-assets', import.meta.url),
    );
    const outDir = await mkdtemp(path.join(tmpdir(), 'treelight-vite-'));
    t.teardown(() => rm(outDir, { recursive: true, force: true }));

    await build({
      root: fixture,
      logLevel: 'silent',
      build: {
        emptyOutDir: true,
        outDir,
      },
    });

    const assetDir = path.join(outDir, 'assets');
    const assets = await readdir(assetDir);
    const grammarAssets = assets.filter(
      (name) => name.startsWith('tree-sitter-sql-') && name.endsWith('.wasm'),
    );
    const javascript = await Promise.all(
      assets
        .filter((name) => name.endsWith('.js'))
        .map((name) => readFile(path.join(assetDir, name), 'utf8')),
    );

    t.is(grammarAssets.length, 1);
    t.false(
      javascript.some((chunk) => chunk.includes('data:application/wasm')),
    );
    t.false(javascript.some((chunk) => chunk.includes('AGFzbQ')));
  },
);
