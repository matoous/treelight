# @treelight/comment

Comment annotation language definition for Treelight. It highlights tags such as `TODO`, `WARN`, and `FIXME`, issue numbers, mentions, and URLs inside comments injected by host languages.

## Install

```sh
npm install @treelight/comment @treelight/core
```

## Register for injections

```ts
import comment from '@treelight/comment';
import { Highlighter } from '@treelight/core';
import go from '@treelight/go';

const highlighter = await Highlighter.create({
  languages: [go, comment],
});
```

See the [Treelight injection guide](https://github.com/matoous/treelight#injections) for full usage.
