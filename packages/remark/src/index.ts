import {
  type CreateHighlighterOptions,
  createHighlighter,
  type Highlighter,
  type HighlightOptions,
} from '@treelight/core';
import {
  applyLineNumbers,
  hastToHtml,
  htmlFragmentToRoot,
  type LineNumbersOption,
  resolveLineNumbers,
} from '@treelight/hast';
import type { Element } from 'hast';
import type { Code, Html, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export interface RemarkTreelightOptions extends CreateHighlighterOptions {
  defaultLanguage?: string;
  highlighter?: Highlighter | Promise<Highlighter>;
  languageMap?: Record<string, string>;
  lineNumbers?: LineNumbersOption;
}

type CodeBlockRef = {
  node: Code;
};

const DEFAULT_LANGUAGE = 'text';

function getLanguage(node: Code, options: RemarkTreelightOptions) {
  const language = node.lang || options.defaultLanguage || DEFAULT_LANGUAGE;
  return options.languageMap?.[language] || language;
}

function collectCodeBlocks(tree: Root): CodeBlockRef[] {
  const blocks: CodeBlockRef[] = [];
  visit(tree, 'code', (node) => {
    blocks.push({ node });
  });
  return blocks;
}

function withLineNumbers(html: string, option?: LineNumbersOption) {
  if (!option) {
    return html;
  }
  const root = htmlFragmentToRoot(html);
  const pre = root.children.find(
    (child): child is Element =>
      child.type === 'element' && child.tagName === 'pre',
  );
  if (pre) {
    applyLineNumbers(pre, option);
  }
  return hastToHtml(root);
}

const remarkTreelight: Plugin<[RemarkTreelightOptions?], Root> = (
  options = {},
) => {
  const { highlighter, ...highlighterOptions } = options;
  const highlighterPromise = Promise.resolve(
    highlighter || createHighlighter(highlighterOptions),
  );

  return async (tree) => {
    const resolvedHighlighter = await highlighterPromise;
    await Promise.all(
      collectCodeBlocks(tree).map(async ({ node }) => {
        const language = getLanguage(node, options);
        const html = await resolvedHighlighter.highlight(
          node.value,
          language,
          options as HighlightOptions,
        );
        const htmlNode = node as unknown as Html;
        htmlNode.type = 'html';
        htmlNode.value = withLineNumbers(
          html,
          resolveLineNumbers(options.lineNumbers, node.meta),
        );
      }),
    );
  };
};

export { remarkTreelight };
export default remarkTreelight;
