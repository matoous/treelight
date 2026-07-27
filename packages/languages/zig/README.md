# @treelight/zig

[![npm version](https://img.shields.io/npm/v/@treelight/zig.svg)](https://www.npmjs.com/package/@treelight/zig) [![npm downloads](https://img.shields.io/npm/dm/@treelight/zig.svg)](https://www.npmjs.com/package/@treelight/zig)

Zig language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/zig @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import zig from '@treelight/zig';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [zig],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight("const std = @import(\"std\");\n\npub fn main() void {\n    std.debug.print(\"Hello World!\\n\", .{});\n}", 'zig');
```

This package includes the Tree-sitter grammar WASM and highlight queries for Zig.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
