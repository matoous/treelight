# @treelight/kotlin

[![npm version](https://img.shields.io/npm/v/@treelight/kotlin.svg)](https://www.npmjs.com/package/@treelight/kotlin) [![npm downloads](https://img.shields.io/npm/dm/@treelight/kotlin.svg)](https://www.npmjs.com/package/@treelight/kotlin)

Kotlin language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/kotlin @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import kotlin from '@treelight/kotlin';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [kotlin],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'kotlin');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Kotlin.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
