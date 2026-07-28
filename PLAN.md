# Treelight Markdown Integration Follow-Up Plan

## 1. Fence Metadata

- [x] Parse Markdown code fence metadata in the rehype and remark integrations.
- [x] Support block-level line number controls:
  - `showLineNumbers`
  - `showLineNumbers=false`
  - `startLineNumber=41`
- [x] Keep global `lineNumbers` options as defaults that fence metadata can override.

## 2. Line Number API Cleanup

- [x] Add `startLineNumber` as the documented object option.
- [x] Keep `start` as a backwards-compatible alias unless we decide to remove it before the first published release.
- [x] Update README examples and tests to prefer `startLineNumber`.

## 3. Shared HAST Rendering Utilities

- [x] Move duplicated HTML parsing, class helpers, and line splitting logic out of the rehype and remark packages.
- [x] Keep the public package APIs unchanged while reducing implementation drift.

## 4. Astro Integration Hardening

- [x] Disable Astro's built-in Markdown syntax highlighter when the Treelight integration is installed.
- [x] Detect unsupported Markdown processor configurations and warn clearly.
- [x] Add Satteri support if Astro exposes the same processor shape used by current integrations.

## 5. Documentation Guidance

- [x] Document `@treelight/rehype` as the recommended Markdown/MDX integration.
- [x] Document `@treelight/remark` as compatibility-oriented for remark-stage transforms.
- [x] Add examples for global and per-block line numbers.

## 6. Optional Astro Component

- [ ] Consider an Astro `<Code>` component for rendering dynamic snippets outside Markdown.
- [ ] Defer until the Markdown pipeline supports metadata and shared rendering utilities.
