import highlights from './queries/highlights.scm';
import injections from './queries/injections.scm';

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
  id: 'python',
  queries: {
    highlights,
    injections,
  },
};

export default language;
