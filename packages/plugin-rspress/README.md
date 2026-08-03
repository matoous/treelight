# @treelight/plugin-rspress

Rspress plugin for rendering every Markdown and MDX code fence with Treelight.

```ts
import { defineConfig } from '@rspress/core';
import treelight from '@treelight/plugin-rspress';
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

The plugin owns the complete fence-rendering path. It preserves the language
before Rspress's built-in Shiki stage, prevents that stage from loading or
rendering languages, highlights the block through `@treelight/plugin-rehype`,
and renders the result through a native `<pre>` instead of Rspress's code-block
component. Rspress therefore does not add its own frame, copy button, or wrap
button.

Rspress 2 currently has no supported option for removing its built-in Shiki
rehype plugin, so Shiki remains a transitive Rspress dependency and its empty
transformer pass still runs. It does not render Treelight-managed fences.

Code fence metadata can override block-level rendering:

````md
```js title="src/app.js" theme=github-dark {2}
const greeting = 'hello';
console.info(greeting);
```
````

Import the stylesheet from your Rspress global CSS:

```css
@import "@treelight/plugin-rspress/styles.css";
```

## Copy Button

Set `copyButton: true` to render a Treelight copy button for every code block,
then import the browser runtime once from your custom theme entry:

```ts
import '@treelight/plugin-rspress/copy';
```

Use `copy` or `copy=false` in fence metadata to override the setting for one
block. The Rspress plugin bypasses Rspress's own copy control, so only the
Treelight button is rendered.
