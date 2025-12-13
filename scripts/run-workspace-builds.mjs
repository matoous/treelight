#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

async function main() {
  const scope = process.argv[2];
  if (!scope) {
    console.error(
      'Usage: node scripts/run-workspace-builds.mjs <languages|themes>',
    );
    process.exitCode = 1;
    return;
  }
  const targetRoot = path.join(repoRoot, 'packages', scope);
  const entries = await readdir(targetRoot, { withFileTypes: true }).catch(
    (error) => {
      console.error(`Unable to read packages/${scope}:`, error.message);
      process.exitCode = 1;
      return null;
    },
  );
  if (!entries) {
    return;
  }
  const workspaces = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const workspacePath = path.join('packages', scope, entry.name);
    const packageJsonPath = path.join(repoRoot, workspacePath, 'package.json');
    try {
      const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
      if (packageJson.scripts && packageJson.scripts.build) {
        workspaces.push(workspacePath);
      }
    } catch (error) {
      console.warn(`Skipping ${workspacePath}: ${error.message}`);
    }
  }
  workspaces.sort();
  for (const workspace of workspaces) {
    console.log(`Building ${workspace}...`);
    await execFileAsync('npm', ['run', 'build', '-w', workspace], {
      cwd: repoRoot,
      stdio: 'inherit',
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
