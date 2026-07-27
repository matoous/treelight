# @treelight/c

[![npm version](https://img.shields.io/npm/v/@treelight/c.svg)](https://www.npmjs.com/package/@treelight/c) [![npm downloads](https://img.shields.io/npm/dm/@treelight/c.svg)](https://www.npmjs.com/package/@treelight/c)

C language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/c @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import cLanguage from '@treelight/c';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [cLanguage],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("#include <stdio.h>\n\nint main(void) {\n  puts(\"Hello World!\");\n  return 0;\n}", 'c');
```

This package includes the Tree-sitter grammar WASM and highlight queries for C.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
