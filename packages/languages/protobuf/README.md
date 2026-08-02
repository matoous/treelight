# @treelight/protobuf

[![npm version](https://img.shields.io/npm/v/@treelight/protobuf.svg)](https://www.npmjs.com/package/@treelight/protobuf) [![npm downloads](https://img.shields.io/npm/dm/@treelight/protobuf.svg)](https://www.npmjs.com/package/@treelight/protobuf)

Protobuf language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/protobuf @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import protobuf from '@treelight/protobuf';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [protobuf],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'protobuf');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Protobuf.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
