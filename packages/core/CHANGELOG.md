# @treelight/core

## 0.4.0

### Minor Changes

- c50dc5a: Add recursive Tree-sitter injection support, new injection-focused language packages, and broader injection queries for Go, HTML, Python, TypeScript, and TSX.

### Patch Changes

- @treelight/theme-github-dark@0.4.0

## 0.3.0

### Patch Changes

- d7dbbf5: Polish package metadata by exposing ESM declaration files through `import.types` and declaring the supported Node.js engine range.
- 60317eb: Add integration smoke coverage for loading every renderable language package and every bundled theme package.
- e1e88aa: Improve code block foreground color fallback for themes that define `ui.text` or foreground on `ui.background` instead of `ui.foreground`.
- Updated dependencies [d7dbbf5]
  - @treelight/theme-github-dark@0.3.0

## 0.2.0

### Patch Changes

- 7a2e922: Add package README files for npm package pages.
- Updated dependencies [7a2e922]
  - @treelight/theme-github-dark@0.2.0

## 0.1.0

### Minor Changes

- Add the browser runtime package and broaden the core registration APIs.

  `@treelight/browser` configures `web-tree-sitter` WASM loading for browser bundlers and exposes browser-specific highlighter helpers. Core registration now accepts language definitions, language modules, eager loaders, lazy loaders, and named loaders, which lets applications import or dynamically register `@treelight/<language>` packages directly.

- Prepare the public package release workflow.

  All public `@treelight/*` packages are now versioned as one fixed release group through Changesets and include public npm publish configuration. This release line is the first fixed-version monorepo release after `0.0.2`.

### Patch Changes

- Updated dependencies
  - @treelight/theme-github-dark@0.1.0
