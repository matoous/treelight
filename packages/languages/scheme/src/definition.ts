import schemeHighlights from './queries/highlights.scm';
import schemeBuiltins from './queries/highlights-builtins.scm';

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

const highlightQuery = [schemeHighlights, schemeBuiltins]
  .filter(Boolean)
  .join('\n');

const language: LanguageDefinition = {
  id: 'scheme',
  queries: {
    highlights: highlightQuery,
  },
};

export default language;
