export interface ThemeStyle {
  fg?: string;
  bg?: string;
}

export interface ThemeDefinition {
  id?: string;
  styles: Record<string, ThemeStyle | string>;
}

function resolveEntry(theme: ThemeDefinition, key: string) {
  let target = key;
  while (target) {
    if (theme.styles[target]) {
      return theme.styles[target];
    }
    const idx = target.lastIndexOf('.');
    if (idx === -1) {
      break;
    }
    target = target.slice(0, idx);
  }
  return undefined;
}

export function getThemeColor(
  theme: ThemeDefinition,
  key: string,
  channel: 'fg' | 'bg' = 'fg',
) {
  const entry = resolveEntry(theme, key);
  if (!entry) return undefined;
  if (typeof entry === 'string') {
    return channel === 'fg' ? entry : undefined;
  }
  return entry[channel];
}
