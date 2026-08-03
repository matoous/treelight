# @treelight/hast

Shared HAST utilities used by Treelight Markdown integrations.

This package is intended for integration authors. Most projects should use `@treelight/plugin-rehype`, `@treelight/plugin-remark`, or `@treelight/plugin-astro` directly.

## Styles

Import the shared stylesheet when using Treelight's Markdown integrations:

```js
import '@treelight/hast/styles.css';
```

The stylesheet defines the stable CSS contract for generated code blocks:

- `.treelight`
- `.treelight-code-block`
- `.treelight-copy-button`
- `.treelight-line`
- `.treelight-line-number`
- `.treelight-line-content`
- `.has-line-numbers`
- `.has-highlighted-lines`
- `.is-highlighted`

You can customize spacing and colors with CSS variables such as `--treelight-code-background`, `--treelight-code-padding-inline`, `--treelight-line-number-color`, `--treelight-line-number-gap`, and `--treelight-highlighted-line-background`.

## Copy Buttons

Code block integrations can wrap highlighted output with an accessible copy
button. Import the integration's `/copy` browser entry once in your client
entrypoint to activate rendered buttons. The shared runtime uses event
delegation, excludes line-number gutters and other `aria-hidden` content, and
emits `treelight-copy` or `treelight-copy-error` events from the button.

Integration authors can import the lower-level runtime directly:

```js
import '@treelight/hast/copy';
```
