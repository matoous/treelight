# @treelight/php

[![npm version](https://img.shields.io/npm/v/@treelight/php.svg)](https://www.npmjs.com/package/@treelight/php) [![npm downloads](https://img.shields.io/npm/dm/@treelight/php.svg)](https://www.npmjs.com/package/@treelight/php)

PHP language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/php @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import php from '@treelight/php';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [php],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('<?php echo "Hello World!";', 'php');
```

This package includes the Tree-sitter grammar WASM and highlight queries for PHP.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
