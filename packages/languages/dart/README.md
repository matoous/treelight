# @treelight/dart

[![npm version](https://img.shields.io/npm/v/@treelight/dart.svg)](https://www.npmjs.com/package/@treelight/dart) [![npm downloads](https://img.shields.io/npm/dm/@treelight/dart.svg)](https://www.npmjs.com/package/@treelight/dart)

Dart language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/dart @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import dart from '@treelight/dart';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [dart],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'dart');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Dart.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
