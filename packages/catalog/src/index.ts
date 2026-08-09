import { languageCatalog } from './generated.js';
import type {
  LanguageCatalogEntry,
  LanguageCatalogRegistrationTarget,
  ResolveLanguageOptions,
} from './types.js';

const names = new Map<string, LanguageCatalogEntry>();
const extensions = new Map<string, LanguageCatalogEntry>();
const filenames = new Map<string, LanguageCatalogEntry>();

for (const entry of languageCatalog) {
  for (const name of [entry.id, ...entry.aliases, ...entry.extensions]) {
    names.set(normalize(name), entry);
  }
  for (const extension of entry.extensions) {
    extensions.set(normalize(extension), entry);
  }
  for (const filename of entry.filenames) {
    filenames.set(normalize(filename), entry);
  }
}

export function registerLanguageCatalog(
  treelight: LanguageCatalogRegistrationTarget,
) {
  for (const entry of languageCatalog) {
    const registrationNames = new Set([
      entry.id,
      ...entry.aliases,
      ...entry.extensions,
    ]);
    for (const name of registrationNames) {
      treelight.registerLanguage(name, entry.loader);
    }
  }
}

export function resolveLanguage({ fileType, path }: ResolveLanguageOptions) {
  const filename = path?.split(/[\\/]/).at(-1);
  if (filename) {
    const normalizedFilename = normalize(filename);
    const exact = filenames.get(normalizedFilename);
    if (exact) return exact.id;

    for (const entry of languageCatalog) {
      if (
        entry.filenamePrefixes.some((prefix) =>
          normalizedFilename.startsWith(normalize(prefix)),
        )
      ) {
        return entry.id;
      }
    }

    const extension = normalizedFilename.includes('.')
      ? normalizedFilename.split('.').at(-1)
      : undefined;
    const byExtension = extension ? extensions.get(extension) : undefined;
    if (byExtension) return byExtension.id;
  }

  return fileType ? (names.get(normalize(fileType))?.id ?? null) : null;
}

export function getLanguageCatalogEntry(name: string) {
  return names.get(normalize(name)) ?? null;
}

function normalize(value: string) {
  return value.trim().toLowerCase().replaceAll('_', '-');
}

export type {
  LanguageCatalogEntry,
  LanguageCatalogRegistrationTarget,
  ResolveLanguageOptions,
} from './types.js';
export { languageCatalog };
