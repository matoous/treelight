# @treelight/nix

[![npm version](https://img.shields.io/npm/v/@treelight/nix.svg)](https://www.npmjs.com/package/@treelight/nix) [![npm downloads](https://img.shields.io/npm/dm/@treelight/nix.svg)](https://www.npmjs.com/package/@treelight/nix)

Nix language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/nix @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import nix from '@treelight/nix';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [nix],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'nix');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Nix.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
