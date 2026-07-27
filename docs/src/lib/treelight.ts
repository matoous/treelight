import { createBrowserTreelight } from '@treelight/browser';
import { languageOptions } from '../data/languages';
import { themeOptions } from '../data/themes';

const treelight = createBrowserTreelight();

languageOptions.forEach((option) => {
  treelight.registerLanguage(option.id, option.loader);
});

const themeLoaders = new Map(
  themeOptions.map((option) => [option.id, option.loader]),
);
const loadedThemes = new Set<string>(['github-dark']);

function normalizeThemeName(name: string) {
  return name.toLowerCase().replace(/_/g, '-');
}

export async function ensureTheme(themeId: string) {
  const normalized = normalizeThemeName(themeId);
  if (loadedThemes.has(normalized)) {
    return;
  }

  const loader = themeLoaders.get(themeId);
  if (!loader) {
    throw new Error(`Theme "${themeId}" is not registered.`);
  }

  const module = await loader();
  const definition = module.default;
  treelight.registerTheme(definition);
  loadedThemes.add(normalizeThemeName(definition.id ?? themeId));
}

export { treelight };
