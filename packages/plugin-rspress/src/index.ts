import type { RspressPlugin } from '@rspress/core';
import {
  type CreateHighlighterOptions,
  createHighlighter,
  type Highlighter,
  type HighlightOptions,
} from '@treelight/core';
import {
  addClassName,
  applyCodeBlockLineOptions,
  type HighlightLinesOption,
  htmlFragmentToRoot,
  type LineNumbersOption,
  resolveHighlightedLines,
  resolveLineNumbers,
  resolveTheme,
  resolveTitle,
  wrapCodeBlockFrame,
} from '@treelight/hast';

export interface TreelightRspressOptions extends CreateHighlighterOptions {
  defaultLanguage?: string;
  highlighter?: Highlighter | Promise<Highlighter>;
  highlightLines?: HighlightLinesOption;
  languageMap?: Record<string, string>;
  lineNumbers?: LineNumbersOption;
  strict?: boolean;
  theme?: string;
  title?: string;
}

export interface TreelightShikiTransformerOptions extends HighlightOptions {
  defaultLanguage?: string;
  highlighter: Highlighter;
  highlightLines?: HighlightLinesOption;
  languageMap?: Record<string, string>;
  lineNumbers?: LineNumbersOption;
  strict?: boolean;
  theme?: string;
  title?: string;
}

type ShikiTransformerContext = {
  options: {
    lang?: string;
    meta?: unknown;
  };
  source: string;
};

type RspressConfig = {
  markdown?: {
    shiki?: {
      transformers?: unknown[];
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

function getRawMeta(meta: unknown) {
  if (!meta || typeof meta !== 'object') {
    return '';
  }
  const raw = (meta as { __raw?: unknown }).__raw;
  return typeof raw === 'string' ? raw : '';
}

function createTransformerOptions(
  options: TreelightRspressOptions,
  highlighter: Highlighter,
): TreelightShikiTransformerOptions {
  return {
    defaultLanguage: options.defaultLanguage,
    highlighter,
    highlightLines: options.highlightLines,
    languageMap: options.languageMap,
    lineNumbers: options.lineNumbers,
    strict: options.strict,
    theme: options.theme,
    title: options.title,
  };
}

function createHighlighterOptions(
  options: TreelightRspressOptions,
): CreateHighlighterOptions {
  const {
    defaultLanguage: _defaultLanguage,
    highlighter: _highlighter,
    highlightLines: _highlightLines,
    languageMap: _languageMap,
    lineNumbers: _lineNumbers,
    title: _title,
    ...highlighterOptions
  } = options;
  return highlighterOptions;
}

function appendTransformer(config: RspressConfig, transformer: unknown) {
  const markdown = config.markdown ?? {};
  const shiki = markdown.shiki ?? {};
  return {
    ...config,
    markdown: {
      ...markdown,
      shiki: {
        ...shiki,
        transformers: [...(shiki.transformers ?? []), transformer],
      },
    },
  };
}

function createTreelightShikiTransformer(
  options: TreelightShikiTransformerOptions,
) {
  return {
    name: '@treelight/plugin-rspress',
    root(this: ShikiTransformerContext) {
      const rawLanguage =
        this.options.lang || options.defaultLanguage || 'text';
      const language = options.languageMap?.[rawLanguage] || rawLanguage;
      const meta = getRawMeta(this.options.meta);
      const html = options.highlighter.highlight(this.source, language, {
        ...options,
        theme: resolveTheme(options.theme, meta),
      });
      const root = htmlFragmentToRoot(html);
      const pre = root.children[0];

      if (pre?.type === 'element') {
        addClassName(pre, `language-${language}`);
        applyCodeBlockLineOptions(pre, {
          highlightedLines: resolveHighlightedLines(
            options.highlightLines,
            meta,
          ),
          lineNumbers: resolveLineNumbers(options.lineNumbers, meta),
        });
        root.children[0] = wrapCodeBlockFrame(pre, {
          title: resolveTitle(options.title, meta),
        });
      }

      return root;
    },
  };
}

function rspressTreelight(
  options: TreelightRspressOptions = {},
): RspressPlugin {
  return {
    async config(config) {
      const highlighter = await Promise.resolve(
        options.highlighter ||
          createHighlighter(createHighlighterOptions(options)),
      );
      return appendTransformer(
        config as RspressConfig,
        createTreelightShikiTransformer(
          createTransformerOptions(options, highlighter),
        ),
      ) as typeof config;
    },
    name: '@treelight/plugin-rspress',
  };
}

export { createTreelightShikiTransformer, rspressTreelight };
export default rspressTreelight;
