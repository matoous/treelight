# @treelight/theme-onedark

[![npm version](https://img.shields.io/npm/v/@treelight/theme-onedark.svg)](https://www.npmjs.com/package/@treelight/theme-onedark) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-onedark.svg)](https://www.npmjs.com/package/@treelight/theme-onedark)

One Dark theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-onedark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-onedark';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'onedark',
});
```

This package ports Helix's [onedark.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/onedark.toml) theme data to Treelight.

Upstream theme: [One Dark Syntax](https://github.com/atom/one-dark-syntax)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
