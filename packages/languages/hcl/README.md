# @treelight/hcl

[![npm version](https://img.shields.io/npm/v/@treelight/hcl.svg)](https://www.npmjs.com/package/@treelight/hcl) [![npm downloads](https://img.shields.io/npm/dm/@treelight/hcl.svg)](https://www.npmjs.com/package/@treelight/hcl)

HCL / Terraform language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/hcl @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import hcl from '@treelight/hcl';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [hcl],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight(code, 'hcl');
```

This package includes the Tree-sitter grammar WASM and highlight queries for HCL / Terraform.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
