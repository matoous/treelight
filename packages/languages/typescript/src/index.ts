import highlights from './queries/highlights.scm';
import injections from './queries/injections.scm';
import locals from './queries/locals.scm';
import wasmDataUri from './wasm/tree-sitter-typescript.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;

const language = {
  id: 'typescript',
  wasm: wasmBase64,
  queries: {
    highlights,
    injections,
    locals,
  },
};

export default language;
