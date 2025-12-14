import { useEffect, useMemo, useState } from 'react';
import { languageOptions } from './data/languages';
import { themeOptions } from './data/themes';
import { ensureTheme, treelight } from './lib/treelight';

type Status = 'idle' | 'loading';

const defaultLanguage = languageOptions[0]?.id ?? 'javascript';
const defaultTheme = themeOptions[0]?.id ?? 'github-dark';

const initialSnippets = languageOptions.reduce<Record<string, string>>(
  (acc, option) => {
    acc[option.id] = option.sample;
    return acc;
  },
  {},
);

function App() {
  const [language, setLanguage] = useState(defaultLanguage);
  const [theme, setTheme] = useState(defaultTheme);
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

  function handleSnippetChange(value: string) {
    setSnippets((current) => ({
      ...current,
      [language]: value,
    }));
  }

  return (
    <div className="page">
      <header className="hero">
        <div>
          <h1>Treelight Showcase</h1>
          <p className="eyebrow">Explore every bundled language and theme.</p>
        </div>
      </header>

      <section className="controls">
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
            onChange={(event) => setTheme(event.target.value)}
          >
            {themeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="editor">
        <div className="editor-header">
          <p>{selectedLanguage?.label ?? 'Language'} snippet</p>
          {status === 'loading' ? (
            <span className="pill">Fetching grammars…</span>
          ) : null}
        </div>
        <textarea
          spellCheck={false}
          value={code}
          onChange={(event) => handleSnippetChange(event.target.value)}
        />
      </section>

      <section className="preview">
        <div className="preview-header">
          <p>Highlighted output</p>
          <span className="pill">{selectedTheme?.label ?? theme}</span>
        </div>
        {error ? (
          <div className="note error">{error}</div>
        ) : (
          <div
            className="preview-output"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Necessary until we have components library
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        )}
      </section>
    </div>
  );
}

export default App;
