import highlights from './queries/highlights.scm';
import wasmDataUri from './wasm/tree-sitter-go-format-string.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;

const language = {
  id: 'go-format-string',
  wasm: wasmBase64,
  queries: { highlights },
};

export default language;
