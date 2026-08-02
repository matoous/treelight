export type ThemeModifier =
  | 'bold'
  | 'dim'
  | 'italic'
  | 'strikethrough'
  | 'underline';

export type ThemeUnderlineStyle =
  | 'line'
  | 'curl'
  | 'dotted'
  | 'dashed'
  | 'double_line';

export interface ThemeUnderline {
  color?: string;
  style?: ThemeUnderlineStyle;
}

export interface ThemeStyle {
  fg?: string;
  bg?: string;
  modifiers?: readonly ThemeModifier[];
  underline?: ThemeUnderline;
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

export function getThemeStyle(
  theme: ThemeDefinition,
  key: string,
): ThemeStyle | undefined {
  const entry = resolveEntry(theme, key);
  if (!entry) return undefined;
  return typeof entry === 'string' ? { fg: entry } : entry;
}

export function getThemeColor(
  theme: ThemeDefinition,
  key: string,
  channel: 'fg' | 'bg' = 'fg',
) {
  const entry = getThemeStyle(theme, key);
  if (!entry) return undefined;
  return entry[channel];
}
