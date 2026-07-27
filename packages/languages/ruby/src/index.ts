import highlights from './queries/highlights.scm';
import injections from './queries/injections.scm';
import locals from './queries/locals.scm';
import wasmDataUri from './wasm/tree-sitter-ruby.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;

const language = {
  id: 'ruby',
  wasm: wasmBase64,
  queries: {
    highlights,
    injections,
    locals,
  },
};

export default language;
