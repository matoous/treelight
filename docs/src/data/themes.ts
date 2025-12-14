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
];
