import { defineConfig } from '@rslib/core';
export default defineConfig({
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
