import type { LanguageLoader } from '@treelight/core';

export interface LanguageCatalogEntry {
  id: string;
  packageName: string;
  aliases: readonly string[];
  extensions: readonly string[];
  filenames: readonly string[];
  filenamePrefixes: readonly string[];
  loader: LanguageLoader;
}

export interface LanguageCatalogRegistrationTarget {
  registerLanguage(name: string, loader: LanguageLoader): void;
}

export interface ResolveLanguageOptions {
  fileType?: string | null;
  path?: string | null;
}
