# @treelight/core

[![npm version](https://img.shields.io/npm/v/@treelight/core.svg)](https://www.npmjs.com/package/@treelight/core) [![npm downloads](https://img.shields.io/npm/dm/@treelight/core.svg)](https://www.npmjs.com/package/@treelight/core)

Core runtime for Treelight, a Tree-sitter based syntax highlighter for JavaScript runtimes.

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

For independently renderable source rows, use `highlightLines()`:

```ts
const lines = highlighter.highlightLines(source, 'javascript');
```

Each item is a balanced HTML fragment for exactly one source line. Empty and
trailing lines are returned as empty strings so the array remains source-faithful.
The selected theme is applied to syntax captures; the host element owns the base
foreground and background used around the fragments.

`@treelight/core` provides language and theme registration, eager and lazy language loading, and synchronous highlighting after setup.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
