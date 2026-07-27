# @treelight/python

[![npm version](https://img.shields.io/npm/v/@treelight/python.svg)](https://www.npmjs.com/package/@treelight/python) [![npm downloads](https://img.shields.io/npm/dm/@treelight/python.svg)](https://www.npmjs.com/package/@treelight/python)

Python language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/python @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import python from '@treelight/python';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [python],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('print("Hello World!")', 'python');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Python.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
