import path from 'node:path';
import { defineConfig } from '@rspress/core';
import { createTreelightShikiTransformer } from '@treelight/rspress';
import { markdownHighlighter } from './src/lib/markdown';

const siteUrl = (
  process.env.DOCS_SITE_URL ?? 'https://github.com/matoous/treelight'
).replace(/\/$/, '');
const siteTitle = 'Treelight';
const siteDescription =
  'Tree-sitter based syntax highlighting for JavaScript runtimes.';

function routeUrl(routePath: string) {
  const normalizedPath = routePath === '/' ? '/' : routePath.replace(/\/$/, '');
  return `${siteUrl}${normalizedPath === '/' ? '' : normalizedPath}`;
}

const languagePages = [
  ['Bash', '/languages/bash'],
  ['C', '/languages/c'],
  ['C++', '/languages/cpp'],
  ['Comment annotations', '/languages/comment'],
  ['CSS', '/languages/css'],
  ['Dockerfile', '/languages/dockerfile'],
  ['Elixir', '/languages/elixir'],
  ['Go', '/languages/go'],
  ['Go format strings', '/languages/go-format-string'],
  ['GraphQL', '/languages/graphql'],
  ['HTML', '/languages/html'],
  ['Java', '/languages/java'],
  ['JavaScript', '/languages/javascript'],
  ['JSDoc', '/languages/jsdoc'],
  ['JSON', '/languages/json'],
  ['Lua', '/languages/lua'],
  ['Markdown', '/languages/markdown'],
  ['Markdown inline', '/languages/markdown-inline'],
  ['PHP', '/languages/php'],
  ['Python', '/languages/python'],
  ['Regular expressions', '/languages/regex'],
  ['Ruby', '/languages/ruby'],
  ['Rust', '/languages/rust'],
  ['Scheme', '/languages/scheme'],
  ['SQL', '/languages/sql'],
  ['TOML', '/languages/toml'],
  ['TSX', '/languages/tsx'],
  ['TypeScript', '/languages/typescript'],
  ['YAML', '/languages/yaml'],
  ['Zig', '/languages/zig'],
].map(([text, link]) => ({ text, link }));

const themePages = [
  ['Ayu Dark', '/themes/ayu-dark'],
  ['Catppuccin Mocha', '/themes/catppuccin-mocha'],
  ['Dracula', '/themes/dracula'],
  ['Everforest Dark', '/themes/everforest-dark'],
  ['GitHub Dark', '/themes/github-dark'],
  ['GitHub Light', '/themes/github-light'],
  ['Gruvbox', '/themes/gruvbox'],
  ['Gruvbox Material', '/themes/gruvbox-material'],
  ['Kanagawa', '/themes/kanagawa'],
  ['Nord', '/themes/nord'],
  ['One Dark', '/themes/onedark'],
  ['Rose Pine', '/themes/rose-pine'],
  ['Solarized Light', '/themes/solarized-light'],
  ['Tokyo Night', '/themes/tokyonight'],
].map(([text, link]) => ({ text, link }));

const treelightCodeBlocks = createTreelightShikiTransformer({
  highlighter: markdownHighlighter,
  theme: 'github-dark',
  lineNumbers: true,
  languageMap: {
    console: 'bash',
    js: 'javascript',
    md: 'markdown',
    shell: 'bash',
    sh: 'bash',
    ts: 'typescript',
    yml: 'yaml',
  },
});

export default defineConfig({
  root: 'src',
  title: siteTitle,
  description: siteDescription,
  outDir: 'dist',
  llms: true,
  head: [
    ['meta', { name: 'author', content: 'Matous Dzivjak' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'treelight, tree-sitter, syntax highlighting, code highlighting, javascript, typescript, mdx, docs',
      },
    ],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: siteTitle }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: siteTitle }],
    ['meta', { name: 'twitter:description', content: siteDescription }],
    (route) => ['link', { rel: 'canonical', href: routeUrl(route.routePath) }],
    (route) => [
      'meta',
      { property: 'og:url', content: routeUrl(route.routePath) },
    ],
  ],
  themeDir: path.join(import.meta.dirname, 'theme'),
  globalStyles: path.join(import.meta.dirname, 'src/styles.css'),
  route: {
    cleanUrls: true,
    extensions: ['.md', '.mdx'],
  },
  markdown: {
    shiki: {
      transformers: [treelightCodeBlocks],
    },
  },
  builderConfig: {
    tools: {
      rspack(config) {
        config.module ??= {};
        config.module.rules ??= [];
        config.module.rules.push({
          test: /\.wasm$/,
          resourceQuery: /url/,
          type: 'asset/resource',
        });

        config.resolve ??= {};
        config.resolve.fallback = {
          ...config.resolve.fallback,
          'fs/promises': false,
          module: false,
        };

        return config;
      },
    },
  },
  themeConfig: {
    darkMode: 'force-dark',
    search: true,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/matoous/treelight',
      },
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/getting-started' },
      { text: 'Languages', link: '/languages' },
      { text: 'Themes', link: '/themes' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Guides',
          items: [
            { text: 'Getting Started', link: '/getting-started' },
            { text: 'Code Blocks', link: '/code-blocks' },
            { text: 'Usage Guidelines', link: '/usage-guidelines' },
            { text: 'Browser Runtime', link: '/browser' },
          ],
        },
        {
          text: 'Extending Treelight',
          items: [
            { text: 'Language Packages', link: '/language-packages' },
            { text: 'Injections', link: '/injections' },
            { text: 'Custom Languages', link: '/custom-languages' },
            { text: 'Theme Packages', link: '/theme-packages' },
            { text: 'Custom Themes', link: '/custom-themes' },
            { text: 'Theme Reference', link: '/theme-reference' },
          ],
        },
      ],
      '/languages': [
        {
          text: 'Languages',
          items: [{ text: 'Overview', link: '/languages' }, ...languagePages],
        },
      ],
      '/themes': [
        {
          text: 'Themes',
          items: [{ text: 'Overview', link: '/themes' }, ...themePages],
        },
      ],
    },
  },
});
