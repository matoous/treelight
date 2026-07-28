# @treelight/theme-everforest-dark

[![npm version](https://img.shields.io/npm/v/@treelight/theme-everforest-dark.svg)](https://www.npmjs.com/package/@treelight/theme-everforest-dark) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-everforest-dark.svg)](https://www.npmjs.com/package/@treelight/theme-everforest-dark)

Everforest Dark theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-everforest-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-everforest-dark';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'everforest-dark',
});
```

This package ports Helix's [everforest_dark.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/everforest_dark.toml) theme data to Treelight.

Upstream theme: [Everforest](https://github.com/sainnhe/everforest)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
