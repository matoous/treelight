import {
  type CreateHighlighterOptions,
  createHighlighter,
  type Highlighter,
  type HighlightOptions,
} from '@treelight/core';
import {
  addClassName,
  applyCodeBlockLineOptions,
  type CopyButtonOption,
  findCodeElement,
  getClassNames,
  getMetadata,
  getPropertyString,
  getText,
  type HighlightLinesOption,
  htmlFragmentToNodes,
  type LineNumbersOption,
  resolveCopyButton,
  resolveHighlightedLines,
  resolveLineNumbers,
  resolveTheme,
  resolveTitle,
  wrapCodeBlockCopyButton,
  wrapCodeBlockFrame,
} from '@treelight/hast';
import type { Element, Parent, Root } from 'hast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export interface RehypeTreelightOptions extends CreateHighlighterOptions {
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
  code: Element;
  node: Element;
  parent: Parent;
  index: number;
};

const DEFAULT_LANGUAGE = 'text';

function getLanguage(
  code: Element,
  pre: Element,
  options: RehypeTreelightOptions,
) {
  const languageClass = [...getClassNames(code), ...getClassNames(pre)].find(
    (className) => className.startsWith('language-'),
  );
  const language =
    languageClass?.slice('language-'.length) ||
    getPropertyString(code, 'lang') ||
    getPropertyString(pre, 'lang') ||
    getPropertyString(code, 'dataLang') ||
    getPropertyString(pre, 'dataLang');
  const resolvedLanguage =
    language || options.defaultLanguage || DEFAULT_LANGUAGE;
  return options.languageMap?.[resolvedLanguage] || resolvedLanguage;
}

function isTreelightBlock(node: Element) {
  return getClassNames(node).includes('treelight');
}

function collectCodeBlocks(tree: Root): CodeBlockRef[] {
  const blocks: CodeBlockRef[] = [];
  visit(tree, 'element', (node, index, parent) => {
    if (
      typeof index !== 'number' ||
      !parent ||
      node.tagName !== 'pre' ||
      isTreelightBlock(node)
    ) {
      return;
    }
    const code = findCodeElement(node);
    if (!code) {
      return;
    }
    blocks.push({ code, index, node, parent });
  });
  return blocks;
}

const rehypeTreelight: Plugin<[RehypeTreelightOptions?], Root> = (
  options = {},
) => {
  const { highlighter, ...highlighterOptions } = options;
  const highlighterPromise = Promise.resolve(
    highlighter || createHighlighter(highlighterOptions),
  );

  return async (tree) => {
    const resolvedHighlighter = await highlighterPromise;
    await Promise.all(
      collectCodeBlocks(tree).map(async ({ code, index, node, parent }) => {
        const language = getLanguage(code, node, options);
        const meta = getMetadata(code, node);
        const html = await resolvedHighlighter.highlight(
          getText(code),
          language,
          {
            ...(options as HighlightOptions),
            theme: resolveTheme(options.theme, meta),
          },
        );
        const renderedNodes = htmlFragmentToNodes(html);
        const renderedPre = renderedNodes[0];
        if (renderedPre?.type === 'element') {
          addClassName(renderedPre, `language-${language}`);
          applyCodeBlockLineOptions(renderedPre, {
            highlightedLines: resolveHighlightedLines(
              options.highlightLines,
              meta,
            ),
            lineNumbers: resolveLineNumbers(options.lineNumbers, meta),
          });
          const renderedBlock = wrapCodeBlockFrame(renderedPre, {
            title: resolveTitle(options.title, meta),
          });
          renderedNodes[0] = wrapCodeBlockCopyButton(
            renderedBlock,
            resolveCopyButton(options.copyButton, meta),
          );
        }
        parent.children.splice(index, 1, ...renderedNodes);
      }),
    );
  };
};

export { rehypeTreelight };
export default rehypeTreelight;
