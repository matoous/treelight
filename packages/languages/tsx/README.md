# @treelight/tsx

TSX language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/tsx @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import tsx from '@treelight/tsx';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [tsx],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('<App message="Hello World!" />', 'tsx');
```

This package includes the Tree-sitter grammar WASM and highlight queries for TSX.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
