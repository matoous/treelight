# @treelight/comment

## 0.5.0

## 0.4.1

### Patch Changes

- 41a210a: Automatically select browser-specific language exports so Vite and Astro emit Tree-sitter grammars as separate, cacheable WASM assets while Node and SSR imports remain self-contained. Deduplicate concurrent language loads and allow failed loads to be retried.

## 0.4.0

### Minor Changes

- c50dc5a: Add recursive Tree-sitter injection support, new injection-focused language packages, and broader injection queries for Go, HTML, Python, TypeScript, and TSX.
