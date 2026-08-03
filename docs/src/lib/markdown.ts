import bash from '@treelight/bash';
import comment from '@treelight/comment';
import { createHighlighter } from '@treelight/core';
import javascript from '@treelight/javascript';
import jsdoc from '@treelight/jsdoc';
import markdown from '@treelight/markdown';
import markdownInline from '@treelight/markdown-inline';
import regex from '@treelight/regex';
import ayuDark from '@treelight/theme-ayu-dark';
import catppuccinMocha from '@treelight/theme-catppuccin-mocha';
import dracula from '@treelight/theme-dracula';
import everforestDark from '@treelight/theme-everforest-dark';
import githubDark from '@treelight/theme-github-dark';
import githubLight from '@treelight/theme-github-light';
import gruvbox from '@treelight/theme-gruvbox';
import gruvboxMaterial from '@treelight/theme-gruvbox-material';
import kanagawa from '@treelight/theme-kanagawa';
import nord from '@treelight/theme-nord';
import onedark from '@treelight/theme-onedark';
import rosePine from '@treelight/theme-rose-pine';
import solarizedLight from '@treelight/theme-solarized-light';
import tokyonight from '@treelight/theme-tokyonight';
import tsx from '@treelight/tsx';
import typescript from '@treelight/typescript';

const markdownLanguages = [
  bash,
  comment,
  javascript,
  jsdoc,
  markdown,
  markdownInline,
  regex,
  tsx,
  typescript,
];

export const markdownThemes = [
  ayuDark,
  catppuccinMocha,
  dracula,
  everforestDark,
  githubDark,
  githubLight,
  gruvbox,
  gruvboxMaterial,
  kanagawa,
  nord,
  onedark,
  rosePine,
  solarizedLight,
  tokyonight,
];

export const markdownHighlighter = await createHighlighter({
  languages: markdownLanguages,
  themes: markdownThemes,
});
