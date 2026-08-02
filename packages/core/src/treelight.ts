import defaultThemeDefinition from '@treelight/theme-github-dark';
import {
  Language,
  type Node,
  Parser,
  type Point,
  Query,
  type QueryCapture,
  type QueryMatch,
  type Range,
} from 'web-tree-sitter';

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

export interface LanguageModule {
  default: LanguageDefinition;
}

export type LanguageLoaderResult = LanguageDefinition | LanguageModule;

export type LanguageLoader =
  | (() => Promise<LanguageLoaderResult>)
  | (() => LanguageLoaderResult)
  | LanguageLoaderResult;

interface LanguageState {
  id: string;
  parser: Parser;
  highlightQuery: Query;
  injectionQuery?: Query;
}

interface CaptureRef {
  id: number;
  name: string;
  startIndex: number;
  endIndex: number;
}

interface HighlightCapture {
  name: string;
  startIndex: number;
  endIndex: number;
}

interface InjectionLayer {
  languageName: string;
  ranges: Range[];
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
  captures: HighlightCapture[],
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
      startIndex: capture.startIndex,
      endIndex: capture.endIndex,
    };
    events.push({ type: 'start', pos: capture.startIndex, capture: ref });
    events.push({ type: 'end', pos: capture.endIndex, capture: ref });
  });
  events.sort((a, b) => {
    if (a.pos !== b.pos) {
      return a.pos - b.pos;
    }
    if (a.type === b.type) {
      return a.type === 'start'
        ? b.capture.endIndex - a.capture.endIndex
        : b.capture.startIndex - a.capture.startIndex;
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

function toHighlightCapture(capture: QueryCapture): HighlightCapture {
  return {
    name: capture.name,
    startIndex: capture.node.startIndex,
    endIndex: capture.node.endIndex,
  };
}

function highlightCaptures(
  state: LanguageState,
  tree: NonNullable<ReturnType<Parser['parse']>>,
  ranges?: Range[],
): HighlightCapture[] {
  const captures = state.highlightQuery.captures(tree.rootNode);
  if (!ranges) {
    return captures.map(toHighlightCapture);
  }

  return captures.flatMap((capture) => {
    const clipped: HighlightCapture[] = [];
    for (const range of ranges) {
      const startIndex = Math.max(capture.node.startIndex, range.startIndex);
      const endIndex = Math.min(capture.node.endIndex, range.endIndex);
      if (startIndex < endIndex) {
        clipped.push({ name: capture.name, startIndex, endIndex });
      }
    }
    return clipped;
  });
}

function rangeBetween(
  startIndex: number,
  startPosition: Point,
  endIndex: number,
  endPosition: Point,
): Range | undefined {
  if (startIndex >= endIndex) {
    return undefined;
  }
  return { startIndex, startPosition, endIndex, endPosition };
}

function rangesForNode(
  node: Node,
  includeChildren: boolean,
  includeUnnamedChildren: boolean,
): Range[] {
  if (includeChildren) {
    return [
      {
        startIndex: node.startIndex,
        startPosition: node.startPosition,
        endIndex: node.endIndex,
        endPosition: node.endPosition,
      },
    ];
  }

  const excludedChildren = includeUnnamedChildren
    ? node.namedChildren
    : node.children;
  const ranges: Range[] = [];
  let startIndex = node.startIndex;
  let startPosition = node.startPosition;
  for (const child of excludedChildren) {
    const beforeChild = rangeBetween(
      startIndex,
      startPosition,
      child.startIndex,
      child.startPosition,
    );
    if (beforeChild) {
      ranges.push(beforeChild);
    }
    startIndex = child.endIndex;
    startPosition = child.endPosition;
  }
  const afterChildren = rangeBetween(
    startIndex,
    startPosition,
    node.endIndex,
    node.endPosition,
  );
  if (afterChildren) {
    ranges.push(afterChildren);
  }
  return ranges;
}

function normalizedRanges(ranges: Range[]): Range[] {
  const sorted = [...ranges].sort((a, b) => a.startIndex - b.startIndex);
  const normalized: Range[] = [];
  for (const range of sorted) {
    const previous = normalized.at(-1);
    if (!previous || range.startIndex > previous.endIndex) {
      normalized.push(range);
      continue;
    }
    if (range.endIndex > previous.endIndex) {
      previous.endIndex = range.endIndex;
      previous.endPosition = range.endPosition;
    }
  }
  return normalized;
}

function languageNameForMatch(match: QueryMatch): string | undefined {
  const configuredName = match.setProperties?.['injection.language'];
  if (configuredName) {
    return configuredName;
  }
  return match.captures
    .find((capture) => capture.name === 'injection.language')
    ?.node.text.trim();
}

function injectionLayers(
  state: LanguageState,
  tree: NonNullable<ReturnType<Parser['parse']>>,
) {
  if (!state.injectionQuery) {
    return [];
  }

  const layers: InjectionLayer[] = [];
  const combinedLayers = new Map<string, InjectionLayer>();
  for (const match of state.injectionQuery.matches(tree.rootNode)) {
    const languageName = languageNameForMatch(match);
    if (!languageName) {
      continue;
    }
    const includeChildren =
      'injection.include-children' in (match.setProperties ?? {});
    const includeUnnamedChildren =
      'injection.include-unnamed-children' in (match.setProperties ?? {});
    const ranges = match.captures
      .filter((capture) => capture.name === 'injection.content')
      .flatMap((capture) =>
        rangesForNode(capture.node, includeChildren, includeUnnamedChildren),
      );
    if (ranges.length === 0) {
      continue;
    }
    if ('injection.combined' in (match.setProperties ?? {})) {
      const key = `${match.patternIndex}\0${languageName}`;
      const layer = combinedLayers.get(key);
      if (layer) {
        layer.ranges.push(...ranges);
      } else {
        const combined = { languageName, ranges: [...ranges] };
        combinedLayers.set(key, combined);
        layers.push(combined);
      }
    } else {
      layers.push({ languageName, ranges });
    }
  }
  for (const layer of layers) {
    layer.ranges = normalizedRanges(layer.ranges);
  }
  return layers;
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
    getThemeColor(theme, 'ui.text', 'fg') ||
    getThemeColor(theme, 'ui.background', 'fg') ||
    getThemeColor(theme, 'variable', 'fg') ||
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
  if (!definition.queries?.highlights) {
    throw new Error('Language definition is missing highlight queries');
  }
  const highlightQuery = new Query(language, definition.queries.highlights);
  const injectionQuery = definition.queries.injections
    ? new Query(language, definition.queries.injections)
    : undefined;
  return {
    id: definition.id,
    parser,
    highlightQuery,
    injectionQuery,
  };
}

function normalizeThemeName(name?: string | null) {
  if (!name) {
    return DEFAULT_THEME_NAME;
  }
  return name.toLowerCase().replace(/_/g, '-');
}

function resolveLanguageDefinition(result: LanguageLoaderResult) {
  const definition = 'default' in result ? result.default : result;
  if (!definition.id) {
    throw new Error('Language definition is missing an id.');
  }
  return definition;
}

export class Treelight {
  private readonly options: TreelightOptions;

  private readonly languages = new Map<string, LanguageLoader>();

  private readonly languageCache = new Map<string, LanguageState>();

  private readonly languagePromises = new Map<string, Promise<LanguageState>>();

  private readonly languageDefinitionPromises = new Map<
    string,
    Promise<LanguageState>
  >();
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

  registerLanguage(definition: LanguageDefinition): void;
  registerLanguage(name: string, loader: LanguageLoader): void;
  registerLanguage(
    nameOrDefinition: string | LanguageDefinition,
    maybeLoader?: LanguageLoader,
  ) {
    if (typeof nameOrDefinition === 'string') {
      if (!maybeLoader) {
        throw new Error('Language loader is required.');
      }
      this.languages.set(nameOrDefinition, maybeLoader);
      return;
    }
    const definition = resolveLanguageDefinition(nameOrDefinition);
    this.languages.set(definition.id, definition);
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
    if (!theme?.styles) {
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
    const pending =
      this.languagePromises.get(name) ||
      this.languageDefinitionPromises.get(name);
    if (pending) {
      return pending;
    }
    const loader = this.languages.get(name);
    if (!loader) {
      throw new Error(`Language "${name}" is not registered.`);
    }

    let definitionId: string | undefined;
    let loadPromise!: Promise<LanguageState>;
    loadPromise = (async () => {
      await this.ensureParser();
      const result = await (typeof loader === 'function' ? loader() : loader);
      const definition = resolveLanguageDefinition(result);
      definitionId = definition.id;

      const cachedByDefinition = this.languageCache.get(definition.id);
      if (cachedByDefinition) {
        this.languageCache.set(name, cachedByDefinition);
        return cachedByDefinition;
      }

      const pendingByDefinition = this.languageDefinitionPromises.get(
        definition.id,
      );
      if (pendingByDefinition) {
        const state = await pendingByDefinition;
        this.languageCache.set(name, state);
        return state;
      }

      this.languageDefinitionPromises.set(definition.id, loadPromise);
      const state = await loadLanguageModule(definition);
      this.languageCache.set(name, state);
      this.languageCache.set(definition.id, state);
      return state;
    })();
    this.languagePromises.set(name, loadPromise);

    try {
      return await loadPromise;
    } finally {
      if (this.languagePromises.get(name) === loadPromise) {
        this.languagePromises.delete(name);
      }
      if (
        definitionId &&
        this.languageDefinitionPromises.get(definitionId) === loadPromise
      ) {
        this.languageDefinitionPromises.delete(definitionId);
      }
    }
  }

  private collectCaptures(
    code: string,
    state: LanguageState,
    ranges?: Range[],
    depth = 0,
    visited = new Set<string>(),
  ): HighlightCapture[] {
    const tree = state.parser.parse(
      code,
      null,
      ranges ? { includedRanges: ranges } : undefined,
    );
    if (!tree) {
      return [];
    }

    const captures = highlightCaptures(state, tree, ranges);
    if (depth >= 16) {
      return captures;
    }
    for (const layer of injectionLayers(state, tree)) {
      const injectedState = this.languageCache.get(layer.languageName);
      if (!injectedState) {
        continue;
      }
      const key = `${injectedState.id}:${layer.ranges
        .map((range) => `${range.startIndex}-${range.endIndex}`)
        .join(',')}`;
      if (visited.has(key)) {
        continue;
      }
      visited.add(key);
      const existingCaptures = new Set(
        captures.map(
          (capture) =>
            `${capture.name}\0${capture.startIndex}\0${capture.endIndex}`,
        ),
      );
      const injectedCaptures = this.collectCaptures(
        code,
        injectedState,
        layer.ranges,
        depth + 1,
        visited,
      );
      const newCaptures = injectedCaptures.filter(
        (capture) =>
          !existingCaptures.has(
            `${capture.name}\0${capture.startIndex}\0${capture.endIndex}`,
          ),
      );
      captures.push(...newCaptures);
    }
    return captures;
  }

  private async loadInjectionLanguages(
    code: string,
    state: LanguageState,
    ranges?: Range[],
    depth = 0,
    visited = new Set<string>(),
    strict = false,
  ): Promise<void> {
    if (depth >= 16 || !state.injectionQuery) {
      return;
    }
    const tree = state.parser.parse(
      code,
      null,
      ranges ? { includedRanges: ranges } : undefined,
    );
    if (!tree) {
      return;
    }

    for (const layer of injectionLayers(state, tree)) {
      let injectedState = this.languageCache.get(layer.languageName);
      if (!injectedState && this.languages.has(layer.languageName)) {
        try {
          injectedState = await this.loadLanguage(layer.languageName);
        } catch (error) {
          if (strict) {
            throw error;
          }
          continue;
        }
      }
      if (!injectedState) {
        continue;
      }
      const key = `${injectedState.id}:${layer.ranges
        .map((range) => `${range.startIndex}-${range.endIndex}`)
        .join(',')}`;
      if (visited.has(key)) {
        continue;
      }
      visited.add(key);
      await this.loadInjectionLanguages(
        code,
        injectedState,
        layer.ranges,
        depth + 1,
        visited,
        strict,
      );
    }
  }

  private renderHighlightedBlock(
    code: string,
    themeClass: string,
    theme: ThemeDefinition,
    state?: LanguageState,
  ) {
    if (!state) {
      return buildPreBlock(escapeHtml(code), themeClass, theme);
    }
    const captures = this.collectCaptures(code, state);
    const html = renderHtmlFromCaptures(code, captures, theme);
    return buildPreBlock(html, themeClass, theme);
  }

  async highlight(
    code: string,
    languageName: string,
    options: HighlightOptions = {},
  ): Promise<string> {
    const theme = this.getTheme(options.theme);
    const themeClass = theme.id?.replace(/\s+/g, '-') || DEFAULT_THEME_NAME;
    try {
      const state = await this.loadLanguage(languageName);
      await this.loadInjectionLanguages(
        code,
        state,
        undefined,
        0,
        new Set<string>(),
        options.strict,
      );
      return this.renderHighlightedBlock(code, themeClass, theme, state);
    } catch (error) {
      if (options.strict) {
        throw error;
      }
    }
    return this.renderHighlightedBlock(code, themeClass, theme);
  }

  highlightSync(
    code: string,
    languageName: string,
    options: HighlightOptions = {},
  ): string {
    const theme = this.getTheme(options.theme);
    const themeClass = theme.id?.replace(/\s+/g, '-') || DEFAULT_THEME_NAME;
    const state = this.languageCache.get(languageName);
    if (!state && options.strict) {
      throw new Error(
        `Language "${languageName}" is not loaded. Register and load it before highlighting synchronously.`,
      );
    }
    return this.renderHighlightedBlock(code, themeClass, theme, state);
  }
}

export type { ThemeDefinition, ThemeStyle } from './theme.js';
