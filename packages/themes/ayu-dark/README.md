# @treelight/theme-ayu-dark

[![npm version](https://img.shields.io/npm/v/@treelight/theme-ayu-dark.svg)](https://www.npmjs.com/package/@treelight/theme-ayu-dark) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-ayu-dark.svg)](https://www.npmjs.com/package/@treelight/theme-ayu-dark)

Ayu Dark theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-ayu-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-ayu-dark';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'ayu-dark',
});
```

This package ports Helix's [ayu_dark.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/ayu_dark.toml) theme data to Treelight.

Upstream theme: [Ayu](https://github.com/dempfi/ayu)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
