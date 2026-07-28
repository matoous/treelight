# @treelight/astro

Astro integration for rendering Markdown and MDX code blocks with Treelight.

This integration installs `@treelight/rehype` into Astro's Markdown pipeline and disables Astro's built-in Markdown syntax highlighter to avoid double-highlighting. It supports Astro's default Satteri processor and the unified processor from `@astrojs/markdown-remark`.

```js
import treelight from '@treelight/astro';
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
````

The `start` option key remains available as a compatibility alias for older local configurations, but new code should use `startLineNumber`.
