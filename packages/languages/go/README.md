# @treelight/go

Go language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/go @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import go from '@treelight/go';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [go],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('fmt.Println("Hello World!")', 'go');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Go.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
