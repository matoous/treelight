# @treelight/rehype

Rehype plugin for rendering Markdown and MDX code blocks with Treelight.

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
