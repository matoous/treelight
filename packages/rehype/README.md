# @treelight/rehype

Recommended Markdown and MDX integration for rendering code blocks with Treelight.

Use this package when your site framework exposes rehype plugins, including Rspress, Astro's unified Markdown processor, MDX, and most unified-based static site pipelines. It runs after Markdown has been converted to HAST, so it can replace the final `<pre><code>` output without relying on dangerous raw HTML.

```js
import rehypeTreelight from '@treelight/rehype';
import javascript from '@treelight/javascript';

export default {
  markdown: {
    rehypePlugins: [
      [
        rehypeTreelight,
        {
          languages: [javascript],
          lineNumbers: true,
        },
      ],
    ],
  },
};
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
