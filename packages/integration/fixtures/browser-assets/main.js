import { createBrowserTreelight } from '@treelight/browser';
import { installTreelightCopyButtons } from '@treelight/plugin-rehype/copy';
import '@treelight/plugin-rehype/styles.css';

const treelight = createBrowserTreelight();
treelight.registerLanguage('sql', () => import('@treelight/sql'));

globalThis.highlightSql = (code) =>
  treelight.highlight(code, 'sql', { strict: true });
globalThis.installTreelightCopyButtons = installTreelightCopyButtons;
document.addEventListener('treelight-copy', (event) => {
  globalThis.lastCopiedCode = event.detail.text;
});
