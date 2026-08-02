# @treelight/phpdoc

[![npm version](https://img.shields.io/npm/v/@treelight/phpdoc.svg)](https://www.npmjs.com/package/@treelight/phpdoc) [![npm downloads](https://img.shields.io/npm/dm/@treelight/phpdoc.svg)](https://www.npmjs.com/package/@treelight/phpdoc)

PHPDoc language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/phpdoc @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import phpdoc from '@treelight/phpdoc';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [phpdoc],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'phpdoc');
```

This package includes the Tree-sitter grammar WASM and highlight queries for PHPDoc.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
