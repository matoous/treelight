# @treelight/graphql

[![npm version](https://img.shields.io/npm/v/@treelight/graphql.svg)](https://www.npmjs.com/package/@treelight/graphql) [![npm downloads](https://img.shields.io/npm/dm/@treelight/graphql.svg)](https://www.npmjs.com/package/@treelight/graphql)

GraphQL language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/graphql @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import graphql from '@treelight/graphql';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [graphql],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("query Viewer {\n  viewer {\n    login\n  }\n}", 'graphql');
```

This package includes the Tree-sitter grammar WASM and highlight queries for GraphQL.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
