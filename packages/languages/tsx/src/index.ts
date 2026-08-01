import { ecmaHighlightQuery, ecmaInjectionQuery } from '@treelight/ecma';
import tsxHighlights from './queries/highlights.scm';
import locals from './queries/locals.scm';
import typescriptHighlights from './queries/typescript-highlights.scm';
import wasmDataUri from './wasm/tree-sitter-tsx.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;

const highlightQuery = [ecmaHighlightQuery, typescriptHighlights, tsxHighlights]
  .filter(Boolean)
  .join('\n');

const language = {
  id: 'tsx',
  wasm: wasmBase64,
  queries: {
    highlights: highlightQuery,
    injections: ecmaInjectionQuery,
    locals,
  },
};

export default language;
