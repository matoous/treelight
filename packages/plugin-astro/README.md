# @treelight/plugin-astro

Astro integration for rendering Markdown and MDX code blocks with Treelight.

This integration installs `@treelight/plugin-rehype` into Astro's Markdown pipeline and disables Astro's built-in Markdown syntax highlighter to avoid double-highlighting. It supports Astro's default Satteri processor and the unified processor from `@astrojs/markdown-remark`.

```js
import treelight from '@treelight/plugin-astro';
import javascript from '@treelight/javascript';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [
    treelight({
      languages: [javascript],
      lineNumbers: true,
    }),
  ],
});
```

Set `lineNumbers: true` to enable line numbers for every rendered code block.
Use `lineNumbers: { startLineNumber: 10 }` to start numbering from a custom line.

Code fence metadata can override the global setting per block:

````md
```js showLineNumbers startLineNumber=10
console.info('hello');
```

```js showLineNumbers=false
console.info('hidden gutter');
```

```js {2,4-6}
console.info('highlighted lines');
```

```js theme=github-light
console.info('light theme');
```

```js title="src/app.js"
console.info('titled block');
```
````

The `start` option key remains available as a compatibility alias for older local configurations, but new code should use `startLineNumber`.
The `theme` metadata value selects a registered theme for one block and falls back to the integration's configured `theme` when omitted.
The `title` metadata value wraps the block in a lightweight frame with a visible title bar.

## Copy Button

Set `copyButton: true` on the integration or `<Code>` component. Use `copy` or
`copy=false` in fence metadata to override the integration setting for one
block.

Load the browser runtime once from an Astro layout:

```astro
<script>
  import '@treelight/plugin-astro/copy';
</script>
```

The generated buttons stay hidden when this runtime is not loaded.

Import the stylesheet from your layout:

```astro
---
import '@treelight/plugin-astro/styles.css';
---
```

The stylesheet exposes stable classes and CSS variables for styling generated blocks. Override variables on `.treelight` to customize padding, borders, backgrounds, and line-number appearance.

## Component

Use the Astro component when you need to render a dynamic snippet outside Markdown:

```astro
---
import Code from '@treelight/plugin-astro/components/Code.astro';
import javascript from '@treelight/javascript';
---

<Code
  code={`const greeting = 'hello';`}
  copyButton
  lang="javascript"
  languages={[javascript]}
  title="src/app.js"
  highlightLines="1"
  lineNumbers
/>
```

For pages with many dynamic snippets, create a highlighter once and pass it through the `highlighter` prop.
