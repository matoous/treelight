# @treelight/fish

[![npm version](https://img.shields.io/npm/v/@treelight/fish.svg)](https://www.npmjs.com/package/@treelight/fish) [![npm downloads](https://img.shields.io/npm/dm/@treelight/fish.svg)](https://www.npmjs.com/package/@treelight/fish)

Fish language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/fish @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import fish from '@treelight/fish';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [fish],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'fish');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Fish.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
