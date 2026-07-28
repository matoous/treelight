# @treelight/theme-solarized-light

[![npm version](https://img.shields.io/npm/v/@treelight/theme-solarized-light.svg)](https://www.npmjs.com/package/@treelight/theme-solarized-light) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-solarized-light.svg)](https://www.npmjs.com/package/@treelight/theme-solarized-light)

Solarized Light theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-solarized-light
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import theme from '@treelight/theme-solarized-light';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [theme],
  theme: 'solarized-light',
});
```

This package ports Helix's [solarized_light.toml](https://github.com/helix-editor/helix/blob/master/runtime/themes/solarized_light.toml) theme data to Treelight.

Upstream theme: [Solarized](https://github.com/altercation/solarized)

License: MIT

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
