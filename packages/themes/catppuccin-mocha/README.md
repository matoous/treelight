# @treelight/theme-catppuccin-mocha

[![npm version](https://img.shields.io/npm/v/@treelight/theme-catppuccin-mocha.svg)](https://www.npmjs.com/package/@treelight/theme-catppuccin-mocha) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-catppuccin-mocha.svg)](https://www.npmjs.com/package/@treelight/theme-catppuccin-mocha)

Catppuccin Mocha theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-catppuccin-mocha
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-catppuccin-mocha';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'catppuccin-mocha',
});
```

This package ports Helix's [catppuccin_mocha.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/catppuccin_mocha.toml) theme data to Treelight.

Upstream theme: [Catppuccin for Helix](https://github.com/catppuccin/helix)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
