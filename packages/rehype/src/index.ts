import {
  type CreateHighlighterOptions,
  createHighlighter,
  type Highlighter,
  type HighlightOptions,
} from '@treelight/core';
import type { Element, ElementContent, Nodes, Parent, Root } from 'hast';
import { fromParse5 } from 'hast-util-from-parse5';
import { parseFragment } from 'parse5';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export interface RehypeTreelightOptions extends CreateHighlighterOptions {
  defaultLanguage?: string;
  highlighter?: Highlighter | Promise<Highlighter>;
  languageMap?: Record<string, string>;
  lineNumbers?: LineNumbersOption;
}

type CodeBlockRef = {
  code: Element;
  node: Element;
  parent: Parent;
  index: number;
};

export type LineNumbersOption =
  | boolean
  | {
      start?: number;
    };

const DEFAULT_LANGUAGE = 'text';

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

function getPropertyString(node: Element, name: string): string | undefined {
  const value = node.properties?.[name];
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  return undefined;
}

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

function getText(node: Nodes): string {
  if (node.type === 'text') {
    return node.value;
  }
  if ('children' in node) {
    return node.children.map((child) => getText(child)).join('');
  }
  return '';
}

function findCodeElement(node: Element): Element | undefined {
  return node.children.find(
    (child): child is Element =>
      child.type === 'element' && child.tagName === 'code',
  );
}

function htmlFragmentToNodes(html: string): Root['children'] {
  const root = fromParse5(parseFragment(html), { space: 'html' }) as Root;
  return root.children;
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
        const html = await resolvedHighlighter.highlight(
          getText(code),
          language,
          options as HighlightOptions,
        );
        const renderedNodes = htmlFragmentToNodes(html);
        const renderedPre = renderedNodes[0];
        if (renderedPre?.type === 'element') {
          addClassName(renderedPre, `language-${language}`);
          applyLineNumbers(renderedPre, options.lineNumbers);
        }
        parent.children.splice(index, 1, ...renderedNodes);
      }),
    );
  };
};

export { rehypeTreelight };
export default rehypeTreelight;
