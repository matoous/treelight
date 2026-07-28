#!/usr/bin/env node
import { listPublicPackageWorkspaces } from './package-workspaces.mjs';

async function main() {
  const packageNames = (await listPublicPackageWorkspaces()).map(
    (workspace) => workspace.name,
  );
  console.log(packageNames.join('\n'));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
