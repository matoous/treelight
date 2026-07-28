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
