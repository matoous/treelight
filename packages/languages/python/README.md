# @treelight/python

[![npm version](https://img.shields.io/npm/v/@treelight/python.svg)](https://www.npmjs.com/package/@treelight/python) [![npm downloads](https://img.shields.io/npm/dm/@treelight/python.svg)](https://www.npmjs.com/package/@treelight/python)

Python language definition for Treelight.

## Install

```sh
npm install @treelight/comment @treelight/core @treelight/python @treelight/regex @treelight/theme-github-dark
```

## Usage

```ts
import comment from '@treelight/comment';
import { Highlighter } from '@treelight/core';
import python from '@treelight/python';
import regex from '@treelight/regex';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [python, comment, regex],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('print("Hello World!")', 'python');
```

This package includes the Tree-sitter grammar WASM and highlight and injection queries for Python. Register `@treelight/comment` and `@treelight/regex` to highlight annotations in comments and patterns passed to standard-library `re` functions.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
