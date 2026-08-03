# @treelight/plugin-rehype

Recommended Markdown and MDX integration for rendering code blocks with Treelight.

Use this package when your site framework exposes rehype plugins, including Astro's unified Markdown processor, MDX, and most unified-based static site pipelines. Use `@treelight/plugin-rspress` for Rspress so its built-in code renderer is neutralized as well. This plugin runs after Markdown has been converted to HAST, so it can replace the final `<pre><code>` output without relying on dangerous raw HTML.

```js
import rehypeTreelight from '@treelight/plugin-rehype';
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

## Copy Button

Set `copyButton: true` to render a copy button for every code block. Use `copy`
or `copy=false` in fence metadata to override the setting for one block.

```js
processor.use(rehypeTreelight, {
  copyButton: true,
  languages: [javascript],
});
```

Import the browser runtime once from your client entrypoint. Buttons remain
hidden when this runtime is not loaded.

```js
import '@treelight/plugin-rehype/copy';
```

Pass an options object to customize the accessible labels, tooltips, and reset
delay:

```js
processor.use(rehypeTreelight, {
  copyButton: {
    label: 'Copy code',
    copiedLabel: 'Copied',
    errorLabel: 'Copy failed',
    resetAfter: 2000,
  },
});
```

Import the stylesheet from your app entrypoint or layout:

```js
import '@treelight/plugin-rehype/styles.css';
```

The stylesheet exposes stable classes and CSS variables for styling generated blocks. Override variables on `.treelight` and `.treelight-code-block` to customize padding, borders, backgrounds, line-number appearance, and the copy control.
