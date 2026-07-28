# @treelight/theme-gruvbox

[![npm version](https://img.shields.io/npm/v/@treelight/theme-gruvbox.svg)](https://www.npmjs.com/package/@treelight/theme-gruvbox) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-gruvbox.svg)](https://www.npmjs.com/package/@treelight/theme-gruvbox)

Gruvbox theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-gruvbox
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-gruvbox';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'gruvbox',
});
```

This package ports Helix's [gruvbox.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/gruvbox.toml) theme data to Treelight.

Upstream theme: [Gruvbox](https://github.com/morhetz/gruvbox)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
