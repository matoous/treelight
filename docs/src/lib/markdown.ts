import { createHighlighter } from '@treelight/core';
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
import { languageOptions } from '../data/languages';

const markdownLanguages = await Promise.all(
  languageOptions.map(async ({ loader }) => (await loader()).default),
);

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
