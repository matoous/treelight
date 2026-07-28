# @treelight/theme-nord

[![npm version](https://img.shields.io/npm/v/@treelight/theme-nord.svg)](https://www.npmjs.com/package/@treelight/theme-nord) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-nord.svg)](https://www.npmjs.com/package/@treelight/theme-nord)

Nord theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-nord
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-nord';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'nord',
});
```

This package ports Helix's [nord.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/nord.toml) theme data to Treelight.

Upstream theme: [Nord](https://github.com/nordtheme/nord)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
