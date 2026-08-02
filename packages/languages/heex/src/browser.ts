import definition, { type LanguageDefinition } from './definition';

const wasmUrl = new URL('./wasm/tree-sitter-heex.wasm?url', import.meta.url)
  .href;

const language: LanguageDefinition = {
  ...definition,
  wasmUrl,
};

export default language;
