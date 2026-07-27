# @treelight/theme-github-dark

[![npm version](https://img.shields.io/npm/v/@treelight/theme-github-dark.svg)](https://www.npmjs.com/package/@treelight/theme-github-dark) [![npm downloads](https://img.shields.io/npm/dm/@treelight/theme-github-dark.svg)](https://www.npmjs.com/package/@treelight/theme-github-dark)

GitHub Dark theme for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [githubDark],
  theme: 'github-dark',
});
```

The theme maps Tree-sitter highlight captures to GitHub Dark colors and CSS class metadata.

See the [Treelight README](https://github.com/matoous/treelight#themes) for full theme usage.
