import { defineConfig } from '@rslib/core';
import { pluginPublint } from 'rsbuild-plugin-publint';

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
  tools: {
    rspack(config) {
      config.module ||= {};
      config.module.rules ||= [];
      config.module.rules.push({
        test: /\.scm$/,
        type: 'asset/source',
      });
    },
  },
  plugins: [pluginPublint()],
});
