# @treelight/astro

Astro integration for rendering Markdown and MDX code blocks with Treelight.

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

Use `lineNumbers: { start: 10 }` to start numbering from a custom line.
