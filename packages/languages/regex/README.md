# @treelight/regex

[![npm version](https://img.shields.io/npm/v/@treelight/regex.svg)](https://www.npmjs.com/package/@treelight/regex) [![npm downloads](https://img.shields.io/npm/dm/@treelight/regex.svg)](https://www.npmjs.com/package/@treelight/regex)

Regular expression language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/regex @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import regex from '@treelight/regex';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [regex],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('^[a-z]+$', 'regex');
```

This package includes the Tree-sitter grammar WASM and highlight queries for regular expressions. Register it alongside host languages such as Go to enable regex injections.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
