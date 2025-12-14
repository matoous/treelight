import { ecmaHighlightQuery } from '@treelight/ecma';
import typescriptHighlights from './queries/highlights.scm';
import injections from './queries/injections.scm';
import locals from './queries/locals.scm';
import wasmDataUri from './wasm/tree-sitter-typescript.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;

const highlightQuery = [ecmaHighlightQuery, typescriptHighlights]
  .filter(Boolean)
  .join('\n');

const language = {
  id: 'typescript',
  wasm: wasmBase64,
  queries: {
    highlights: highlightQuery,
    injections,
    locals,
  },
};

export default language;
