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

export type ThemeRegistration = ThemeDefinition | [string, ThemeDefinition];

export type LanguageRegistration = [string, LanguageLoader];

export interface CreateHighlighterOptions extends TreelightOptions {
  languages?: LanguageRegistration[];
  themes?: ThemeRegistration[];
}

export class Highlighter {
  readonly treelight: Treelight;

  private constructor(treelight: Treelight) {
    this.treelight = treelight;
  }

  static async create(
    options: CreateHighlighterOptions = {},
  ): Promise<Highlighter> {
    const { languages = [], themes = [], ...treelightOptions } = options;
    const treelight = new Treelight(treelightOptions);
    themes.forEach((themeDefinition) => {
      if (Array.isArray(themeDefinition)) {
        treelight.registerTheme(themeDefinition[0], themeDefinition[1]);
      } else {
        treelight.registerTheme(themeDefinition);
      }
    });
    languages.forEach(([name, loader]) => {
      treelight.registerLanguage(name, loader);
    });
    await Promise.all(languages.map(([name]) => treelight.loadLanguage(name)));
    return new Highlighter(treelight);
  }

  highlight(code: string, language: string, options?: HighlightOptions) {
    return this.treelight.highlightSync(code, language, options);
  }
}

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

async function createHighlighter(
  options: CreateHighlighterOptions = {},
): Promise<Highlighter> {
  return Highlighter.create(options);
}

const api = {
  Treelight,
  Highlighter,
  highlight,
  registerLanguage,
  registerTheme,
  instance,
  createHighlighter,
};

export {
  Treelight,
  highlight,
  registerLanguage,
  registerTheme,
  instance,
  createHighlighter,
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
