# @treelight/html

HTML language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/html @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import htmlLanguage from '@treelight/html';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [htmlLanguage],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('<h1>Hello World!</h1>', 'html');
```

This package includes the Tree-sitter grammar WASM and highlight queries for HTML.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
