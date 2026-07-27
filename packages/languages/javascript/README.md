# @treelight/javascript

JavaScript language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('console.info("Hello World!")', 'javascript');
```

This package includes the Tree-sitter grammar WASM and highlight queries for JavaScript.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
