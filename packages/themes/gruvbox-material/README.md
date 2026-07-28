# @treelight/theme-gruvbox-material

[![npm version](https://img.shields.io/npm/v/@treelight/theme-gruvbox-material.svg)](https://www.npmjs.com/package/@treelight/theme-gruvbox-material) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-gruvbox-material.svg)](https://www.npmjs.com/package/@treelight/theme-gruvbox-material)

Gruvbox Material theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-gruvbox-material
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-gruvbox-material';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'gruvbox-material',
});
```

This package ports Helix's [gruvbox_material_dark_medium.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/gruvbox_material_dark_medium.toml) theme data to Treelight.

Upstream theme: [Gruvbox Material](https://github.com/sainnhe/gruvbox-material)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
