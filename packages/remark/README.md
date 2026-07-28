# @treelight/remark

Remark plugin for rendering Markdown and MDX code blocks with Treelight.

For most HTML pipelines, prefer `@treelight/rehype`. Use this package when you specifically need to transform Markdown code nodes before remark-rehype runs.

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

Use `lineNumbers: { startLineNumber: 10 }` to start numbering from a custom line.
The shorter `start` key is also accepted as an alias.

Code fence metadata can override the global setting per block:

````md
```js showLineNumbers startLineNumber=10
console.info('hello');
```

```js showLineNumbers=false
console.info('hidden gutter');
```
````
