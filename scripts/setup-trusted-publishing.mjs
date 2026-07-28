#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';
import { resolveRequestedPublicPackages } from './package-workspaces.mjs';

const repo = 'matoous/treelight';
const workflowFile = 'ci.yaml';

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(`${command} ${args.join(' ')} exited with code ${code}`),
      );
    });
  });
}

async function main() {
  const packageNames = process.argv.slice(2);
  if (packageNames.length === 0) {
    throw new Error(
      'Pass one or more package names, for example:\n' +
        '  npm run trust:packages -- @treelight/theme-ayu-dark',
    );
  }

  const packages = await resolveRequestedPublicPackages(packageNames);

  for (const pkg of packages) {
    await run('npm', [
      'trust',
      'github',
      pkg.name,
      '--repo',
      repo,
      '--file',
      workflowFile,
      '--allow-publish',
      '--yes',
    ]);
    await setTimeout(2000);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
