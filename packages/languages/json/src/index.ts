import highlights from './queries/highlights.scm';
import wasmDataUri from './wasm/tree-sitter-json.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;

const language = {
  id: 'json',
  wasm: wasmBase64,
  queries: {
    highlights,
  },
};

export default language;
