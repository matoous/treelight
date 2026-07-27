# @treelight/json

[![npm version](https://img.shields.io/npm/v/@treelight/json.svg)](https://www.npmjs.com/package/@treelight/json) [![npm downloads](https://img.shields.io/npm/dm/@treelight/json.svg)](https://www.npmjs.com/package/@treelight/json)

JSON language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/json @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import json from '@treelight/json';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [json],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('{ "message": "Hello World!" }', 'json');
```

This package includes the Tree-sitter grammar WASM and highlight queries for JSON.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
