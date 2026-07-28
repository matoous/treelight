import type { Highlighter, HighlightOptions } from '@treelight/core';
import {
  addClassName,
  applyCodeBlockLineOptions,
  htmlFragmentToRoot,
  parseMetaAttributes,
  resolveHighlightedLines,
  resolveLineNumbers,
} from '@treelight/hast';

export type TreelightShikiTransformerOptions = HighlightOptions & {
  highlighter: Highlighter;
  highlightLines?: Parameters<typeof resolveHighlightedLines>[0];
  languageMap?: Record<string, string>;
  lineNumbers?: Parameters<typeof resolveLineNumbers>[0];
};

function getRawMeta(meta: unknown) {
  if (!meta || typeof meta !== 'object') {
    return '';
  }
  const raw = (meta as { __raw?: unknown }).__raw;
  return typeof raw === 'string' ? raw : '';
}

function getMetaString(meta: string, name: string) {
  const value = parseMetaAttributes(meta).get(name);
  return typeof value === 'string' ? value : undefined;
}

function createTreelightShikiTransformer(
  options: TreelightShikiTransformerOptions,
) {
  return {
    name: 'rspress:treelight',
    root(this: { options: { lang?: string; meta?: unknown }; source: string }) {
      const rawLanguage = this.options.lang || 'text';
      const language = options.languageMap?.[rawLanguage] || rawLanguage;
      const meta = getRawMeta(this.options.meta);
      const html = options.highlighter.highlight(this.source, language, {
        ...options,
        theme: getMetaString(meta, 'theme') ?? options.theme,
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
      }

      return root;
    },
  };
}

export { createTreelightShikiTransformer };
