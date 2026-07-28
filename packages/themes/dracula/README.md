# @treelight/theme-dracula

[![npm version](https://img.shields.io/npm/v/@treelight/theme-dracula.svg)](https://www.npmjs.com/package/@treelight/theme-dracula) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-dracula.svg)](https://www.npmjs.com/package/@treelight/theme-dracula)

Dracula theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-dracula
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-dracula';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'dracula',
});
```

This package ports Helix's [dracula.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/dracula.toml) theme data to Treelight.

Upstream theme: [Dracula Theme](https://github.com/dracula/dracula-theme)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
