# @treelight/ecma

[![npm version](https://img.shields.io/npm/v/@treelight/ecma.svg)](https://www.npmjs.com/package/@treelight/ecma) [![npm downloads](https://img.shields.io/npm/dm/@treelight/ecma.svg)](https://www.npmjs.com/package/@treelight/ecma)

Shared ECMAScript highlight and injection queries for Treelight language packages. JavaScript-family packages use these injections for tagged templates, regular-expression literals, and JSDoc comments.

## Install

```sh
npm install @treelight/ecma
```

## Usage

Most applications should install `@treelight/javascript`, `@treelight/typescript`, or `@treelight/tsx` instead. Those packages consume the shared ECMAScript queries from this package.

```ts
import ecma, { ecmaHighlightQuery } from '@treelight/ecma';

console.log(ecma.id);
console.log(ecmaHighlightQuery);
```

See the [Treelight README](https://github.com/matoous/treelight#readme) for runtime usage.
