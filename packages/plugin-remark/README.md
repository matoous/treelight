# @treelight/plugin-remark

Remark plugin for rendering Markdown and MDX code blocks with Treelight.

For most HTML pipelines, prefer `@treelight/plugin-rehype`. This package is compatibility-oriented for setups that only allow remark-stage transforms or need Markdown `code` nodes replaced before `remark-rehype` runs.

Because remark outputs raw HTML for highlighted blocks, downstream processors must allow dangerous HTML when serializing the result.

```js
import remarkTreelight from '@treelight/plugin-remark';
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
The `theme` metadata value selects a registered theme for one block and falls back to the plugin's configured `theme` when omitted.
The `title` metadata value wraps the block in a lightweight frame with a visible title bar.

Import the stylesheet from your app entrypoint or layout:

```js
import '@treelight/plugin-remark/styles.css';
```

The stylesheet exposes stable classes and CSS variables for styling generated blocks. Override variables on `.treelight` to customize padding, borders, backgrounds, and line-number appearance.
