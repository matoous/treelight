import type { RspressPlugin } from '@rspress/core';
import { getClassNames } from '@treelight/hast';
import rehypeTreelight, {
  type RehypeTreelightOptions,
} from '@treelight/plugin-rehype';
import type { Element, Root as HastRoot } from 'hast';
import type { Code, Root as MdastRoot } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export type TreelightRspressOptions = RehypeTreelightOptions;

type TreelightCodeData = NonNullable<Code['data']> & {
  hProperties?: Record<string, unknown>;
};

type RspressConfig = {
  markdown?: {
    shiki?: Record<string, unknown>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

const remarkPrepareTreelight: Plugin<[], MdastRoot> = () => (tree) => {
  visit(tree, 'code', (node: Code) => {
    const language = node.lang?.split(/\s+/u)[0];
    node.lang = undefined;

    if (!language) {
      return;
    }

    node.data ??= {};
    const data = node.data as TreelightCodeData;
    data.hProperties = {
      ...data.hProperties,
      dataTreelightLanguage: language,
    };
  });
};

function isTreelightPre(node: Element) {
  return node.tagName === 'pre' && getClassNames(node).includes('treelight');
}

const rehypeUseTreelightPre: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, 'element', (node) => {
    if (isTreelightPre(node)) {
      node.tagName = 'TreelightPre';
    }
  });
};

function disableRspressShiki(config: RspressConfig) {
  const markdown = config.markdown ?? {};
  return {
    ...config,
    markdown: {
      ...markdown,
      shiki: {
        ...markdown.shiki,
        defaultLanguage: undefined,
        lazy: false,
        langs: [],
      },
    },
  };
}

function rspressTreelight(
  options: TreelightRspressOptions = {},
): RspressPlugin {
  return {
    config(config) {
      return disableRspressShiki(config as RspressConfig) as typeof config;
    },
    markdown: {
      globalComponents: ['@treelight/plugin-rspress/TreelightPre'],
      rehypePlugins: [[rehypeTreelight, options], rehypeUseTreelightPre],
      remarkPlugins: [remarkPrepareTreelight],
    },
    name: '@treelight/plugin-rspress',
  };
}

export { rspressTreelight };
export default rspressTreelight;
