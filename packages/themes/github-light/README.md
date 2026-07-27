# @treelight/theme-github-light

[![npm version](https://img.shields.io/npm/v/@treelight/theme-github-light.svg)](https://www.npmjs.com/package/@treelight/theme-github-light) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-github-light.svg)](https://www.npmjs.com/package/@treelight/theme-github-light)

GitHub Light theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-github-light
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import githubLight from '@treelight/theme-github-light';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [githubLight],
  theme: 'github-light',
});
```

The theme maps Tree-sitter highlight captures to GitHub Light colors and CSS class metadata.

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
