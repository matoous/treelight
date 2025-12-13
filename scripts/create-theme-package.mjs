#!/usr/bin/env node
import { constants as fsConstants } from 'node:fs';
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

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
  node scripts/create-theme-package.mjs --name <folder-name> [--id <theme-id>]

Example:
  npm run create:theme -- --name github-midnight --id github-midnight
`);
}

async function ensureDirDoesNotExist(target) {
  try {
    await access(target, fsConstants.F_OK);
    throw new Error(`Directory ${target} already exists.`);
  } catch (error) {
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
  if (!args.name) {
    throw new Error('Missing required argument --name');
  }
  const themeId = args.id || args.name;
  const packageName = `treelight-theme-${args.name}`;
  const packageDir = path.join(repoRoot, 'packages', 'themes', args.name);
  await ensureDirDoesNotExist(packageDir);

  const pkgJson = {
    name: packageName,
    version: '0.0.0',
    description: `Treelight theme module for ${themeId}.`,
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
    keywords: ['treelight', 'tree-sitter', 'theme', themeId],
    scripts: {
      build: 'rslib build',
      'build:watch': 'rslib build --watch',
      inspect: 'rslib inspect',
      tsc: 'tsc --noEmit',
    },
    devDependencies: {
      '@rslib/core': '^0.18.0',
      '@types/node': '^22.19.2',
      'rsbuild-plugin-publint': '^0.3.0',
      typescript: '^5.7.3',
    },
  };

  const tsconfig = `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "types": ["node"],
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
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
  plugins: [pluginPublint()],
})
`;

  const themeStub = `const theme = {
  id: '${themeId}',
  styles: {},
};

export default theme;
`;

  await mkdir(path.join(packageDir, 'src'), { recursive: true });
  await writeJson(path.join(packageDir, 'package.json'), pkgJson);
  await writeFile(path.join(packageDir, 'tsconfig.json'), tsconfig, 'utf8');
  await writeFile(
    path.join(packageDir, 'rslib.config.ts'),
    rslibConfig,
    'utf8',
  );
  await writeFile(path.join(packageDir, 'src', 'index.ts'), themeStub, 'utf8');

  console.log(
    `Created theme package at ${path.relative(repoRoot, packageDir)}`,
  );
  console.log(
    'Fill in src/index.ts with your theme styles and run npm run build:themes.',
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
