# @treelight/markdown-inline

Inline Markdown language definition for Treelight. Register it with `@treelight/markdown` to highlight emphasis, links, code spans, and other inline constructs.

## Install

```sh
npm install @treelight/core @treelight/markdown @treelight/markdown-inline
```

## Register for injections

```ts
import { Highlighter } from '@treelight/core';
import markdown from '@treelight/markdown';
import markdownInline from '@treelight/markdown-inline';

const highlighter = await Highlighter.create({
  languages: [markdown, markdownInline],
});
```
