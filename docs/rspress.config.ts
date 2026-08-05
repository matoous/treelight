import path from 'node:path';
import { defineConfig } from '@rspress/core';
import treelight from '@treelight/plugin-rspress';
import { markdownHighlighter } from './src/lib/markdown';

const siteUrl = (
  process.env.DOCS_SITE_URL ?? 'https://treelight.dzx.cz'
).replace(/\/$/, '');
const siteTitle = 'Treelight';
const siteDescription =
  'Tree-sitter based syntax highlighting for JavaScript runtimes.';
const socialImageUrl = `${siteUrl}/social-card.png`;

function routeUrl(routePath: string) {
  const normalizedPath = routePath === '/' ? '/' : routePath.replace(/\/$/, '');
  return `${siteUrl}${normalizedPath === '/' ? '' : normalizedPath}`;
}

const languagePages = [
  ['Astro', '/languages/astro'],
  ['AWK', '/languages/awk'],
  ['Bash', '/languages/bash'],
  ['C', '/languages/c'],
  ['C#', '/languages/c-sharp'],
  ['C++', '/languages/cpp'],
  ['Comment annotations', '/languages/comment'],
  ['CSS', '/languages/css'],
  ['Dart', '/languages/dart'],
  ['Dockerfile', '/languages/dockerfile'],
  ['Elixir', '/languages/elixir'],
  ['ERB', '/languages/erb'],
  ['Fish', '/languages/fish'],
  ['Go', '/languages/go'],
  ['Go format strings', '/languages/go-format-string'],
  ['GraphQL', '/languages/graphql'],
  ['HCL / Terraform', '/languages/hcl'],
  ['HEEx', '/languages/heex'],
  ['HTML', '/languages/html'],
  ['Java', '/languages/java'],
  ['JavaScript', '/languages/javascript'],
  ['JSDoc', '/languages/jsdoc'],
  ['JSON', '/languages/json'],
  ['jq', '/languages/jq'],
  ['Kotlin', '/languages/kotlin'],
  ['LaTeX', '/languages/latex'],
  ['Lua', '/languages/lua'],
  ['Lua format strings', '/languages/lua-format-string'],
  ['Markdown', '/languages/markdown'],
  ['Markdown inline', '/languages/markdown-inline'],
  ['Nix', '/languages/nix'],
  ['PHP', '/languages/php'],
  ['PHPDoc', '/languages/phpdoc'],
  ['PowerShell', '/languages/powershell'],
  ['Protobuf', '/languages/protobuf'],
  ['Python', '/languages/python'],
  ['Regular expressions', '/languages/regex'],
  ['Ruby', '/languages/ruby'],
  ['Rust', '/languages/rust'],
  ['Scheme', '/languages/scheme'],
  ['SQL', '/languages/sql'],
  ['Svelte', '/languages/svelte'],
  ['Swift', '/languages/swift'],
  ['TOML', '/languages/toml'],
  ['TSX', '/languages/tsx'],
  ['TypeScript', '/languages/typescript'],
  ['Vue', '/languages/vue'],
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

export default defineConfig({
  root: 'src',
  title: siteTitle,
  description: siteDescription,
  lang: 'en',
  siteOrigin: siteUrl,
  icon: '/favicon.svg',
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
    [
      'meta',
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    ],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { name: 'color-scheme', content: 'dark' }],
    ['meta', { name: 'application-name', content: siteTitle }],
    ['meta', { name: 'apple-mobile-web-app-title', content: siteTitle }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image', content: socialImageUrl }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    [
      'meta',
      {
        property: 'og:image:alt',
        content: 'Treelight — Tree-sitter syntax highlighting',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: socialImageUrl }],
    [
      'meta',
      {
        name: 'twitter:image:alt',
        content: 'Treelight — Tree-sitter syntax highlighting',
      },
    ],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '48x48',
        href: '/favicon-48x48.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    (route) => ['link', { rel: 'canonical', href: routeUrl(route.routePath) }],
    (route) => [
      'meta',
      { property: 'og:url', content: routeUrl(route.routePath) },
    ],
  ],
  themeDir: path.join(import.meta.dirname, 'theme'),
  globalStyles: path.join(import.meta.dirname, 'src/styles.css'),
  markdown: {
    globalComponents: [
      path.join(import.meta.dirname, 'src/LanguageShowcase.tsx'),
    ],
  },
  plugins: [
    treelight({
      copyButton: true,
      highlighter: markdownHighlighter,
      theme: 'github-dark',
      lineNumbers: true,
      languageMap: {
        console: 'bash',
        csharp: 'c-sharp',
        js: 'javascript',
        md: 'markdown',
        shell: 'bash',
        sh: 'bash',
        ts: 'typescript',
        yml: 'yaml',
      },
    }),
  ],
  route: {
    cleanUrls: true,
    extensions: ['.md', '.mdx'],
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
