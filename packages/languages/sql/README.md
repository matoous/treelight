# @treelight/sql

[![npm version](https://img.shields.io/npm/v/@treelight/sql.svg)](https://www.npmjs.com/package/@treelight/sql) [![npm downloads](https://img.shields.io/npm/dm/@treelight/sql.svg)](https://www.npmjs.com/package/@treelight/sql)

SQL language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/sql @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import sql from '@treelight/sql';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [sql],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("SELECT id, name\nFROM users\nWHERE active = true;", 'sql');
```

This package includes the Tree-sitter grammar WASM and highlight queries for SQL.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
