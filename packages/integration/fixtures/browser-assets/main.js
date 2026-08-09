import { createBrowserTreelight } from '@treelight/browser';
import { registerLanguageCatalog, resolveLanguage } from '@treelight/catalog';
import { installTreelightCopyButtons } from '@treelight/plugin-rehype/copy';
import '@treelight/plugin-rehype/styles.css';

const treelight = createBrowserTreelight();
registerLanguageCatalog(treelight);

globalThis.highlightSql = (code) =>
  treelight.highlight(code, resolveLanguage({ path: 'query.sql' }), {
    strict: true,
  });
globalThis.installTreelightCopyButtons = installTreelightCopyButtons;
document.addEventListener('treelight-copy', (event) => {
  globalThis.lastCopiedCode = event.detail.text;
});
