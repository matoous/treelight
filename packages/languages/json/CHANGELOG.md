# @treelight/json

## 0.3.0

### Patch Changes

- d7dbbf5: Polish package metadata by exposing ESM declaration files through `import.types` and declaring the supported Node.js engine range.

## 0.2.0

### Patch Changes

- 7a2e922: Add package README files for npm package pages.

## 0.1.0

### Minor Changes

- Expand the language package set and refresh bundled query metadata.

  Treelight now ships standalone language packages for Elixir, Go, HTML, Java, JavaScript, JSON, PHP, Python, Rust, Scheme, TSX, TypeScript, and YAML, plus the shared ECMAScript query package. Language packages now declare upstream grammar metadata under `treelightLanguage`, including repository, revision, artifact, and query source paths, and placeholder or failed-download query files were removed.

- Prepare the public package release workflow.

  All public `@treelight/*` packages are now versioned as one fixed release group through Changesets and include public npm publish configuration. This release line is the first fixed-version monorepo release after `0.0.2`.
