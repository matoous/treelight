#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { constants as fsConstants } from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const execFileAsync = promisify(execFile);
const { access, mkdir, writeFile } = fsPromises;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

function usage() {
  console.log(`Usage:
  node scripts/create-language-package.mjs --name <folder-name> --repo <owner/repo> --version <tag> --artifact <filename> [--id <language-id>]

Example:
  npm run create:language -- --name rust --repo tree-sitter/tree-sitter-rust --version v0.23.0 --artifact tree-sitter-rust.wasm
`);
}

async function ensureDirDoesNotExist(target) {
  try {
    await access(target, fsConstants.F_OK);
    throw new Error(`Directory ${target} already exists.`);
  } catch (_error) {
    if (error.code === 'ENOENT') {
      return;
    }
    throw error;
  }
}

async function writeJson(targetPath, data) {
  await writeFile(targetPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || Object.keys(args).length === 0) {
    usage();
    process.exit(0);
  }
  const required = ['name', 'repo', 'version', 'artifact'];
  for (const key of required) {
    if (!args[key]) {
      throw new Error(`Missing required argument --${key}`);
    }
  }
  const packageFolderName = args.name;
  const packageDir = path.join(
    repoRoot,
    'packages',
    'languages',
    packageFolderName,
  );
  await ensureDirDoesNotExist(packageDir);

  const languageId = args.id || packageFolderName;
  const packageName = `treelight-language-${packageFolderName}`;
  const artifact = args.artifact;

  const pkgJson = {
    name: packageName,
    version: '0.0.0',
    description: `Treelight language module for ${languageId}.`,
    type: 'module',
    main: './dist/index.cjs',
    types: './dist/index.d.ts',
    exports: {
      '.': {
        import: {
          types: './dist/index.d.ts',
          default: './dist/index.js',
        },
        require: {
          types: './dist/index.d.cts',
          default: './dist/index.cjs',
        },
      },
    },
    files: ['dist'],
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'git+https://github.com/matoous/treelight.git',
    },
    keywords: ['treelight', 'tree-sitter', 'language', languageId],
    scripts: {
      build: 'rslib build',
      'build:watch': 'rslib build --watch',
      inspect: 'rslib inspect',
      tsc: 'tsc --noEmit',
      update: 'node ../../../scripts/update-language-wasm.mjs',
    },
    devDependencies: {
      '@rslib/core': '^0.18.0',
      '@types/node': '^22.19.2',
      'rsbuild-plugin-publint': '^0.3.0',
      typescript: '^5.7.3',
    },
    treelightLanguage: {
      repo: args.repo,
      version: args.version,
      artifact,
    },
  };

  const tsconfig = `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
`;

  const typeDecl = `declare module '*.scm' {
  const content: string
  export default content
}

declare module '*.wasm' {
  const dataUri: string
  export default dataUri
}
`;

  const indexTs = `import highlights from './queries/highlights.scm'
import injections from './queries/injections.scm'
import locals from './queries/locals.scm'
import wasmDataUri from './wasm/${artifact}'

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri

const language = {
  id: '${languageId}',
  wasm: wasmBase64,
  queries: {
    highlights,
    injections,
    locals,
  },
}

export default language
`;

  const highlightsPlaceholder = `; Highlight queries for ${languageId}
; Add your capture rules here.
`;
  const injectionsPlaceholder = `; Injection queries for ${languageId}
; Set up code injections here.
`;
  const localsPlaceholder = `; Locals queries for ${languageId}
; Track definitions and scopes here.
`;

  const rslibConfig = `import { defineConfig } from '@rslib/core'
import { pluginPublint } from 'rsbuild-plugin-publint'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      dts: true,
    },
    {
      format: 'cjs',
      dts: {
        autoExtension: true,
      },
    },
  ],
  output: {
    cleanDistPath: true,
    sourceMap: false,
    target: 'node',
  },
  tools: {
    rspack(config) {
      config.module ||= {}
      config.module.rules ||= []
      config.module.rules.push({
        test: /\\.scm$/,
        type: 'asset/source',
      })
      config.module.rules.push({
        test: /\\.wasm$/,
        type: 'asset/inline',
        generator: {
          dataUrl: {
            mimetype: 'application/wasm',
            encoding: 'base64',
          },
        },
      })
    },
  },
  plugins: [pluginPublint()],
})
`;

  await mkdir(path.join(packageDir, 'src', 'queries'), { recursive: true });
  await mkdir(path.join(packageDir, 'src', 'wasm'), { recursive: true });
  await mkdir(path.join(packageDir, 'src', 'types'), { recursive: true });

  await writeJson(path.join(packageDir, 'package.json'), pkgJson);
  await writeFile(path.join(packageDir, 'tsconfig.json'), tsconfig, 'utf8');
  await writeFile(
    path.join(packageDir, 'rslib.config.ts'),
    rslibConfig,
    'utf8',
  );
  await writeFile(path.join(packageDir, 'src', 'index.ts'), indexTs, 'utf8');
  await writeFile(
    path.join(packageDir, 'src', 'types', 'raw.d.ts'),
    typeDecl,
    'utf8',
  );
  await writeFile(
    path.join(packageDir, 'src', 'queries', 'highlights.scm'),
    highlightsPlaceholder,
    'utf8',
  );
  await writeFile(
    path.join(packageDir, 'src', 'queries', 'injections.scm'),
    injectionsPlaceholder,
    'utf8',
  );
  await writeFile(
    path.join(packageDir, 'src', 'queries', 'locals.scm'),
    localsPlaceholder,
    'utf8',
  );
  await writeFile(path.join(packageDir, 'src', 'wasm', '.gitkeep'), '', 'utf8');

  console.log(
    `Created language package at ${path.relative(repoRoot, packageDir)}`,
  );
  console.log('Downloading WASM artifact...');
  try {
    await execFileAsync(
      'npm',
      ['run', 'update', '-w', path.relative(repoRoot, packageDir)],
      {
        cwd: repoRoot,
        stdio: 'inherit',
      },
    );
  } catch (_error) {
    console.warn(
      'Failed to download WASM automatically. Run the update script manually when ready.',
    );
  }
  console.log(
    'Done. Remember to fill in the query files and adjust package metadata as needed.',
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
