import bash from '@treelight/bash';
import c from '@treelight/c';
import comment from '@treelight/comment';
import { createHighlighter } from '@treelight/core';
import cpp from '@treelight/cpp';
import css from '@treelight/css';
import dockerfile from '@treelight/dockerfile';
import elixir from '@treelight/elixir';
import go from '@treelight/go';
import goFormatString from '@treelight/go-format-string';
import graphql from '@treelight/graphql';
import html from '@treelight/html';
import java from '@treelight/java';
import javascript from '@treelight/javascript';
import jsdoc from '@treelight/jsdoc';
import json from '@treelight/json';
import lua from '@treelight/lua';
import markdown from '@treelight/markdown';
import markdownInline from '@treelight/markdown-inline';
import php from '@treelight/php';
import python from '@treelight/python';
import regex from '@treelight/regex';
import ruby from '@treelight/ruby';
import rust from '@treelight/rust';
import scheme from '@treelight/scheme';
import sql from '@treelight/sql';
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
import toml from '@treelight/toml';
import tsx from '@treelight/tsx';
import typescript from '@treelight/typescript';
import yaml from '@treelight/yaml';
import zig from '@treelight/zig';

export const markdownLanguages = [
  bash,
  c,
  comment,
  cpp,
  css,
  dockerfile,
  elixir,
  go,
  goFormatString,
  graphql,
  html,
  java,
  javascript,
  jsdoc,
  json,
  lua,
  markdown,
  markdownInline,
  php,
  python,
  regex,
  ruby,
  rust,
  scheme,
  sql,
  toml,
  tsx,
  typescript,
  yaml,
  zig,
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
