import {
  type CreateHighlighterOptions,
  createHighlighter,
  type Highlighter,
  type HighlightOptions,
} from '@treelight/core';
import {
  applyCodeBlockLineOptions,
  type CopyButtonOption,
  type HighlightLinesOption,
  hastToHtml,
  htmlFragmentToRoot,
  type LineNumbersOption,
  resolveCopyButton,
  resolveHighlightedLines,
  resolveLineNumbers,
  resolveTheme,
  resolveTitle,
  wrapCodeBlockCopyButton,
  wrapCodeBlockFrame,
} from '@treelight/hast';
import type { Code, Html, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export interface RemarkTreelightOptions extends CreateHighlighterOptions {
  copyButton?: CopyButtonOption;
  defaultLanguage?: string;
  highlighter?: Highlighter | Promise<Highlighter>;
  highlightLines?: HighlightLinesOption;
  languageMap?: Record<string, string>;
  lineNumbers?: LineNumbersOption;
  theme?: string;
  title?: string;
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

function withLineOptions(
  html: string,
  options: {
    copyButton?: CopyButtonOption;
    highlightedLines?: HighlightLinesOption;
    lineNumbers?: LineNumbersOption;
    title?: string;
  },
) {
  if (
    !options.copyButton &&
    !options.lineNumbers &&
    !options.highlightedLines &&
    !options.title
  ) {
    return html;
  }
  const root = htmlFragmentToRoot(html);
  const preIndex = root.children.findIndex(
    (child) => child.type === 'element' && child.tagName === 'pre',
  );
  const pre = root.children[preIndex];
  if (pre?.type === 'element') {
    applyCodeBlockLineOptions(pre, options);
    const renderedBlock = wrapCodeBlockFrame(pre, {
      title: options.title,
    });
    root.children[preIndex] = wrapCodeBlockCopyButton(
      renderedBlock,
      options.copyButton,
    );
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
        const html = await resolvedHighlighter.highlight(node.value, language, {
          ...(options as HighlightOptions),
          theme: resolveTheme(options.theme, node.meta),
        });
        const htmlNode = node as unknown as Html;
        htmlNode.type = 'html';
        htmlNode.value = withLineOptions(html, {
          copyButton: resolveCopyButton(options.copyButton, node.meta),
          highlightedLines: resolveHighlightedLines(
            options.highlightLines,
            node.meta,
          ),
          lineNumbers: resolveLineNumbers(options.lineNumbers, node.meta),
          title: resolveTitle(options.title, node.meta),
        });
      }),
    );
  };
};

export { remarkTreelight };
export default remarkTreelight;
