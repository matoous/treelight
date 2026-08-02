import {
  type CreateHighlighterOptions,
  createHighlighter,
  Highlighter,
  type LanguageDefinition,
  type LanguageLoader,
  type LanguageLoaderResult,
  type LanguageModule,
  type LanguageRegistration,
  type ParserInitOptions,
  type ThemeDefinition,
  type ThemeModifier,
  type ThemeRegistration,
  type ThemeStyle,
  type ThemeUnderline,
  type ThemeUnderlineStyle,
  Treelight,
  type TreelightOptions,
} from '@treelight/core';
import defaultParserWasmUrl from 'web-tree-sitter/web-tree-sitter.wasm?url';

export interface BrowserParserOptions {
  parser?: ParserInitOptions;
  parserWasmUrl?: string;
}

export interface BrowserTreelightOptions
  extends TreelightOptions,
    BrowserParserOptions {
  languages?: BrowserTreelightLanguageRegistration[];
  themes?: ThemeRegistration[];
}

export type BrowserTreelightLanguageRegistration =
  | LanguageDefinition
  | LanguageModule
  | [string, LanguageLoader];

export type BrowserHighlighterOptions = CreateHighlighterOptions &
  BrowserParserOptions;

export function createBrowserParserOptions(
  parserWasmUrl = defaultParserWasmUrl,
): ParserInitOptions {
  return {
    locateFile(scriptName: string) {
      if (
        scriptName === 'web-tree-sitter.wasm' ||
        scriptName === 'tree-sitter.wasm'
      ) {
        return parserWasmUrl;
      }
      return scriptName;
    },
  };
}

function withBrowserParser<T extends BrowserParserOptions>(options: T) {
  const { parser, parserWasmUrl, ...rest } = options;
  return {
    ...rest,
    parser: {
      ...createBrowserParserOptions(parserWasmUrl),
      ...parser,
    },
  };
}

export function createBrowserTreelight(
  options: BrowserTreelightOptions = {},
): Treelight {
  const { languages = [], themes = [], ...treelightOptions } = options;
  const treelight = new Treelight(withBrowserParser(treelightOptions));
  themes.forEach((themeDefinition) => {
    if (Array.isArray(themeDefinition)) {
      treelight.registerTheme(themeDefinition[0], themeDefinition[1]);
    } else {
      treelight.registerTheme(themeDefinition);
    }
  });
  languages.forEach((registration) => {
    if (Array.isArray(registration)) {
      treelight.registerLanguage(registration[0], registration[1]);
      return;
    }
    treelight.registerLanguage(
      'default' in registration ? registration.default : registration,
    );
  });
  return treelight;
}

export function createBrowserHighlighter(
  options: BrowserHighlighterOptions = {},
) {
  return createHighlighter(withBrowserParser(options));
}

export {
  Highlighter,
  type LanguageDefinition,
  type LanguageLoader,
  type LanguageLoaderResult,
  type LanguageModule,
  type LanguageRegistration,
  type ParserInitOptions,
  type ThemeDefinition,
  type ThemeModifier,
  type ThemeRegistration,
  type ThemeStyle,
  type ThemeUnderline,
  type ThemeUnderlineStyle,
  Treelight,
  type TreelightOptions,
};
