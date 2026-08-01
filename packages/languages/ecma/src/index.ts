import highlights from './queries/highlights.scm';
import injections from './queries/injections.scm';

export const ecmaHighlightQuery = highlights;
export const ecmaInjectionQuery = injections;

const language = {
  id: 'ecma',
  queries: {
    highlights,
    injections,
  },
};

export default language;
