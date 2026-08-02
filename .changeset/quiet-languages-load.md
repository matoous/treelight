---
'@treelight/core': patch
---

Deduplicate concurrent language loads by registration name and resolved definition ID, including injected-language loads, while allowing failed loads to be retried.
