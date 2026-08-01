# @treelight/hast

## 0.4.0

## 0.3.0

### Minor Changes

- d667c2f: Support `theme=<id>` code fence metadata for selecting a registered theme per code block.
- 943efae: Add a shared stylesheet and CSS customization contract for rendered code blocks.
- 6653b6d: Support `title=<text>` code fence metadata and title bars for rendered code blocks.
- c8e55d0: Add highlighted-line metadata support for rendered code blocks.
- 6b2b8a0: Add shared HAST utilities for code block rendering and reuse them from the rehype and remark integrations.

### Patch Changes

- c313600: Treat highlighted-line metadata as source-line ranges and support `lineNumbers` fence metadata as a line-number alias.
- d7dbbf5: Polish package metadata by exposing ESM declaration files through `import.types` and declaring the supported Node.js engine range.
- e906bbc: Add a Rspress plugin and Shiki-compatible transformer for rendering code blocks with Treelight.

## 0.1.0

### Minor Changes

- Add shared HAST utilities for Treelight Markdown integrations.
