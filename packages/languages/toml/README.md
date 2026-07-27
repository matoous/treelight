# @treelight/toml

[![npm version](https://img.shields.io/npm/v/@treelight/toml.svg)](https://www.npmjs.com/package/@treelight/toml) [![npm downloads](https://img.shields.io/npm/dm/@treelight/toml.svg)](https://www.npmjs.com/package/@treelight/toml)

TOML language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/toml @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import toml from '@treelight/toml';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [toml],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("[package]\nname = \"treelight\"\nversion = \"0.1.0\"", 'toml');
```

This package includes the Tree-sitter grammar WASM and highlight queries for TOML.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
