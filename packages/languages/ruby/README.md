# @treelight/ruby

[![npm version](https://img.shields.io/npm/v/@treelight/ruby.svg)](https://www.npmjs.com/package/@treelight/ruby) [![npm downloads](https://img.shields.io/npm/dm/@treelight/ruby.svg)](https://www.npmjs.com/package/@treelight/ruby)

Ruby language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/ruby @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import ruby from '@treelight/ruby';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [ruby],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("puts \"Hello World!\"", 'ruby');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Ruby.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
