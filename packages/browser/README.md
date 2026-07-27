# @treelight/browser

Browser runtime helpers for Treelight.

## Install

```sh
npm install @treelight/browser @treelight/javascript @treelight/theme-github-dark
```

## Usage

```ts
import { createBrowserHighlighter } from '@treelight/browser';
import javascript from '@treelight/javascript';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await createBrowserHighlighter({
  languages: [javascript],
  themes: [githubDark],
  theme: 'github-dark',
});

document.body.innerHTML = highlighter.highlight(
  'console.info("Hello World!")',
  'javascript',
);
```

This package configures the shared `web-tree-sitter` parser WASM for browser bundlers and re-exports the core Treelight API. If your bundler cannot resolve the parser WASM asset, pass `parserWasmUrl` to `createBrowserHighlighter` or `createBrowserTreelight`.

See the [Treelight README](https://github.com/matoous/treelight#browser-usage) for full browser usage.
