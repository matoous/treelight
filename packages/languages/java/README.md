# @treelight/java

[![npm version](https://img.shields.io/npm/v/@treelight/java.svg)](https://www.npmjs.com/package/@treelight/java) [![npm downloads](https://img.shields.io/npm/dm/@treelight/java.svg)](https://www.npmjs.com/package/@treelight/java)

Java language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/java @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import java from '@treelight/java';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [java],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('System.out.println("Hello World!");', 'java');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Java.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
