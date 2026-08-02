# @treelight/swift

[![npm version](https://img.shields.io/npm/v/@treelight/swift.svg)](https://www.npmjs.com/package/@treelight/swift) [![npm downloads](https://img.shields.io/npm/dm/@treelight/swift.svg)](https://www.npmjs.com/package/@treelight/swift)

Swift language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/swift @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import swift from '@treelight/swift';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [swift],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'swift');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Swift.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
