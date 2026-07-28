import type { ThemeDefinition } from '@treelight/core';

export interface ThemeOption {
  id: string;
  label: string;
  loader: () => Promise<{ default: ThemeDefinition }>;
}

export const themeOptions: ThemeOption[] = [
  {
    id: 'github-dark',
    label: 'GitHub Dark',
    loader: () => import('@treelight/theme-github-dark'),
  },
  {
    id: 'github-light',
    label: 'GitHub Light',
    loader: () => import('@treelight/theme-github-light'),
  },
  {
    id: 'ayu-dark',
    label: 'Ayu Dark',
    loader: () => import('@treelight/theme-ayu-dark'),
  },
  {
    id: 'catppuccin-mocha',
    label: 'Catppuccin Mocha',
    loader: () => import('@treelight/theme-catppuccin-mocha'),
  },
  {
    id: 'dracula',
    label: 'Dracula',
    loader: () => import('@treelight/theme-dracula'),
  },
  {
    id: 'everforest-dark',
    label: 'Everforest Dark',
    loader: () => import('@treelight/theme-everforest-dark'),
  },
  {
    id: 'gruvbox',
    label: 'Gruvbox',
    loader: () => import('@treelight/theme-gruvbox'),
  },
  {
    id: 'gruvbox-material',
    label: 'Gruvbox Material',
    loader: () => import('@treelight/theme-gruvbox-material'),
  },
  {
    id: 'kanagawa',
    label: 'Kanagawa',
    loader: () => import('@treelight/theme-kanagawa'),
  },
  {
    id: 'nord',
    label: 'Nord',
    loader: () => import('@treelight/theme-nord'),
  },
  {
    id: 'onedark',
    label: 'One Dark',
    loader: () => import('@treelight/theme-onedark'),
  },
  {
    id: 'rose-pine',
    label: 'Rose Pine',
    loader: () => import('@treelight/theme-rose-pine'),
  },
  {
    id: 'solarized-light',
    label: 'Solarized Light',
    loader: () => import('@treelight/theme-solarized-light'),
  },
  {
    id: 'tokyonight',
    label: 'Tokyo Night',
    loader: () => import('@treelight/theme-tokyonight'),
  },
];
