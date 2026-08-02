#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const languageRoot = path.join(repoRoot, 'packages', 'languages');

async function pathExists(filePath) {
  try {
    await readFile(filePath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function checkedInQueryPath(queryKind) {
  if (queryKind === 'highlights') return 'src/queries/highlights.scm';
  if (queryKind === 'injections') return 'src/queries/injections.scm';
  if (queryKind === 'locals') return 'src/queries/locals.scm';
  return null;
}

async function validatePackage(packageName) {
  const packageDir = path.join(languageRoot, packageName);
  const packageJsonPath = path.join(packageDir, 'package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
  const metadata = packageJson.treelightLanguage;
  const errors = [];

  if (!metadata) {
    errors.push('missing treelightLanguage metadata');
    return errors;
  }

  if (!metadata.repo) errors.push('missing treelightLanguage.repo');
  if (!metadata.revision) errors.push('missing treelightLanguage.revision');
  if (packageName !== 'ecma' && !metadata.artifact) {
    errors.push('missing treelightLanguage.artifact');
  }
  if (packageName !== 'ecma') {
    const rootExport = packageJson.exports?.['.'];
    if (
      rootExport?.browser?.import?.default !== './dist/browser.js' ||
      rootExport?.browser?.import?.types !== './dist/browser.d.mts' ||
      rootExport?.browser?.require?.default !== './dist/browser.cjs' ||
      rootExport?.browser?.require?.types !== './dist/browser.d.cts'
    ) {
      errors.push('root export does not select the browser entry');
    }
    if (!packageJson.exports?.['./browser']) {
      errors.push('missing browser export');
    }
    if (!packageJson.exports?.['./embedded']) {
      errors.push('missing embedded export');
    }
    const definitionPath = path.join(packageDir, 'src/definition.ts');
    if (!(await pathExists(definitionPath))) {
      errors.push('missing src/definition.ts');
    }
    const browserPath = path.join(packageDir, 'src/browser.ts');
    if (!(await pathExists(browserPath))) {
      errors.push('missing src/browser.ts');
    } else {
      const browserSource = await readFile(browserPath, 'utf8');
      if (!browserSource.includes(`./wasm/${metadata.artifact}?url`)) {
        errors.push('browser export does not reference its grammar WASM URL');
      }
      if (!browserSource.includes('./definition')) {
        errors.push('browser export does not use the shared definition');
      }
    }
  }
  if (!metadata.queries?.highlights?.length) {
    errors.push('missing treelightLanguage.queries.highlights');
  }

  for (const queryKind of ['highlights', 'injections', 'locals']) {
    const queryPath = checkedInQueryPath(queryKind);
    if (!queryPath) continue;
    const absolutePath = path.join(packageDir, queryPath);
    const exists = await pathExists(absolutePath);
    const declared = Boolean(metadata.queries?.[queryKind]?.length);
    if (declared && !exists) {
      errors.push(`declares ${queryKind} query but ${queryPath} is missing`);
    }
    if (!declared && exists) {
      errors.push(`has ${queryPath} but does not declare it in metadata`);
    }
    if (exists) {
      const content = await readFile(absolutePath, 'utf8');
      if (content.includes('404: Not Found')) {
        errors.push(`${queryPath} contains a failed download response`);
      }
    }
  }

  return errors;
}

const packages = (await readdir(languageRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

let failed = false;
for (const packageName of packages) {
  const errors = await validatePackage(packageName);
  if (errors.length > 0) {
    failed = true;
    for (const error of errors) {
      console.error(`${packageName}: ${error}`);
    }
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${packages.length} language package metadata entries.`,
  );
}
