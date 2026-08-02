import javascriptLanguage from '@treelight/javascript';
import markdownLanguage from '@treelight/markdown';
import markdownInlineLanguage from '@treelight/markdown-inline';
import test from 'ava';
import treelight from '../../core/dist/index.js';

const { Treelight } = treelight;
const resolveLanguage = (module) => module.default ?? module;

test.serial('deduplicates concurrent loads by registered name', async (t) => {
  const isolated = new Treelight();
  let loaderCalls = 0;
  isolated.registerLanguage('js', async () => {
    loaderCalls += 1;
    await Promise.resolve();
    return resolveLanguage(javascriptLanguage);
  });

  const [first, second] = await Promise.all([
    isolated.loadLanguage('js'),
    isolated.loadLanguage('js'),
  ]);

  t.is(loaderCalls, 1);
  t.is(first, second);
});

test.serial('deduplicates concurrent loads by definition ID', async (t) => {
  const isolated = new Treelight();
  const definition = resolveLanguage(javascriptLanguage);
  isolated.registerLanguage('js', definition);
  isolated.registerLanguage('javascript', definition);

  const [first, second] = await Promise.all([
    isolated.loadLanguage('js'),
    isolated.loadLanguage('javascript'),
  ]);

  t.is(first, second);
});

test.serial('retries a language load after a failure', async (t) => {
  const isolated = new Treelight();
  let loaderCalls = 0;
  isolated.registerLanguage('javascript', () => {
    loaderCalls += 1;
    if (loaderCalls === 1) {
      throw new Error('temporary load failure');
    }
    return resolveLanguage(javascriptLanguage);
  });

  await Promise.all([
    t.throwsAsync(isolated.loadLanguage('javascript'), {
      message: 'temporary load failure',
    }),
    t.throwsAsync(isolated.loadLanguage('javascript'), {
      message: 'temporary load failure',
    }),
  ]);
  await isolated.loadLanguage('javascript');

  t.is(loaderCalls, 2);
});

test.serial('deduplicates concurrent injected-language loads', async (t) => {
  const isolated = new Treelight();
  let loaderCalls = 0;
  isolated.registerLanguage('markdown', resolveLanguage(markdownLanguage));
  isolated.registerLanguage('markdown.inline', async () => {
    loaderCalls += 1;
    await Promise.resolve();
    return resolveLanguage(markdownInlineLanguage);
  });
  await isolated.loadLanguage('markdown');

  await Promise.all([
    isolated.highlight('Read **one**.', 'markdown', { strict: true }),
    isolated.highlight('Read **two**.', 'markdown', { strict: true }),
  ]);

  t.is(loaderCalls, 1);
});
