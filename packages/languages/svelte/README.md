# @treelight/svelte

[![npm version](https://img.shields.io/npm/v/@treelight/svelte.svg)](https://www.npmjs.com/package/@treelight/svelte) [![npm downloads](https://img.shields.io/npm/dm/@treelight/svelte.svg)](https://www.npmjs.com/package/@treelight/svelte)

Svelte language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/svelte @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import svelte from '@treelight/svelte';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [svelte],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'svelte');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Svelte.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
