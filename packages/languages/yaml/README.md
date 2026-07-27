# @treelight/yaml

[![npm version](https://img.shields.io/npm/v/@treelight/yaml.svg)](https://www.npmjs.com/package/@treelight/yaml) [![npm downloads](https://img.shields.io/npm/dm/@treelight/yaml.svg)](https://www.npmjs.com/package/@treelight/yaml)

YAML language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/yaml @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import yaml from '@treelight/yaml';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [yaml],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('message: Hello World!', 'yaml');
```

This package includes the Tree-sitter grammar WASM and highlight queries for YAML.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
