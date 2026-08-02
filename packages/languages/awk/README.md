# @treelight/awk

[![npm version](https://img.shields.io/npm/v/@treelight/awk.svg)](https://www.npmjs.com/package/@treelight/awk) [![npm downloads](https://img.shields.io/npm/dm/@treelight/awk.svg)](https://www.npmjs.com/package/@treelight/awk)

AWK language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/awk @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import awk from '@treelight/awk';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [awk],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'awk');
```

This package includes the Tree-sitter grammar WASM and highlight queries for AWK.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
