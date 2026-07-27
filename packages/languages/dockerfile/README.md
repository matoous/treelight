# @treelight/dockerfile

[![npm version](https://img.shields.io/npm/v/@treelight/dockerfile.svg)](https://www.npmjs.com/package/@treelight/dockerfile) [![npm downloads](https://img.shields.io/npm/dm/@treelight/dockerfile.svg)](https://www.npmjs.com/package/@treelight/dockerfile)

Dockerfile language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/dockerfile @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import dockerfile from '@treelight/dockerfile';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [dockerfile],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("FROM node:24-alpine\nWORKDIR /app\nCOPY . .\nCMD [\"npm\", \"start\"]", 'dockerfile');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Dockerfile.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
