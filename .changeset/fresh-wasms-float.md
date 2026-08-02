---
'@treelight/bash': patch
'@treelight/c': patch
'@treelight/comment': patch
'@treelight/cpp': patch
'@treelight/core': patch
'@treelight/css': patch
'@treelight/dockerfile': patch
'@treelight/elixir': patch
'@treelight/go-format-string': patch
'@treelight/go': patch
'@treelight/graphql': patch
'@treelight/html': patch
'@treelight/java': patch
'@treelight/javascript': patch
'@treelight/jsdoc': patch
'@treelight/json': patch
'@treelight/lua': patch
'@treelight/markdown-inline': patch
'@treelight/markdown': patch
'@treelight/php': patch
'@treelight/python': patch
'@treelight/regex': patch
'@treelight/ruby': patch
'@treelight/rust': patch
'@treelight/scheme': patch
'@treelight/sql': patch
'@treelight/toml': patch
'@treelight/tsx': patch
'@treelight/typescript': patch
'@treelight/yaml': patch
'@treelight/zig': patch
---

Automatically select browser-specific language exports so Vite and Astro emit Tree-sitter grammars as separate, cacheable WASM assets while Node and SSR imports remain self-contained. Deduplicate concurrent language loads and allow failed loads to be retried.
