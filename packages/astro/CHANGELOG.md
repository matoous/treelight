# @treelight/astro

## 0.3.0

### Minor Changes

- 442b247: Add an Astro Code component for rendering dynamic snippets outside Markdown.
- d667c2f: Support `theme=<id>` code fence metadata for selecting a registered theme per code block.
- 943efae: Add a shared stylesheet and CSS customization contract for rendered code blocks.
- 6653b6d: Support `title=<text>` code fence metadata and title bars for rendered code blocks.
- c8e55d0: Add highlighted-line metadata support for rendered code blocks.
- 16b70e4: Add an Astro integration for rendering Markdown and MDX code blocks with Treelight.
- 13eb999: Add Astro, rehype, and remark integration packages for rendering Markdown code blocks with Treelight, including optional line number rendering.

### Patch Changes

- 1b34692: Disable Astro's built-in Markdown highlighter when Treelight is installed and support both satteri and unified Markdown processor configuration shapes.
- dee2c81: Clarify Markdown integration guidance and document rehype as the recommended code block rendering path.
- d7dbbf5: Polish package metadata by exposing ESM declaration files through `import.types` and declaring the supported Node.js engine range.
- c6c9e83: Support code fence metadata for line number controls and document `startLineNumber` as the preferred custom start option.
- Updated dependencies [d667c2f]
- Updated dependencies [943efae]
- Updated dependencies [c313600]
- Updated dependencies [6653b6d]
- Updated dependencies [c8e55d0]
- Updated dependencies [dee2c81]
- Updated dependencies [d7dbbf5]
- Updated dependencies [e906bbc]
- Updated dependencies [6b2b8a0]
- Updated dependencies [630d167]
- Updated dependencies [c6c9e83]
- Updated dependencies [60317eb]
- Updated dependencies [e1e88aa]
- Updated dependencies [13eb999]
  - @treelight/hast@0.3.0
  - @treelight/rehype@0.3.0
  - @treelight/core@0.3.0

## 0.1.0

### Minor Changes

- Add an Astro integration for rendering Markdown code blocks with Treelight.
