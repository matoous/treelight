# @treelight/latex

[![npm version](https://img.shields.io/npm/v/@treelight/latex.svg)](https://www.npmjs.com/package/@treelight/latex) [![npm downloads](https://img.shields.io/npm/dm/@treelight/latex.svg)](https://www.npmjs.com/package/@treelight/latex)

LaTeX language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/latex @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import latex from '@treelight/latex';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [latex],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'latex');
```

This package includes the Tree-sitter grammar WASM and highlight queries for LaTeX.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
