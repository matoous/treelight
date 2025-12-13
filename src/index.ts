import {
  type HighlightOptions,
  type LanguageDefinition,
  type LanguageLoader,
  type LanguageQueries,
  type ParserInitOptions,
  type ThemeDefinition,
  type ThemeName,
  type ThemeStyle,
  Treelight,
  type TreelightOptions,
} from './treelight.js';

const instance = new Treelight();

async function highlight(
  code: string,
  language: string,
  options?: HighlightOptions,
) {
  return instance.highlight(code, language, options);
}

function registerLanguage(name: string, loader: LanguageLoader) {
  instance.registerLanguage(name, loader);
}

function registerTheme(theme: ThemeDefinition): void;
function registerTheme(name: string, theme: ThemeDefinition): void;
function registerTheme(
  nameOrDefinition: string | ThemeDefinition,
  maybeDefinition?: ThemeDefinition,
) {
  instance.registerTheme(nameOrDefinition, maybeDefinition);
}

const api = {
  Treelight,
  highlight,
  registerLanguage,
  registerTheme,
  instance,
};

export {
  Treelight,
  highlight,
  registerLanguage,
  registerTheme,
  instance,
  type HighlightOptions,
  type LanguageDefinition,
  type LanguageLoader,
  type LanguageQueries,
  type ParserInitOptions,
  type ThemeDefinition,
  type ThemeStyle,
  type ThemeName,
  type TreelightOptions,
};

export default api;
