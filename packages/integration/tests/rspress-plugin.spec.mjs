import { readFile } from 'node:fs/promises';
import { createHighlighter } from '@treelight/core';
import javascriptLanguage from '@treelight/javascript';
import { rspressTreelight } from '@treelight/plugin-rspress';
import draculaTheme from '@treelight/theme-dracula';
import test from 'ava';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const markdown = `# Example

\`\`\`javascript title="src/app.js" {1}
const greeting = 'hello';
\`\`\`
`;

function usePluggable(processor, pluggable) {
  return Array.isArray(pluggable)
    ? processor.use(...pluggable)
    : processor.use(pluggable);
}

test.before(async (t) => {
  t.context.highlighter = await createHighlighter({
    languages: [javascriptLanguage],
    themes: [draculaTheme],
  });
});

test('Rspress plugin owns the complete code fence rendering pipeline', async (t) => {
  const plugin = rspressTreelight({
    copyButton: true,
    highlighter: t.context.highlighter,
    lineNumbers: true,
    theme: 'dracula',
  });
  const [remarkPlugin] = plugin.markdown.remarkPlugins;
  const [treelightPlugin, nativePrePlugin] = plugin.markdown.rehypePlugins;

  let processor = unified().use(remarkParse);
  processor = usePluggable(processor, remarkPlugin).use(remarkRehype);
  processor = usePluggable(processor, treelightPlugin);
  processor = usePluggable(processor, nativePrePlugin).use(rehypeStringify);

  const html = String(await processor.process(markdown));
  t.true(html.includes('<figure class="treelight-frame"'));
  t.true(html.includes('data-title="src/app.js"'));
  t.true(html.includes('<TreelightPre class="treelight dracula'));
  t.true(html.includes('language-javascript'));
  t.true(html.includes('has-line-numbers'));
  t.true(html.includes('data-highlighted-line="true"'));
  t.true(html.includes('data-line-number="1"'));
  t.false(html.includes('data-line-number="2"'));
  t.true(html.includes('data-treelight-copy-button="true"'));
  t.false(html.includes('language-js'));
  t.false(html.includes('class="shiki'));
});

test('Rspress plugin neutralizes the built-in Shiki renderer', (t) => {
  const existingTransformer = { name: 'existing' };
  const plugin = rspressTreelight({ highlighter: t.context.highlighter });
  const config = plugin.config({
    markdown: {
      shiki: {
        theme: 'existing-theme',
        transformers: [existingTransformer],
      },
    },
  });

  t.is(config.markdown.shiki.defaultLanguage, undefined);
  t.false(config.markdown.shiki.lazy);
  t.deepEqual(config.markdown.shiki.langs, []);
  t.is(config.markdown.shiki.theme, 'existing-theme');
  t.is(config.markdown.shiki.transformers[0], existingTransformer);
});

test('Rspress plugin registers its native pre component', (t) => {
  const plugin = rspressTreelight({ highlighter: t.context.highlighter });

  t.deepEqual(plugin.markdown.globalComponents, [
    '@treelight/plugin-rspress/TreelightPre',
  ]);
});

test('Rspress stylesheet contains no Rspress code block chrome overrides', async (t) => {
  const css = await readFile(
    new URL('../../plugin-rspress/styles.css', import.meta.url),
    'utf8',
  );

  t.true(
    css.includes(
      '--treelight-title-background: var(--treelight-code-background)',
    ),
  );
  t.false(css.includes('.rp-codeblock'));
  t.false(css.includes('.rp-codeblock__content'));
});
