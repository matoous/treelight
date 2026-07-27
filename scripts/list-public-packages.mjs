#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const packageRoots = [
  path.join(repoRoot, 'packages', 'browser'),
  path.join(repoRoot, 'packages', 'core'),
  path.join(repoRoot, 'packages', 'languages'),
  path.join(repoRoot, 'packages', 'themes'),
];

async function findPackageJsonFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  if (
    entries.some((entry) => entry.isFile() && entry.name === 'package.json')
  ) {
    return [path.join(root, 'package.json')];
  }

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name, 'package.json'));
}

async function main() {
  const packageJsonFiles = (
    await Promise.all(packageRoots.map(findPackageJsonFiles))
  ).flat();
  const packageNames = [];

  for (const packageJsonFile of packageJsonFiles) {
    const pkg = JSON.parse(await readFile(packageJsonFile, 'utf8'));
    if (!pkg.private && pkg.publishConfig?.access === 'public') {
      packageNames.push(pkg.name);
    }
  }

  packageNames.sort();
  console.log(packageNames.join('\n'));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
