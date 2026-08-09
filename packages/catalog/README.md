# @treelight/catalog

Lazy language registration and file-to-language resolution for the complete set of bundled Treelight grammars.

```ts
import { createBrowserTreelight } from '@treelight/browser';
import {
  registerLanguageCatalog,
  resolveLanguage,
} from '@treelight/catalog';

const treelight = createBrowserTreelight();
registerLanguageCatalog(treelight);

const language = resolveLanguage({ fileType: 'terraform', path: 'main.tf' });
const lines = language
  ? await treelight.highlightLines('resource "example" "main" {}', language)
  : null;
```

Catalog registration is lazy: bundlers emit each grammar as its own asset and Treelight fetches only the selected language and encountered injection targets.

`highlightLines()` returns source-faithful HTML fragments, including empty strings
for empty or trailing lines. Apply the container foreground and background in the
host application; the selected Treelight theme styles the syntax spans.
