import { ecmaHighlightQuery, ecmaInjectionQuery } from '@treelight/ecma';
import tsxHighlights from './queries/highlights.scm';
import locals from './queries/locals.scm';
import typescriptHighlights from './queries/typescript-highlights.scm';

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

const highlightQuery = [ecmaHighlightQuery, typescriptHighlights, tsxHighlights]
  .filter(Boolean)
  .join('\n');

const language: LanguageDefinition = {
  id: 'tsx',
  queries: {
    highlights: highlightQuery,
    injections: ecmaInjectionQuery,
    locals,
  },
};

export default language;
