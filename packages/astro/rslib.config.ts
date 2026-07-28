import { defineConfig } from '@rslib/core';
import { pluginPublint } from 'rsbuild-plugin-publint';

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
  plugins: [pluginPublint()],
});
