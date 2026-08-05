# @treelight/plugin-rspress

## 0.1.0

### Minor Changes

- bfc16c2: Add language packages for C#, Kotlin, Swift, Dart, HCL/Terraform, Nix,
  Protobuf, Vue, Svelte, Astro, Fish, PowerShell, AWK, jq, LaTeX, ERB, HEEx,
  Lua format strings, and PHPDoc.

  Move the Astro, Rehype, Remark, and Rspress integrations to `@treelight/plugin-*`
  package names, leaving `@treelight/astro` available for the Astro language.

- aa12fa5: Add opt-in copy buttons to code block integrations, including per-fence
  overrides, customizable status labels, shared styling, and delegated browser
  runtimes. The icon-only controls briefly show a checkmark after successful
  copies while retaining accessible status updates.

  The Rspress plugin now owns the complete code-fence pipeline through
  Treelight's remark and rehype stages, neutralizes Rspress's built-in Shiki
  rendering, and bypasses its code-block UI with a native pre component. The
  shared HAST line renderer also omits terminal empty rows while preserving
  intentional blank lines.

### Patch Changes

- Updated dependencies [bfc16c2]
- Updated dependencies [aa12fa5]
  - @treelight/plugin-rehype@0.5.0
  - @treelight/hast@0.5.0

## 0.2.2

### Patch Changes

- Updated dependencies [41a210a]
- Updated dependencies [47b8bd6]
  - @treelight/core@0.4.1
  - @treelight/hast@0.4.1

## 0.2.1

### Patch Changes

- Updated dependencies [c50dc5a]
  - @treelight/core@0.4.0
  - @treelight/hast@0.4.0

## 0.2.0

### Minor Changes

- e906bbc: Add a Rspress plugin and Shiki-compatible transformer for rendering code blocks with Treelight.

### Patch Changes

- d7dbbf5: Polish package metadata by exposing ESM declaration files through `import.types` and declaring the supported Node.js engine range.
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
