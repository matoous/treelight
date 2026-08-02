# @treelight/astro

[![npm version](https://img.shields.io/npm/v/@treelight/astro.svg)](https://www.npmjs.com/package/@treelight/astro) [![npm downloads](https://img.shields.io/npm/dm/@treelight/astro.svg)](https://www.npmjs.com/package/@treelight/astro)

Astro language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/astro @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import astro from '@treelight/astro';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [astro],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'astro');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Astro.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
