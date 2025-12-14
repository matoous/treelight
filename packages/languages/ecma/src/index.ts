import highlights from './queries/highlights.scm';

export const ecmaHighlightQuery = highlights;

const language = {
  id: 'ecma',
  queries: {
    highlights,
  },
};

export default language;
