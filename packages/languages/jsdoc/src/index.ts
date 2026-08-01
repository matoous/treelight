import highlights from './queries/highlights.scm';
import injections from './queries/injections.scm';
import wasmDataUri from './wasm/tree-sitter-jsdoc.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;

const language = {
  id: 'jsdoc',
  wasm: wasmBase64,
  queries: { highlights, injections },
};

export default language;
