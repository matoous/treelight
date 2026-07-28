# @treelight/rspress

Rspress plugin for rendering Markdown and MDX code blocks with Treelight.

The plugin installs a Shiki-compatible transformer into Rspress's `markdown.shiki.transformers` pipeline. Treelight renders the final code block HTML, while Rspress keeps its normal Markdown and MDX pipeline.

```ts
import { defineConfig } from '@rspress/core';
import treelight from '@treelight/rspress';
import javascript from '@treelight/javascript';
import githubDark from '@treelight/theme-github-dark';

export default defineConfig({
  plugins: [
    treelight({
      languages: [javascript],
      themes: [githubDark],
      theme: 'github-dark',
      lineNumbers: true,
    }),
  ],
});
```

Code fence metadata can override block-level rendering:

````md
```js title="src/app.js" theme=github-dark {2}
const greeting = 'hello';
console.info(greeting);
```
````

Import the stylesheet from your Rspress global CSS:

```css
@import "@treelight/rspress/styles.css";
```

Use `createTreelightShikiTransformer` when you want to wire the transformer manually through `markdown.shiki.transformers`.
