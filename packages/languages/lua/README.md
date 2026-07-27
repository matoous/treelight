# @treelight/lua

[![npm version](https://img.shields.io/npm/v/@treelight/lua.svg)](https://www.npmjs.com/package/@treelight/lua) [![npm downloads](https://img.shields.io/npm/dm/@treelight/lua.svg)](https://www.npmjs.com/package/@treelight/lua)

Lua language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/lua @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import lua from '@treelight/lua';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [lua],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("local message = \"Hello World!\"\nprint(message)", 'lua');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Lua.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
