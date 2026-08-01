# @treelight/jsdoc

JSDoc language definition for Treelight. JavaScript, TypeScript, and TSX inject this grammar into comments; JSDoc can then inject comment annotations and fenced example languages recursively.

## Install

```sh
npm install @treelight/comment @treelight/core @treelight/javascript @treelight/jsdoc
```

## Register for injections

```ts
import comment from '@treelight/comment';
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import jsdoc from '@treelight/jsdoc';

const highlighter = await Highlighter.create({
  languages: [javascript, jsdoc, comment],
});
```
