import { useDark } from '@rspress/core/runtime';
import { Callout } from '@rspress/core/theme';
import { useEffect, useState } from 'react';
import { languageOptions } from './data/languages';
import { themeOptions } from './data/themes';
import { ensureTheme, treelight } from './lib/treelight';

const defaultLanguage = languageOptions[0]?.id ?? 'javascript';
const fallbackTheme = themeOptions[0]?.id ?? 'github-dark';
const siteAwareThemes = new Set(['github-dark', 'github-light']);

const snippetsByLanguage = languageOptions.reduce<Record<string, string>>(
  (acc, option) => {
    acc[option.id] = option.sample;
    return acc;
  },
  {},
);

function App() {
  const isDark = useDark();
  const [language, setLanguage] = useState(defaultLanguage);
  const [theme, setTheme] = useState(fallbackTheme);
  const [hasCustomTheme, setHasCustomTheme] = useState(false);
  const [highlighted, setHighlighted] = useState('');
  const [error, setError] = useState<string | null>(null);

  const code = snippetsByLanguage[language] ?? '';

  useEffect(() => {
    let isCancelled = false;
    setError(null);

    async function runHighlight() {
      try {
        await ensureTheme(theme);
        const html = await treelight.highlight(code, language, { theme });
        if (!isCancelled) {
          setHighlighted(html);
        }
      } catch (cause) {
        if (!isCancelled) {
          const message =
            cause instanceof Error
              ? cause.message
              : 'Unable to highlight the provided code sample.';
          setError(message);
        }
      }
    }

    runHighlight();

    return () => {
      isCancelled = true;
    };
  }, [code, language, theme]);

  useEffect(() => {
    setTheme((currentTheme) => {
      if (hasCustomTheme || !siteAwareThemes.has(currentTheme)) {
        return currentTheme;
      }

      return isDark ? 'github-dark' : 'github-light';
    });
  }, [hasCustomTheme, isDark]);

  return (
    <div className="demo">
      <section className="demo-card rp-home-feature__card">
        <fieldset className="controls" aria-label="Demo settings">
          <label className="field">
            <span>Language</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {languageOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Theme</span>
            <select
              value={theme}
              onChange={(event) => {
                setHasCustomTheme(true);
                setTheme(event.target.value);
              }}
            >
              {themeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        <section className="preview" aria-label="Highlighted output">
          {error ? (
            <Callout type="danger" title="Highlighting failed">
              {error}
            </Callout>
          ) : (
            <div
              className="preview-output"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Treelight returns highlighted HTML for rendering.
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          )}
        </section>
      </section>
    </div>
  );
}

export default App;
