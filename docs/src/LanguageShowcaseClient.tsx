import {
  addClassName,
  applyCodeBlockLineOptions,
  hastToHtml,
  htmlFragmentToRoot,
  wrapCodeBlockCopyButton,
} from '@treelight/hast';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { treelight } from './lib/treelight';

interface LanguageShowcaseClientProps {
  children: ReactNode;
  language: string;
}

function getSourceCode(container: HTMLDivElement) {
  const code = container.querySelector('pre code')?.cloneNode(true);
  if (!(code instanceof HTMLElement)) {
    return undefined;
  }
  code
    .querySelectorAll('[aria-hidden="true"], [data-treelight-copy-ignore]')
    .forEach((node) => {
      node.remove();
    });
  return code.textContent ?? '';
}

function renderCodeBlock(html: string, language: string) {
  const root = htmlFragmentToRoot(html);
  const pre = root.children[0];
  if (pre?.type === 'element') {
    addClassName(pre, `language-${language}`);
    applyCodeBlockLineOptions(pre, { lineNumbers: true });
    root.children[0] = wrapCodeBlockCopyButton(pre, true);
  }
  return hastToHtml(root);
}

function LanguageShowcaseClient({
  children,
  language,
}: LanguageShowcaseClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlighted, setHighlighted] = useState('');
  const [error, setError] = useState<string>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const code = getSourceCode(container);
    if (code === undefined) {
      setError('Unable to read this code sample.');
      return;
    }

    let cancelled = false;
    setError(undefined);

    async function highlight() {
      try {
        const html = await treelight.highlight(code, language, {
          theme: 'github-dark',
        });
        if (!cancelled) {
          setHighlighted(renderCodeBlock(html, language));
        }
      } catch (cause) {
        if (!cancelled) {
          setError(
            cause instanceof Error
              ? cause.message
              : 'Unable to highlight this code sample.',
          );
        }
      }
    }

    highlight();
    return () => {
      cancelled = true;
    };
  }, [language]);

  return (
    <div className="language-showcase" ref={containerRef}>
      {highlighted ? (
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Treelight returns highlighted HTML for rendering.
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        children
      )}
      {error ? <p role="alert">{error}</p> : null}
    </div>
  );
}

export default LanguageShowcaseClient;
