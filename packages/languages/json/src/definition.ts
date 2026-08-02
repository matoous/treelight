import highlights from './queries/highlights.scm';

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
  id: 'json',
  queries: {
    highlights,
  },
};

export default language;
