import schemeHighlights from './queries/highlights.scm';
import schemeBuiltins from './queries/highlights-builtins.scm';
import wasmDataUri from './wasm/tree-sitter-lilypond_scheme.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;
const highlightQuery = [schemeHighlights, schemeBuiltins]
  .filter(Boolean)
  .join('\n');

const language = {
  id: 'scheme',
  wasm: wasmBase64,
  queries: {
    highlights: highlightQuery,
  },
};

export default language;
