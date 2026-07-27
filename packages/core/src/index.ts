import {
  type HighlightOptions,
  type LanguageDefinition,
  type LanguageLoader,
  type LanguageLoaderResult,
  type LanguageModule,
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

export type LanguageRegistration =
  | LanguageDefinition
  | LanguageModule
  | (() => Promise<LanguageLoaderResult>)
  | (() => LanguageLoaderResult)
  | [string, LanguageLoader];

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
    const languageNames = await Promise.all(
      languages.map((registration) =>
        registerLanguageRegistration(treelight, registration),
      ),
    );
    await Promise.all(
      languageNames.map((name) => treelight.loadLanguage(name)),
    );
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

function resolveLanguageDefinition(result: LanguageLoaderResult) {
  return 'default' in result ? result.default : result;
}

async function registerLanguageRegistration(
  treelight: Treelight,
  registration: LanguageRegistration,
) {
  if (Array.isArray(registration)) {
    const [name, loader] = registration;
    treelight.registerLanguage(name, loader);
    return name;
  }
  const result =
    typeof registration === 'function' ? await registration() : registration;
  const definition = resolveLanguageDefinition(result);
  treelight.registerLanguage(definition);
  return definition.id;
}

function registerLanguage(definition: LanguageDefinition): void;
function registerLanguage(module: LanguageModule): void;
function registerLanguage(
  loader: () => Promise<LanguageLoaderResult>,
): Promise<void>;
function registerLanguage(loader: () => LanguageLoaderResult): void;
function registerLanguage(name: string, loader: LanguageLoader): void;
function registerLanguage(
  nameOrRegistration:
    | string
    | LanguageDefinition
    | LanguageModule
    | (() => Promise<LanguageLoaderResult>)
    | (() => LanguageLoaderResult),
  maybeLoader?: LanguageLoader,
) {
  if (typeof nameOrRegistration === 'string') {
    if (!maybeLoader) {
      throw new Error('Language loader is required.');
    }
    instance.registerLanguage(nameOrRegistration, maybeLoader);
    return;
  }
  const result =
    typeof nameOrRegistration === 'function'
      ? nameOrRegistration()
      : nameOrRegistration;
  if (result instanceof Promise) {
    return result.then((resolved) => {
      instance.registerLanguage(resolveLanguageDefinition(resolved));
    });
  }
  instance.registerLanguage(resolveLanguageDefinition(result));
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
  createHighlighter,
  type HighlightOptions,
  highlight,
  instance,
  type LanguageDefinition,
  type LanguageLoader,
  type LanguageLoaderResult,
  type LanguageModule,
  type LanguageQueries,
  type ParserInitOptions,
  registerLanguage,
  registerLanguageRegistration,
  registerTheme,
  type ThemeDefinition,
  type ThemeName,
  type ThemeStyle,
  Treelight,
  type TreelightOptions,
};

export default api;
