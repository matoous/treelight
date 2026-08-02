import { createBrowserTreelight } from '@treelight/browser';

const treelight = createBrowserTreelight();
treelight.registerLanguage('sql', () => import('@treelight/sql'));

globalThis.highlightSql = (code) =>
  treelight.highlight(code, 'sql', { strict: true });
