# @treelight/theme-tokyonight

[![npm version](https://img.shields.io/npm/v/@treelight/theme-tokyonight.svg)](https://www.npmjs.com/package/@treelight/theme-tokyonight) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-tokyonight.svg)](https://www.npmjs.com/package/@treelight/theme-tokyonight)

Tokyo Night theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-tokyonight
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-tokyonight';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'tokyonight',
});
```

This package ports Helix's [tokyonight.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/tokyonight.toml) theme data to Treelight.

Upstream theme: [Tokyo Night](https://github.com/folke/tokyonight.nvim)

License: Apache-2.0

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
