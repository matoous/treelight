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
    id: 'github-dark-dimmed',
    label: 'GitHub Dark Dimmed',
    loader: () => import('@treelight/theme-github-dark-dimmed'),
  },
  {
    id: 'github-dark-high-contrast',
    label: 'GitHub Dark High Contrast',
    loader: () => import('@treelight/theme-github-dark-high-contrast'),
  },
  {
    id: 'github-dark-tritanopia',
    label: 'GitHub Dark Tritanopia',
    loader: () => import('@treelight/theme-github-dark-tritanopia'),
  },
  {
    id: 'github-dark-colorblind',
    label: 'GitHub Dark Colorblind',
    loader: () => import('@treelight/theme-github-dark-colorblind'),
  },
  {
    id: 'github-light',
    label: 'GitHub Light',
    loader: () => import('@treelight/theme-github-light'),
  },
  {
    id: 'github-light-high-contrast',
    label: 'GitHub Light High Contrast',
    loader: () => import('@treelight/theme-github-light-high-contrast'),
  },
  {
    id: 'github-light-tritanopia',
    label: 'GitHub Light Tritanopia',
    loader: () => import('@treelight/theme-github-light-tritanopia'),
  },
  {
    id: 'github-light-colorblind',
    label: 'GitHub Light Colorblind',
    loader: () => import('@treelight/theme-github-light-colorblind'),
  },
];
