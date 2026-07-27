# @treelight/rust

Rust language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/rust @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import rust from '@treelight/rust';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [rust],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('fn main() { println!("Hello World!"); }', 'rust');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Rust.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
