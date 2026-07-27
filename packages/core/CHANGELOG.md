# @treelight/core

## 0.1.0

### Minor Changes

- Add the browser runtime package and broaden the core registration APIs.

  `@treelight/browser` configures `web-tree-sitter` WASM loading for browser bundlers and exposes browser-specific highlighter helpers. Core registration now accepts language definitions, language modules, eager loaders, lazy loaders, and named loaders, which lets applications import or dynamically register `@treelight/<language>` packages directly.

- Prepare the public package release workflow.

  All public `@treelight/*` packages are now versioned as one fixed release group through Changesets and include public npm publish configuration. This release line is the first fixed-version monorepo release after `0.0.2`.

### Patch Changes

- Updated dependencies
  - @treelight/theme-github-dark@0.1.0
