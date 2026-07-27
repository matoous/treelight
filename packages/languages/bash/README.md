# @treelight/bash

[![npm version](https://img.shields.io/npm/v/@treelight/bash.svg)](https://www.npmjs.com/package/@treelight/bash) [![npm downloads](https://img.shields.io/npm/dm/@treelight/bash.svg)](https://www.npmjs.com/package/@treelight/bash)

Bash language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/bash @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import bash from '@treelight/bash';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [bash],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("echo \"Hello World!\"", 'bash');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Bash.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
