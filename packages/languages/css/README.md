# @treelight/css

[![npm version](https://img.shields.io/npm/v/@treelight/css.svg)](https://www.npmjs.com/package/@treelight/css) [![npm downloads](https://img.shields.io/npm/dm/@treelight/css.svg)](https://www.npmjs.com/package/@treelight/css)

CSS language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/css @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import css from '@treelight/css';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [css],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(".button {\n  color: rebeccapurple;\n}", 'css');
```

This package includes the Tree-sitter grammar WASM and highlight queries for CSS.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
