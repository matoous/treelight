---
"@treelight/hast": minor
"@treelight/plugin-astro": minor
"@treelight/plugin-rehype": minor
"@treelight/plugin-remark": minor
"@treelight/plugin-rspress": minor
---

Add opt-in copy buttons to code block integrations, including per-fence
overrides, customizable status labels, shared styling, and delegated browser
runtimes. The icon-only controls briefly show a checkmark after successful
copies while retaining accessible status updates.

The Rspress plugin now owns the complete code-fence pipeline through
Treelight's remark and rehype stages, neutralizes Rspress's built-in Shiki
rendering, and bypasses its code-block UI with a native pre component. The
shared HAST line renderer also omits terminal empty rows while preserving
intentional blank lines.
