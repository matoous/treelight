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

Use `lineNumbers: { start: 10 }` to start numbering from a custom line.
