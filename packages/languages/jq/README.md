# @treelight/jq

[![npm version](https://img.shields.io/npm/v/@treelight/jq.svg)](https://www.npmjs.com/package/@treelight/jq) [![npm downloads](https://img.shields.io/npm/dm/@treelight/jq.svg)](https://www.npmjs.com/package/@treelight/jq)

jq language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/jq @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import jq from '@treelight/jq';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [jq],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'jq');
```

This package includes the Tree-sitter grammar WASM and highlight queries for jq.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
