import definition, { type LanguageDefinition } from './definition';

const wasmUrl = new URL('./wasm/tree-sitter-scss.wasm?url', import.meta.url)
  .href;

const language: LanguageDefinition = {
  ...definition,
  wasmUrl,
};

export default language;
