# @treelight/vue

[![npm version](https://img.shields.io/npm/v/@treelight/vue.svg)](https://www.npmjs.com/package/@treelight/vue) [![npm downloads](https://img.shields.io/npm/dm/@treelight/vue.svg)](https://www.npmjs.com/package/@treelight/vue)

Vue language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/vue @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import vue from '@treelight/vue';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [vue],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'vue');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Vue.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
