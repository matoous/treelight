import highlights from './queries/highlights.scm';
import injections from './queries/injections.scm';
import locals from './queries/locals.scm';

export interface LanguageDefinition {
  id: string;
  wasm?: string | ArrayBuffer | Uint8Array;
  wasmUrl?: string;
  queries: {
    highlights: string;
    injections?: string;
    locals?: string;
  };
}

const language: LanguageDefinition = {
  id: 'svelte',
  queries: {
    highlights,
    injections,
    locals,
  },
};

export default language;
