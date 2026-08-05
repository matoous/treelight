# @treelight/toml

## 0.5.0

## 0.4.1

### Patch Changes

- 41a210a: Automatically select browser-specific language exports so Vite and Astro emit Tree-sitter grammars as separate, cacheable WASM assets while Node and SSR imports remain self-contained. Deduplicate concurrent language loads and allow failed loads to be retried.

## 0.4.0

## 0.3.0

### Patch Changes

- d7dbbf5: Polish package metadata by exposing ESM declaration files through `import.types` and declaring the supported Node.js engine range.

## 0.2.0

### Minor Changes

- d88b607: Add common language packages based on Helix-supported Tree-sitter grammars.
