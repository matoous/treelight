#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to download ${url}: ${response.status} ${response.statusText}`,
    );
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function main() {
  const packageDir = path.resolve(process.argv[2] ?? process.cwd());
  const packageJsonPath = path.join(packageDir, 'package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
  const meta = packageJson.treelightLanguage;
  if (!meta) {
    throw new Error(
      `Package ${packageJson.name} is missing treelightLanguage metadata.`,
    );
  }
  const { repo, revision, artifact } = meta;
  const version = meta.version ?? revision;
  if (!repo || !version || !artifact) {
    throw new Error(
      `treelightLanguage metadata must specify repo, revision/version, and artifact. Received: ${JSON.stringify(meta)}`,
    );
  }
  const wasmDir = path.join(packageDir, 'src', 'wasm');
  await mkdir(wasmDir, { recursive: true });
  const destPath = path.join(wasmDir, artifact);
  if (meta.source) {
    await buildFromSource(meta, destPath);
  } else {
    const url = `https://github.com/${repo}/releases/download/${version}/${artifact}`;
    console.log(`Downloading ${artifact} (${version}) from ${url}`);
    const data = await download(url);
    await writeFile(destPath, data);
  }
  console.log(`Saved ${artifact} to ${path.relative(process.cwd(), destPath)}`);
}

async function buildFromSource(meta, destPath) {
  const source = meta.source;
  const repoUrl = source.git ?? `https://github.com/${meta.repo}.git`;
  const checkoutDir = await mkdtemp(
    path.join(
      tmpdir(),
      `treelight-${meta.repo.replaceAll('/', '-')}-${meta.revision.slice(0, 12)}`,
    ),
  );
  console.log(`Cloning ${repoUrl} (${meta.revision})`);
  await execFileAsync('git', [
    'clone',
    '--depth',
    '1',
    '--filter=blob:none',
    '--revision',
    meta.revision,
    repoUrl,
    checkoutDir,
  ]);

  const grammarDir = path.join(checkoutDir, source.subpath ?? '.');
  console.log(`Building ${meta.artifact} from ${grammarDir}`);
  await execFileAsync('tree-sitter', [
    'build',
    '--wasm',
    '--output',
    destPath,
    grammarDir,
  ]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
