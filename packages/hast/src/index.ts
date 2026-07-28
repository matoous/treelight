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

export type HighlightLinesOption =
  | false
  | string
  | number
  | readonly (number | readonly [number, number])[];

export type CodeBlockLineOptions = {
  highlightedLines?: HighlightLinesOption;
  lineNumbers?: LineNumbersOption;
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

export function setStyleProperty(
  node: Element,
  property: string,
  value: string,
) {
  const existingStyle = getPropertyString(node, 'style');
  const separator =
    existingStyle && !existingStyle.trimEnd().endsWith(';') ? ';' : '';
  node.properties ??= {};
  node.properties.style =
    `${existingStyle ?? ''}${separator} ${property}: ${value}`.trim();
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

export function getDataString(node: Element, name: string): string | undefined {
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

function getLineNumberStartFromOptions(options: CodeBlockLineOptions) {
  return options.lineNumbers ? getLineNumberStart(options.lineNumbers) : 1;
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
  const lineNumbers = readMetaBoolean(attributes, 'lineNumbers');
  if (lineNumbers === false) {
    return false;
  }

  const showLineNumbers = readMetaBoolean(attributes, 'showLineNumbers');
  if (showLineNumbers === false) {
    return false;
  }

  const startLineNumber =
    readMetaNumber(attributes, 'startLineNumber') ??
    readMetaNumber(attributes, 'start');
  if (startLineNumber !== undefined) {
    return { startLineNumber };
  }

  if (lineNumbers === true || showLineNumbers === true) {
    return typeof option === 'object' ? option : true;
  }

  return option;
}

function parseHighlightLineSpec(spec: string) {
  const lines = new Set<number>();
  for (const part of spec.split(',')) {
    const trimmed = part.trim();
    if (!trimmed) {
      continue;
    }
    const rangeMatch = trimmed.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = Number.parseInt(rangeMatch[1], 10);
      const end = Number.parseInt(rangeMatch[2], 10);
      for (
        let line = Math.min(start, end);
        line <= Math.max(start, end);
        line++
      ) {
        lines.add(line);
      }
      continue;
    }
    const line = Number.parseInt(trimmed, 10);
    if (Number.isFinite(line)) {
      lines.add(line);
    }
  }
  return lines;
}

function parseHighlightLinesOption(option: HighlightLinesOption | undefined) {
  if (option === undefined || option === false) {
    return new Set<number>();
  }
  if (typeof option === 'string') {
    return parseHighlightLineSpec(option);
  }
  if (typeof option === 'number') {
    return new Set([option]);
  }
  const lines = new Set<number>();
  for (const item of option) {
    if (typeof item === 'number') {
      lines.add(item);
      continue;
    }
    const [start, end] = item;
    for (
      let line = Math.min(start, end);
      line <= Math.max(start, end);
      line++
    ) {
      lines.add(line);
    }
  }
  return lines;
}

function readMetaString(
  attributes: Map<string, string | boolean>,
  name: string,
) {
  const value = attributes.get(name);
  return typeof value === 'string' ? value : undefined;
}

function readBraceLineRange(meta: string) {
  return meta.match(/\{([^}]+)\}/)?.[1];
}

export function resolveHighlightedLines(
  option: HighlightLinesOption | undefined,
  meta: string | null | undefined,
): HighlightLinesOption | undefined {
  const metadata = meta ?? '';
  const attributes = parseMetaAttributes(metadata);
  const highlightedLines = readMetaBoolean(attributes, 'highlightLines');
  if (highlightedLines === false) {
    return false;
  }

  const attributeRange = readMetaString(attributes, 'highlightLines');
  if (attributeRange) {
    return attributeRange;
  }

  const braceRange = readBraceLineRange(metadata);
  if (braceRange) {
    return braceRange;
  }

  return option;
}

export function resolveTheme(
  option: string | undefined,
  meta: string | null | undefined,
) {
  const theme = readMetaString(parseMetaAttributes(meta ?? ''), 'theme');
  return theme || option;
}

export function applyCodeBlockLineOptions(
  pre: Element,
  options: CodeBlockLineOptions,
) {
  const highlightedLines = parseHighlightLinesOption(options.highlightedLines);
  if (!options.lineNumbers && highlightedLines.size === 0) {
    return;
  }
  const code = findCodeElement(pre);
  if (!code) {
    return;
  }
  const start = getLineNumberStartFromOptions(options);
  const lines = splitElementChildrenByLine(code.children);
  const lastLineNumber = start + Math.max(lines.length - 1, 0);
  const gutterWidth = String(lastLineNumber).length;
  pre.properties ??= {};
  if (options.lineNumbers) {
    addClassName(pre, 'has-line-numbers');
    pre.properties.dataLineNumbers = 'true';
    pre.properties.dataLineNumberStart = String(start);
    setStyleProperty(pre, '--treelight-line-number-width', `${gutterWidth}ch`);
  }
  if (highlightedLines.size > 0) {
    addClassName(pre, 'has-highlighted-lines');
  }
  code.children = lines.flatMap((children, index) => {
    const lineNumber = start + index;
    const sourceLineNumber = index + 1;
    const isHighlighted = highlightedLines.has(sourceLineNumber);
    const lineChildren: Element['children'] = [
      createElement(
        'span',
        {
          className: ['treelight-line-content'],
        },
        children,
      ),
    ];
    if (options.lineNumbers) {
      lineChildren.unshift(
        createElement(
          'span',
          {
            ariaHidden: 'true',
            className: ['treelight-line-number'],
          },
          [{ type: 'text', value: String(lineNumber) }],
        ),
      );
    }
    const line = createElement(
      'span',
      {
        className: isHighlighted
          ? ['treelight-line', 'is-highlighted']
          : ['treelight-line'],
        dataLineNumber: String(lineNumber),
        ...(isHighlighted ? { dataHighlightedLine: 'true' } : {}),
      },
      lineChildren,
    );
    return index < lines.length - 1
      ? [line, { type: 'text', value: '\n' }]
      : [line];
  });
}

export function applyLineNumbers(pre: Element, option?: LineNumbersOption) {
  applyCodeBlockLineOptions(pre, { lineNumbers: option });
}
