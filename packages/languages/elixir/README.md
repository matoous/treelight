# @treelight/elixir

Elixir language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/elixir @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import elixir from '@treelight/elixir';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [elixir],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('IO.puts("Hello World!")', 'elixir');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Elixir.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
