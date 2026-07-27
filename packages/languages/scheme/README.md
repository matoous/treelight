# @treelight/scheme

Scheme language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/scheme @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import scheme from '@treelight/scheme';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [scheme],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('(display "Hello World!")', 'scheme');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Scheme.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
