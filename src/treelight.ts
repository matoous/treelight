import defaultThemeDefinition from 'treelight-theme-github-dark';
import { Language, Parser, Query, type QueryCapture } from 'web-tree-sitter';

import { getThemeColor, type ThemeDefinition } from './theme.js';
import { base64ToUint8Array } from './utils/base64.js';
import { escapeHtml } from './utils/html.js';

const DEFAULT_THEME_NAME = 'github-dark';

export type ThemeName = string;

export interface HighlightOptions {
  theme?: ThemeName;
  strict?: boolean;
}

export type ParserInitOptions = Record<string, unknown>;

export interface TreelightOptions extends HighlightOptions {
  parser?: ParserInitOptions;
}

export interface LanguageQueries {
  highlights: string;
  injections?: string;
  locals?: string;
}

export interface LanguageDefinition {
  id: string;
  wasm?: string | ArrayBuffer | Uint8Array;
  wasmUrl?: string;
  queries: LanguageQueries;
}

export type LanguageLoader =
  | (() => Promise<LanguageDefinition>)
  | (() => LanguageDefinition)
  | LanguageDefinition;

interface LanguageState {
  parser: Parser;
  highlightQuery: Query;
}

interface CaptureRef {
  id: number;
  name: string;
  node: QueryCapture['node'];
}

interface CaptureEvent {
  type: 'start' | 'end';
  pos: number;
  capture: CaptureRef;
}

const defaultTheme = defaultThemeDefinition as ThemeDefinition;

function buildAttribute(name: string, theme: ThemeDefinition) {
  const className = name.replace(/\./g, '-');
  const color = getThemeColor(theme, name, 'fg');
  if (color) {
    return `class="${className}" style="color: ${color}"`;
  }
  return `class="${className}"`;
}

function wrapText(
  text: string,
  stack: CaptureRef[],
  attrByCapture: Map<string, string>,
) {
  if (!text) return '';
  let output = escapeHtml(text);
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    const attr = attrByCapture.get(stack[i].name);
    if (!attr) {
      continue;
    }
    output = `<span ${attr}>${output}</span>`;
  }
  return output;
}

function renderHtmlFromCaptures(
  source: string,
  captures: QueryCapture[],
  theme: ThemeDefinition,
) {
  if (captures.length === 0) {
    return escapeHtml(source);
  }
  const attrByCapture = new Map<string, string>();
  for (const capture of captures) {
    if (!attrByCapture.has(capture.name)) {
      attrByCapture.set(capture.name, buildAttribute(capture.name, theme));
    }
  }

  const events: CaptureEvent[] = [];
  captures.forEach((capture, idx) => {
    const ref: CaptureRef = {
      id: idx,
      name: capture.name,
      node: capture.node,
    };
    events.push({ type: 'start', pos: capture.node.startIndex, capture: ref });
    events.push({ type: 'end', pos: capture.node.endIndex, capture: ref });
  });
  events.sort((a, b) => {
    if (a.pos !== b.pos) {
      return a.pos - b.pos;
    }
    if (a.type === b.type) {
      return 0;
    }
    return a.type === 'end' ? -1 : 1;
  });

  let cursor = 0;
  let html = '';
  const stack: CaptureRef[] = [];
  for (const event of events) {
    if (event.pos > cursor) {
      html += wrapText(source.slice(cursor, event.pos), stack, attrByCapture);
      cursor = event.pos;
    }
    if (event.type === 'start') {
      stack.push(event.capture);
    } else {
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].id === event.capture.id) {
          stack.splice(i, 1);
          break;
        }
      }
    }
  }
  if (cursor < source.length) {
    html += wrapText(source.slice(cursor), stack, attrByCapture);
  }
  return html;
}

