import astro from '@treelight/astro';
import awk from '@treelight/awk';
import bash from '@treelight/bash';
import c from '@treelight/c';
import cSharp from '@treelight/c-sharp';
import comment from '@treelight/comment';
import { createHighlighter } from '@treelight/core';
import cpp from '@treelight/cpp';
import css from '@treelight/css';
import dart from '@treelight/dart';
import dockerfile from '@treelight/dockerfile';
import elixir from '@treelight/elixir';
import erb from '@treelight/erb';
import fish from '@treelight/fish';
import go from '@treelight/go';
import goFormatString from '@treelight/go-format-string';
import graphql from '@treelight/graphql';
import hcl from '@treelight/hcl';
import heex from '@treelight/heex';
import html from '@treelight/html';
import java from '@treelight/java';
import javascript from '@treelight/javascript';
import jq from '@treelight/jq';
import jsdoc from '@treelight/jsdoc';
import json from '@treelight/json';
import kotlin from '@treelight/kotlin';
import latex from '@treelight/latex';
import lua from '@treelight/lua';
import luaFormatString from '@treelight/lua-format-string';
import markdown from '@treelight/markdown';
import markdownInline from '@treelight/markdown-inline';
import nix from '@treelight/nix';
import php from '@treelight/php';
import phpdoc from '@treelight/phpdoc';
import powershell from '@treelight/powershell';
import protobuf from '@treelight/protobuf';
import python from '@treelight/python';
import regex from '@treelight/regex';
import ruby from '@treelight/ruby';
import rust from '@treelight/rust';
import scheme from '@treelight/scheme';
import sql from '@treelight/sql';
import svelte from '@treelight/svelte';
import swift from '@treelight/swift';
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
import vue from '@treelight/vue';
import yaml from '@treelight/yaml';
import zig from '@treelight/zig';

export const markdownLanguages = [
  astro,
  awk,
  bash,
  c,
  cSharp,
  comment,
  cpp,
  css,
  dockerfile,
  dart,
  elixir,
  erb,
  fish,
  go,
  goFormatString,
  graphql,
  hcl,
  heex,
  html,
  java,
  javascript,
  jsdoc,
  json,
  jq,
  kotlin,
  latex,
  lua,
  luaFormatString,
  markdown,
  markdownInline,
  nix,
  php,
  phpdoc,
  powershell,
  protobuf,
  python,
  regex,
  ruby,
  rust,
  scheme,
  sql,
  svelte,
  swift,
  toml,
  tsx,
  typescript,
  vue,
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
