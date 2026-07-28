import { useDark } from '@rspress/core/runtime';
import { Badge, Callout } from '@rspress/core/theme';
import { useEffect, useMemo, useState } from 'react';
import { languageOptions } from './data/languages';
import { themeOptions } from './data/themes';
import { ensureTheme, treelight } from './lib/treelight';

type Status = 'idle' | 'loading';

const defaultLanguage = languageOptions[0]?.id ?? 'javascript';
const fallbackTheme = themeOptions[0]?.id ?? 'github-dark';
const siteAwareThemes = new Set(['github-dark', 'github-light']);

const initialSnippets = languageOptions.reduce<Record<string, string>>(
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
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [snippets, setSnippets] =
    useState<Record<string, string>>(initialSnippets);

  const code = snippets[language] ?? '';

  const selectedLanguage = useMemo(
    () => languageOptions.find((option) => option.id === language),
    [language],
  );

  const selectedTheme = useMemo(
    () => themeOptions.find((option) => option.id === theme),
    [theme],
  );

  useEffect(() => {
    let isCancelled = false;
    setStatus('loading');
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
      } finally {
        if (!isCancelled) {
          setStatus('idle');
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

  function handleSnippetChange(value: string) {
    setSnippets((current) => ({
      ...current,
      [language]: value,
    }));
  }

  return (
    <div className="demo">
      <section className="controls" aria-label="Demo settings">
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
      </section>

      <div className="demo-grid">
        <section className="editor rp-home-feature__card">
          <div className="editor-header">
            <h3 className="rp-home-feature__title">
              {selectedLanguage?.label ?? 'Language'} snippet
            </h3>
            {status === 'loading' ? (
              <Badge type="info" outline>
                Fetching grammars
              </Badge>
            ) : null}
          </div>
          <textarea
            spellCheck={false}
            value={code}
            onChange={(event) => handleSnippetChange(event.target.value)}
          />
        </section>

        <section className="preview rp-home-feature__card">
          <div className="preview-header">
            <h3 className="rp-home-feature__title">Highlighted output</h3>
            <Badge type="tip" outline>
              {selectedTheme?.label ?? theme}
            </Badge>
          </div>
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
      </div>
    </div>
  );
}

export default App;
