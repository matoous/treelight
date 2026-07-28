# @treelight/theme-rose-pine

[![npm version](https://img.shields.io/npm/v/@treelight/theme-rose-pine.svg)](https://www.npmjs.com/package/@treelight/theme-rose-pine) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-rose-pine.svg)](https://www.npmjs.com/package/@treelight/theme-rose-pine)

Rose Pine theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-rose-pine
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-rose-pine';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'rose-pine',
});
```

This package ports Helix's [rose_pine.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/rose_pine.toml) theme data to Treelight.

Upstream theme: [Rose Pine for Helix](https://github.com/rose-pine/helix)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
