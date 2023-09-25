<div align="center">

# Treelight

[Tree-sitter](https://tree-sitter.github.io/tree-sitter/) based syntax highlighter for javascript runtimes.
Uses [helix](https://github.com/helix-editor/helix) queries and themes under the hood.

</div>

## Usage

Install `treelight` using `npm`:

```sh
npm i treelight
```

In your code:

```ts
import { highlight } from 'treelight';

const code = highlight(`console.info("Hello World!")`, 'ts');

console.info(code);
```
