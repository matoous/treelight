import highlights from './queries/highlights.scm';
import wasmDataUri from './wasm/tree-sitter-comment.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;

const language = {
  id: 'comment',
  wasm: wasmBase64,
  queries: { highlights },
};

export default language;
