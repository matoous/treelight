# @treelight/remark

Remark plugin for rendering Markdown and MDX code blocks with Treelight.

For most HTML pipelines, prefer `@treelight/rehype`. This package is compatibility-oriented for setups that only allow remark-stage transforms or need Markdown `code` nodes replaced before `remark-rehype` runs.

Because remark outputs raw HTML for highlighted blocks, downstream processors must allow dangerous HTML when serializing the result.

```js
import remarkTreelight from '@treelight/remark';
import javascript from '@treelight/javascript';

export default {
  markdown: {
    remarkPlugins: [
      [
        remarkTreelight,
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
