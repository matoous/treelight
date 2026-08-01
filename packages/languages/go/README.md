# @treelight/go

[![npm version](https://img.shields.io/npm/v/@treelight/go.svg)](https://www.npmjs.com/package/@treelight/go) [![npm downloads](https://img.shields.io/npm/dm/@treelight/go.svg)](https://www.npmjs.com/package/@treelight/go)

Go language definition for Treelight.

## Install

```sh
npm install @treelight/comment @treelight/core @treelight/go @treelight/go-format-string @treelight/regex @treelight/theme-github-dark
```

## Usage

```ts
import comment from '@treelight/comment';
import { Highlighter } from '@treelight/core';
import go from '@treelight/go';
import goFormatString from '@treelight/go-format-string';
import regex from '@treelight/regex';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [go, comment, goFormatString, regex],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('fmt.Println("Hello World!")', 'go');
```

This package includes the Tree-sitter grammar WASM and highlight and injection queries for Go. Its queries can inject comment annotations, block documentation Markdown, `//go:generate` Bash, `regexp` patterns, and `fmt`/`log` format strings when those target languages are registered.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
