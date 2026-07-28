import {
  type CreateHighlighterOptions,
  createHighlighter,
  type Highlighter,
  type HighlightOptions,
} from '@treelight/core';
import type { Element, ElementContent, Root as HastRoot } from 'hast';
import { fromParse5 } from 'hast-util-from-parse5';
import { toHtml } from 'hast-util-to-html';
import type { Code, Html, Root } from 'mdast';
import { parseFragment } from 'parse5';
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

export type LineNumbersOption =
  | boolean
  | {
      start?: number;
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

function getClassNames(node: Element): string[] {
  const className = node.properties?.className as unknown;
  if (Array.isArray(className)) {
    return className.map(String);
  }
  if (typeof className === 'string') {
    return className.split(/\s+/g);
  }
  return [];
}

function addClassName(node: Element, className: string) {
  const classNames = new Set(getClassNames(node));
  classNames.add(className);
  node.properties ??= {};
  node.properties.className = [...classNames];
}

function createElement(
  tagName: string,
  properties: Element['properties'],
  children: Element['children'] = [],
): Element {
  return {
    type: 'element',
    tagName,
    properties,
    children,
  };
}

function findCodeElement(node: Element): Element | undefined {
  return node.children.find(
    (child): child is Element =>
      child.type === 'element' && child.tagName === 'code',
  );
}

function splitElementChildrenByLine(children: Element['children']) {
  const lines: Element['children'][] = [[]];
  for (const child of children) {
    appendNodeLines(child, lines);
  }
  return lines;
}

function appendNodeLines(node: ElementContent, lines: Element['children'][]) {
  if (node.type === 'text') {
    const parts = node.value.split('\n');
    parts.forEach((part, index) => {
      if (part) {
        lines[lines.length - 1].push({ type: 'text', value: part });
      }
      if (index < parts.length - 1) {
        lines.push([]);
      }
    });
    return;
  }

  if (node.type === 'element') {
    const nodeLines = splitElementChildrenByLine(node.children);
    nodeLines.forEach((children, index) => {
      lines[lines.length - 1].push({
        ...node,
        children,
      });
      if (index < nodeLines.length - 1) {
        lines.push([]);
      }
    });
    return;
  }

  lines[lines.length - 1].push(node);
}

function getLineNumberStart(option: LineNumbersOption) {
  if (typeof option === 'object') {
    return option.start ?? 1;
  }
  return 1;
}

function applyLineNumbers(pre: Element, option?: LineNumbersOption) {
  if (!option) {
    return;
  }
  const code = findCodeElement(pre);
  if (!code) {
    return;
  }
  const start = getLineNumberStart(option);
  const lines = splitElementChildrenByLine(code.children);
  const lastLineNumber = start + Math.max(lines.length - 1, 0);
  const gutterWidth = String(lastLineNumber).length;
  addClassName(pre, 'has-line-numbers');
  pre.properties ??= {};
  pre.properties.dataLineNumbers = 'true';
  pre.properties.dataLineNumberStart = String(start);
  code.children = lines.flatMap((children, index) => {
    const lineNumber = String(start + index);
    const line = createElement(
      'span',
      {
        className: ['treelight-line'],
        dataLineNumber: lineNumber,
      },
      [
        createElement(
          'span',
          {
            ariaHidden: 'true',
            className: ['treelight-line-number'],
            style: `display: inline-block; min-width: ${gutterWidth}ch; margin-right: 1em; text-align: right; opacity: 0.55; user-select: none`,
          },
          [{ type: 'text', value: lineNumber }],
        ),
        createElement(
          'span',
          {
            className: ['treelight-line-content'],
          },
          children,
        ),
      ],
    );
    return index < lines.length - 1
      ? [line, { type: 'text', value: '\n' }]
      : [line];
  });
}

function withLineNumbers(html: string, option?: LineNumbersOption) {
  if (!option) {
    return html;
  }
  const root = fromParse5(parseFragment(html), { space: 'html' }) as HastRoot;
  const pre = root.children.find(
    (child): child is Element =>
      child.type === 'element' && child.tagName === 'pre',
  );
  if (pre) {
    applyLineNumbers(pre, option);
  }
  return toHtml(root);
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
        htmlNode.value = withLineNumbers(html, options.lineNumbers);
      }),
    );
  };
};

export { remarkTreelight };
export default remarkTreelight;
