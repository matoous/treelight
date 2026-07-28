import { readFile } from 'node:fs/promises';
import { createHighlighter } from '@treelight/core';
import { hastToHtml } from '@treelight/hast';
import javascriptLanguage from '@treelight/javascript';
import {
  createTreelightShikiTransformer,
  rspressTreelight,
} from '@treelight/rspress';
import draculaTheme from '@treelight/theme-dracula';
import test from 'ava';

test.before(async (t) => {
  t.context.highlighter = await createHighlighter({
    languages: [javascriptLanguage],
    themes: [draculaTheme],
  });
});

test('Rspress transformer renders Treelight code blocks', (t) => {
  const transformer = createTreelightShikiTransformer({
    highlighter: t.context.highlighter,
    lineNumbers: true,
    theme: 'github-dark',
  });

  const root = transformer.root.call({
    options: {
      lang: 'javascript',
      meta: {
        __raw: 'theme=dracula title="src/app.js" {1}',
      },
    },
    source: "const greeting = 'hello';",
  });

  const html = hastToHtml(root);
  t.true(html.includes('<figure class="treelight-frame"'));
  t.true(html.includes('data-title="src/app.js"'));
  t.true(html.includes('<pre class="treelight dracula language-javascript'));
  t.true(html.includes('has-line-numbers'));
  t.true(html.includes('data-highlighted-line="true"'));
});

test('Rspress plugin appends a Treelight transformer', async (t) => {
  const existingTransformer = { name: 'existing' };
  const plugin = rspressTreelight({
    highlighter: t.context.highlighter,
    lineNumbers: true,
  });

  const config = await plugin.config({
    markdown: {
      shiki: {
        transformers: [existingTransformer],
      },
    },
  });

  t.is(config.markdown.shiki.transformers[0], existingTransformer);
  t.is(config.markdown.shiki.transformers[1].name, '@treelight/rspress');
});

test('Rspress stylesheet resets Rspress code block chrome inside Treelight frames', async (t) => {
  const css = await readFile(
    new URL('../../rspress/styles.css', import.meta.url),
    'utf8',
  );

  t.true(
    css.includes(
      '--treelight-title-background: var(--treelight-code-background)',
    ),
  );
  t.true(css.includes('.treelight-frame > .rp-codeblock'));
  t.true(css.includes('margin: 0'));
  t.true(css.includes('border-top-left-radius: 0'));
  t.true(css.includes('border-top-right-radius: 0'));
  t.true(css.includes('.rp-codeblock__content .treelight code'));
  t.true(css.includes('padding: 0'));
});
