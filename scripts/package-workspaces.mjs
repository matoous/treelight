import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(__dirname, '..');

const packageRoots = [
  path.join(repoRoot, 'packages', 'browser'),
  path.join(repoRoot, 'packages', 'core'),
  path.join(repoRoot, 'packages', 'hast'),
  path.join(repoRoot, 'packages', 'languages'),
  path.join(repoRoot, 'packages', 'plugin-astro'),
  path.join(repoRoot, 'packages', 'plugin-rehype'),
  path.join(repoRoot, 'packages', 'plugin-remark'),
  path.join(repoRoot, 'packages', 'plugin-rspress'),
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

export async function listPublicPackageWorkspaces() {
  const packageJsonFiles = (
    await Promise.all(packageRoots.map(findPackageJsonFiles))
  ).flat();
  const packages = [];

  for (const packageJsonFile of packageJsonFiles) {
    const pkg = JSON.parse(await readFile(packageJsonFile, 'utf8'));
    if (!pkg.private && pkg.publishConfig?.access === 'public') {
      packages.push({
        name: pkg.name,
        packageJsonFile,
        version: pkg.version,
      });
    }
  }

  packages.sort((a, b) => a.name.localeCompare(b.name));
  return packages;
}

export async function resolveRequestedPublicPackages(names) {
  const packages = await listPublicPackageWorkspaces();
  const packagesByName = new Map(
    packages.map((workspace) => [workspace.name, workspace]),
  );
  const missing = names.filter((name) => !packagesByName.has(name));

  if (missing.length > 0) {
    throw new Error(
      `Unknown public workspace package(s): ${missing.join(', ')}\n\n` +
        `Known public packages:\n${packages
          .map((workspace) => `  ${workspace.name}`)
          .join('\n')}`,
    );
  }

  return names.map((name) => packagesByName.get(name));
}
