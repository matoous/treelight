# @treelight/powershell

[![npm version](https://img.shields.io/npm/v/@treelight/powershell.svg)](https://www.npmjs.com/package/@treelight/powershell) [![npm downloads](https://img.shields.io/npm/dm/@treelight/powershell.svg)](https://www.npmjs.com/package/@treelight/powershell)

PowerShell language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/powershell @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import powershell from '@treelight/powershell';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [powershell],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'powershell');
```

This package includes the Tree-sitter grammar WASM and highlight queries for PowerShell.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
