# @treelight/typescript

[![npm version](https://img.shields.io/npm/v/@treelight/typescript.svg)](https://www.npmjs.com/package/@treelight/typescript) [![npm downloads](https://img.shields.io/npm/dm/@treelight/typescript.svg)](https://www.npmjs.com/package/@treelight/typescript)

TypeScript language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/typescript @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import typescript from '@treelight/typescript';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [typescript],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('const message: string = "Hello World!";', 'typescript');
```

This package includes the Tree-sitter grammar WASM and highlight queries for TypeScript.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
