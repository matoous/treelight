# @treelight/core

Core runtime for Treelight, a Tree-sitter based syntax highlighter for JavaScript runtimes.

## Install

```sh
npm install @treelight/core @treelight/javascript @treelight/theme-github-dark
```

## Usage

```ts
import { Highlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import githubDark from '@treelight/theme-github-dark';

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [githubDark],
  theme: 'github-dark',
});

const html = highlighter.highlight('console.info("Hello World!")', 'javascript');
```

`@treelight/core` provides language and theme registration, eager and lazy language loading, and synchronous highlighting after setup.

See the [Treelight README](https://github.com/matoous/treelight#readme) for full usage.
