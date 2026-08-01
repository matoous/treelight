# @treelight/html

[![npm version](https://img.shields.io/npm/v/@treelight/html.svg)](https://www.npmjs.com/package/@treelight/html) [![npm downloads](https://img.shields.io/npm/dm/@treelight/html.svg)](https://www.npmjs.com/package/@treelight/html)

HTML language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/html @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import htmlLanguage from '@treelight/html';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [htmlLanguage],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('<h1>Hello World!</h1>', 'html');
```

This package includes the Tree-sitter grammar WASM and highlight and injection queries for HTML. Register the relevant packages to highlight comments, `<script>` JavaScript, `<style>` CSS, and regular expressions in `pattern` attributes.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