async function loadWasmBinary(definition: LanguageDefinition) {
  if (definition.wasm) {
    if (definition.wasm instanceof Uint8Array) {
      return definition.wasm;
    }
    if (definition.wasm instanceof ArrayBuffer) {
      return new Uint8Array(definition.wasm);
    }
    if (typeof definition.wasm === 'string') {
      return base64ToUint8Array(definition.wasm);
    }
  }
  if (definition.wasmUrl) {
    if (typeof fetch !== 'function') {
      throw new Error('Global fetch is not available to download the wasmUrl.');
    }
    const response = await fetch(definition.wasmUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to download ${definition.wasmUrl}: ${response.status} ${response.statusText}`,
      );
    }
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  }
  throw new Error(
    'Language definition must provide either wasm data or a wasmUrl.',
  );
}

function buildPreBlock(
  content: string,
  themeClass: string,
  theme: ThemeDefinition,
) {
  const background =
    getThemeColor(theme, 'ui.background', 'bg') ||
    getThemeColor(theme, 'ui.background') ||
    '#ffffff';
  const foreground =
    getThemeColor(theme, 'ui.foreground', 'fg') ||
    getThemeColor(theme, 'ui.foreground') ||
    '#000000';

  return `<pre class="treelight ${themeClass}" style="background-color: ${background}; color: ${foreground}"><code>${content}</code></pre>`;
}

async function loadLanguageModule(
  definition: LanguageDefinition,
): Promise<LanguageState> {
  const wasmBinary = await loadWasmBinary(definition);
  const language = await Language.load(wasmBinary);
  const parser = new Parser();
  parser.setLanguage(language);
  if (!definition.queries || !definition.queries.highlights) {
    throw new Error('Language definition is missing highlight queries');
  }
  const highlightQuery = new Query(language, definition.queries.highlights);
  return {
    parser,
    highlightQuery,
  };
}

function normalizeThemeName(name?: string | null) {
  if (!name) {
    return DEFAULT_THEME_NAME;
  }
  return name.toLowerCase().replace(/_/g, '-');
}

export class Treelight {
  private readonly options: TreelightOptions;

  private readonly languages = new Map<string, LanguageLoader>();

  private readonly languageCache = new Map<string, LanguageState>();

  private parserInit?: Promise<void>;

  private readonly themes = new Map<string, ThemeDefinition>();

  constructor(options: TreelightOptions = {}) {
    this.options = options;
    this.registerTheme(defaultTheme.id ?? DEFAULT_THEME_NAME, defaultTheme);
  }

  private async ensureParser(): Promise<void> {
    if (!this.parserInit) {
      this.parserInit = Parser.init(this.options.parser || undefined);
    }
    await this.parserInit;
  }

  registerLanguage(name: string, loader: LanguageLoader) {
    this.languages.set(name, loader);
  }

  registerTheme(theme: ThemeDefinition): void;
  registerTheme(name: string, theme: ThemeDefinition): void;
  registerTheme(
    nameOrDefinition: string | ThemeDefinition,
    maybeDefinition?: ThemeDefinition,
  ): void;
  registerTheme(
    nameOrDefinition: string | ThemeDefinition,
    maybeDefinition?: ThemeDefinition,
  ) {
    const theme =
      typeof nameOrDefinition === 'object' && !maybeDefinition
        ? nameOrDefinition
        : maybeDefinition;
    const id =
      typeof nameOrDefinition === 'string'
        ? normalizeThemeName(nameOrDefinition)
        : normalizeThemeName(theme?.id);
    if (!theme || !theme.styles) {
      throw new Error(
        'Invalid theme definition. A theme must provide a styles map.',
      );
    }
    this.themes.set(id, { ...theme, id });
  }

  getTheme(name?: ThemeName) {
    const normalized = normalizeThemeName(
      name || this.options.theme || DEFAULT_THEME_NAME,
    );
    const fallback =
      this.themes.get(normalized) || this.themes.get(DEFAULT_THEME_NAME);
    if (!fallback) {
      throw new Error('Default theme is not registered.');
    }
    return fallback;
  }

  async loadLanguage(name: string): Promise<LanguageState> {
    const cached = this.languageCache.get(name);
    if (cached) {
      return cached;
    }
    const loader = this.languages.get(name);
    if (!loader) {
      throw new Error(`Language "${name}" is not registered.`);
    }
    await this.ensureParser();
    const definition = await (typeof loader === 'function' ? loader() : loader);
    const state = await loadLanguageModule(definition);
    this.languageCache.set(name, state);
    return state;
  }

  async highlight(
    code: string,
    languageName: string,
    options: HighlightOptions = {},
  ): Promise<string> {
    const theme = this.getTheme(options.theme);
    const themeClass = theme.id?.replace(/\s+/g, '-') || DEFAULT_THEME_NAME;
    let state: LanguageState;
    try {
      state = await this.loadLanguage(languageName);
    } catch (error) {
      if (options.strict) {
        throw error;
      }
      return buildPreBlock(escapeHtml(code), themeClass, theme);
    }
    const tree = state.parser.parse(code);
    if (!tree) {
      return buildPreBlock(escapeHtml(code), themeClass, theme);
    }
    const captures = state.highlightQuery.captures(tree.rootNode);
    const html = renderHtmlFromCaptures(code, captures, theme);
    return buildPreBlock(html, themeClass, theme);
  }
}

export type { ThemeDefinition, ThemeStyle } from './theme.js';
