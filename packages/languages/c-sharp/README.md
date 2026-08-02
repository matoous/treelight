# @treelight/c-sharp

[![npm version](https://img.shields.io/npm/v/@treelight/c-sharp.svg)](https://www.npmjs.com/package/@treelight/c-sharp) [![npm downloads](https://img.shields.io/npm/dm/@treelight/c-sharp.svg)](https://www.npmjs.com/package/@treelight/c-sharp)

C# language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/c-sharp @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import cSharp from '@treelight/c-sharp';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [cSharp],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'c-sharp');
```

This package includes the Tree-sitter grammar WASM and highlight queries for C#.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
