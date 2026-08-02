import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
      browser: './src/browser.ts',
    },
  },
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
    copy: [{ from: 'src/wasm', to: 'wasm' }],
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
      config.module.rules.push({
        test: /\.wasm$/,
        type: 'asset/inline',
        generator: {
          dataUrl: {
            mimetype: 'application/wasm',
            encoding: 'base64',
          },
        },
      });
    },
  },
});
