import { ecmaHighlightQuery, ecmaInjectionQuery } from '@treelight/ecma';
import typescriptHighlights from './queries/highlights.scm';
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

const highlightQuery = [ecmaHighlightQuery, typescriptHighlights]
  .filter(Boolean)
  .join('\n');

const language: LanguageDefinition = {
  id: 'typescript',
  queries: {
    highlights: highlightQuery,
    injections: ecmaInjectionQuery,
    locals,
  },
};

export default language;
