import { defineConfig } from '@rslib/core';
export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
      copy: './src/copy.ts',
    },
  },
  lib: [
    {
      dts: false,
      format: 'esm',
    },
    {
      dts: {
        autoExtension: true,
      },
      format: 'cjs',
    },
  ],
  output: {
    cleanDistPath: true,
    sourceMap: true,
    target: 'node',
  },
});
