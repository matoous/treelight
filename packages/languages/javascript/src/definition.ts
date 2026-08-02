import { ecmaHighlightQuery } from '@treelight/ecma';
import javascriptHighlights from './queries/highlights.scm';
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

const highlightQuery = [ecmaHighlightQuery, javascriptHighlights]
  .filter(Boolean)
  .join('\n');

const language: LanguageDefinition = {
  id: 'javascript',
  queries: {
    highlights: highlightQuery,
    injections,
    locals,
  },
};

export default language;
