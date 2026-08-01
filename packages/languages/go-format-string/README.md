# @treelight/go-format-string

Go `fmt`-style format string language definition for Treelight.

## Install

```sh
npm install @treelight/core @treelight/go @treelight/go-format-string
```

## Register for injections

```ts
import { Highlighter } from '@treelight/core';
import go from '@treelight/go';
import goFormatString from '@treelight/go-format-string';

const highlighter = await Highlighter.create({
  languages: [go, goFormatString],
});
```

Registering this package highlights verbs, flags, widths, precisions, and argument indexes inside supported `fmt` and `log` calls.
