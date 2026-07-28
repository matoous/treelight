import type { Element, ElementContent, Nodes, Root } from 'hast';
import { fromParse5 } from 'hast-util-from-parse5';
import { toHtml } from 'hast-util-to-html';
import { parseFragment } from 'parse5';

export type LineNumbersOption =
  | boolean
  | {
      startLineNumber?: number;
      start?: number;
    };

export function getClassNames(node: Element): string[] {
  const className = node.properties?.className as unknown;
  if (Array.isArray(className)) {
    return className.map(String);
  }
  if (typeof className === 'string') {
    return className.split(/\s+/g);
  }
  return [];
}

export function addClassName(node: Element, className: string) {
  const classNames = new Set(getClassNames(node));
  classNames.add(className);
  node.properties ??= {};
  node.properties.className = [...classNames];
}

export function getPropertyString(
  node: Element,
  name: string,
): string | undefined {
  const value = node.properties?.[name];
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  return undefined;
}

export function getDataString(
  node: Element,
  name: string,
): string | undefined {
  const data = node.data as Record<string, unknown> | undefined;
  const value = data?.[name];
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  return undefined;
}

export function getMetadata(code: Element, pre: Element) {
  return (
    getDataString(code, 'meta') ||
    getDataString(pre, 'meta') ||
    getPropertyString(code, 'meta') ||
    getPropertyString(pre, 'meta') ||
    getPropertyString(code, 'metastring') ||
    getPropertyString(pre, 'metastring') ||
    ''
  );
}

export function getText(node: Nodes): string {
  if (node.type === 'text') {
    return node.value;
  }
  if ('children' in node) {
    return node.children.map((child) => getText(child)).join('');
  }
  return '';
}

export function findCodeElement(node: Element): Element | undefined {
  return node.children.find(
    (child): child is Element =>
      child.type === 'element' && child.tagName === 'code',
  );
}

export function htmlFragmentToRoot(html: string): Root {
  return fromParse5(parseFragment(html), { space: 'html' }) as Root;
}

export function htmlFragmentToNodes(html: string): Root['children'] {
  return htmlFragmentToRoot(html).children;
}

export function hastToHtml(root: Root) {
  return toHtml(root);
}

export function createElement(
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
    return option.startLineNumber ?? option.start ?? 1;
  }
  return 1;
}

export function parseMetaAttributes(meta: string) {
  const attributes = new Map<string, string | boolean>();
  const pattern =
    /(?:^|\s)([A-Za-z][\w-]*)(?:=(?:"([^"]*)"|'([^']*)'|([^\s]+)))?/g;
  for (const match of meta.matchAll(pattern)) {
    const [, key, doubleQuoted, singleQuoted, bare] = match;
    attributes.set(key, doubleQuoted ?? singleQuoted ?? bare ?? true);
  }
  return attributes;
}

function readMetaBoolean(
  attributes: Map<string, string | boolean>,
  name: string,
) {
  if (!attributes.has(name)) {
    return undefined;
  }
  const value = attributes.get(name);
  if (value === true || value === '') {
    return true;
  }
  if (typeof value !== 'string') {
    return undefined;
  }
  if (/^(true|1)$/i.test(value)) {
    return true;
  }
  if (/^(false|0)$/i.test(value)) {
    return false;
  }
  return undefined;
}

function readMetaNumber(
  attributes: Map<string, string | boolean>,
  name: string,
) {
  const value = attributes.get(name);
  if (typeof value !== 'string') {
    return undefined;
  }
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) ? number : undefined;
}

export function resolveLineNumbers(
  option: LineNumbersOption | undefined,
  meta: string | null | undefined,
): LineNumbersOption | undefined {
  const attributes = parseMetaAttributes(meta ?? '');
  const showLineNumbers = readMetaBoolean(attributes, 'showLineNumbers');
  if (showLineNumbers === false) {
    return false;
  }

  const startLineNumber = readMetaNumber(attributes, 'startLineNumber');
  if (startLineNumber !== undefined) {
    return { startLineNumber };
  }

  if (showLineNumbers === true) {
    return typeof option === 'object' ? option : true;
  }

  return option;
}

export function applyLineNumbers(pre: Element, option?: LineNumbersOption) {
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
