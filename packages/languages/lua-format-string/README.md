# @treelight/lua-format-string

[![npm version](https://img.shields.io/npm/v/@treelight/lua-format-string.svg)](https://www.npmjs.com/package/@treelight/lua-format-string) [![npm downloads](https://img.shields.io/npm/dm/@treelight/lua-format-string.svg)](https://www.npmjs.com/package/@treelight/lua-format-string)

Lua format strings language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/lua-format-string @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import luaFormatString from '@treelight/lua-format-string';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [luaFormatString],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'lua-format-string');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Lua format strings.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
