# @treelight/markdown

[![npm version](https://img.shields.io/npm/v/@treelight/markdown.svg)](https://www.npmjs.com/package/@treelight/markdown) [![npm downloads](https://img.shields.io/npm/dm/@treelight/markdown.svg)](https://www.npmjs.com/package/@treelight/markdown)

Markdown language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/markdown @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import markdown from '@treelight/markdown';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [markdown],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("# Hello World!\n\nThis is **Treelight**.", 'markdown');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Markdown.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
