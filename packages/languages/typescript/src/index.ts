import { ecmaHighlightQuery, ecmaInjectionQuery } from '@treelight/ecma';
import typescriptHighlights from './queries/highlights.scm';
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
    injections: ecmaInjectionQuery,
    locals,
  },
};

export default language;
