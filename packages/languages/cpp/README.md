# @treelight/cpp

[![npm version](https://img.shields.io/npm/v/@treelight/cpp.svg)](https://www.npmjs.com/package/@treelight/cpp) [![npm downloads](https://img.shields.io/npm/dm/@treelight/cpp.svg)](https://www.npmjs.com/package/@treelight/cpp)

C++ language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/cpp @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import cpp from '@treelight/cpp';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [cpp],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("#include <iostream>\n\nint main() {\n  std::cout << \"Hello World!\" << std::endl;\n}", 'cpp');
```

This package includes the Tree-sitter grammar WASM and highlight queries for C++.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
