# @treelight/erb

[![npm version](https://img.shields.io/npm/v/@treelight/erb.svg)](https://www.npmjs.com/package/@treelight/erb) [![npm downloads](https://img.shields.io/npm/dm/@treelight/erb.svg)](https://www.npmjs.com/package/@treelight/erb)

ERB language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/erb @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import erb from '@treelight/erb';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [erb],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'erb');
```

This package includes the Tree-sitter grammar WASM and highlight queries for ERB.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
