# @treelight/hast

Shared HAST utilities used by Treelight Markdown integrations.

This package is intended for integration authors. Most projects should use `@treelight/rehype`, `@treelight/remark`, or `@treelight/astro` directly.

## Styles

Import the shared stylesheet when using Treelight's Markdown integrations:

```js
import '@treelight/hast/styles.css';
```

The stylesheet defines the stable CSS contract for generated code blocks:

- `.treelight`
- `.treelight-line`
- `.treelight-line-number`
- `.treelight-line-content`
- `.has-line-numbers`
- `.has-highlighted-lines`
- `.is-highlighted`

You can customize spacing and colors with CSS variables such as `--treelight-code-background`, `--treelight-code-padding-inline`, `--treelight-line-number-color`, `--treelight-line-number-gap`, and `--treelight-highlighted-line-background`.
