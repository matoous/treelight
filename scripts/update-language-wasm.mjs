#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

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
  const { repo, version, artifact } = meta;
  if (!repo || !version || !artifact) {
    throw new Error(
      `treelightLanguage metadata must specify repo, version, and artifact. Received: ${JSON.stringify(meta)}`,
    );
  }
  const url = `https://github.com/${repo}/releases/download/${version}/${artifact}`;
  console.log(`Downloading ${artifact} (${version}) from ${url}`);
  const data = await download(url);
  const wasmDir = path.join(packageDir, 'src', 'wasm');
  await mkdir(wasmDir, { recursive: true });
  const destPath = path.join(wasmDir, artifact);
  await writeFile(destPath, data);
  console.log(`Saved ${artifact} to ${path.relative(process.cwd(), destPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
