# @treelight/heex

[![npm version](https://img.shields.io/npm/v/@treelight/heex.svg)](https://www.npmjs.com/package/@treelight/heex) [![npm downloads](https://img.shields.io/npm/dm/@treelight/heex.svg)](https://www.npmjs.com/package/@treelight/heex)

HEEx language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/heex @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import heex from '@treelight/heex';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [heex],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'heex');
```

This package includes the Tree-sitter grammar WASM and highlight queries for HEEx.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
