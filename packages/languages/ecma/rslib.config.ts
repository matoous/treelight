import { defineConfig } from '@rslib/core';
export default defineConfig({
  lib: [
    {
      format: 'esm',
      dts: false,
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
});
