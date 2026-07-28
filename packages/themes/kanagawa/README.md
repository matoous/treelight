# @treelight/theme-kanagawa

[![npm version](https://img.shields.io/npm/v/@treelight/theme-kanagawa.svg)](https://www.npmjs.com/package/@treelight/theme-kanagawa) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-kanagawa.svg)](https://www.npmjs.com/package/@treelight/theme-kanagawa)

Kanagawa theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-kanagawa
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-kanagawa';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'kanagawa',
});
```

This package ports Helix's [kanagawa.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/kanagawa.toml) theme data to Treelight.

Upstream theme: [kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
