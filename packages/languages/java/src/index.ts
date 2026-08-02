import definition, { type LanguageDefinition } from './definition';
import wasmDataUri from './wasm/tree-sitter-java.wasm';

const wasmBase64 = wasmDataUri.split(',')[1] ?? wasmDataUri;

const language: LanguageDefinition = {
  ...definition,
  wasm: wasmBase64,
};

export default language;
