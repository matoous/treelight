# @treelight/rehype

## 0.3.0

### Minor Changes

- d667c2f: Support `theme=<id>` code fence metadata for selecting a registered theme per code block.
- 943efae: Add a shared stylesheet and CSS customization contract for rendered code blocks.
- 6653b6d: Support `title=<text>` code fence metadata and title bars for rendered code blocks.
- c8e55d0: Add highlighted-line metadata support for rendered code blocks.
- 630d167: Add a rehype plugin for rendering Markdown code blocks with Treelight, including optional line number rendering.
- 13eb999: Add Astro, rehype, and remark integration packages for rendering Markdown code blocks with Treelight, including optional line number rendering.

### Patch Changes

- dee2c81: Clarify Markdown integration guidance and document rehype as the recommended code block rendering path.
- d7dbbf5: Polish package metadata by exposing ESM declaration files through `import.types` and declaring the supported Node.js engine range.
- 6b2b8a0: Add shared HAST utilities for code block rendering and reuse them from the rehype and remark integrations.
- c6c9e83: Support code fence metadata for line number controls and document `startLineNumber` as the preferred custom start option.
- Updated dependencies [d667c2f]
- Updated dependencies [943efae]
- Updated dependencies [c313600]
- Updated dependencies [6653b6d]
- Updated dependencies [c8e55d0]
- Updated dependencies [d7dbbf5]
- Updated dependencies [e906bbc]
- Updated dependencies [6b2b8a0]
- Updated dependencies [60317eb]
- Updated dependencies [e1e88aa]
  - @treelight/hast@0.3.0
  - @treelight/core@0.3.0

## 0.1.0

### Minor Changes

- Add a rehype plugin for rendering code blocks with Treelight.
