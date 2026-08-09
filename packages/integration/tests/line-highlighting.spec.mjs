import javascriptLanguage from '@treelight/javascript';
import markdownLanguage from '@treelight/markdown';
import markdownInlineLanguage from '@treelight/markdown-inline';
import test from 'ava';
import treelight from '../../core/dist/index.js';

const { Highlighter, Treelight } = treelight;
const resolveLanguage = (module) => module.default ?? module;

test.serial(
  'renders independently consumable lines for multiline captures',
  async (t) => {
    const isolated = new Treelight();
    isolated.registerLanguage(
      'javascript',
      resolveLanguage(javascriptLanguage),
    );

    const lines = await isolated.highlightLines(
      '/* first\n\n * third */\nconst answer = 42;\n',
      'javascript',
      { strict: true },
    );

    t.is(lines.length, 5);
    t.regex(lines[0], /<span[^>]+comment/);
    t.is(lines[1], '');
    t.regex(lines[2], /<span[^>]+comment/);
    t.regex(lines[3], /<span[^>]+keyword/);
    t.false(lines.some((line) => line.includes('<pre')));
    t.is(lines[4], '');
  },
);

test('escapes unsupported languages while preserving source lines', async (t) => {
  const isolated = new Treelight();

  t.deepEqual(await isolated.highlightLines('<tag>\n', 'missing'), [
    '&lt;tag&gt;',
    '',
  ]);
});

test.serial('applies the selected theme to line captures', async (t) => {
  const isolated = new Treelight();
  isolated.registerLanguage('javascript', resolveLanguage(javascriptLanguage));
  isolated.registerTheme({
    id: 'line-test',
    styles: {
      keyword: { fg: '#123456' },
      'ui.background': { bg: '#101418' },
      'ui.foreground': { fg: '#f0f4f8' },
    },
  });

  const [line] = await isolated.highlightLines(
    'const ready = true;',
    'javascript',
    { strict: true, theme: 'line-test' },
  );

  t.regex(line, /class="keyword[^"]*" style="color: #123456"/);
  t.false(line.includes('background-color: #101418'));
});

test('inherits strict mode from the Treelight instance', async (t) => {
  const isolated = new Treelight({ strict: true });

  await t.throwsAsync(() => isolated.highlight('plain', 'missing'), {
    message: 'Language "missing" is not registered.',
  });
  await t.throwsAsync(() => isolated.highlightLines('plain', 'missing'), {
    message: 'Language "missing" is not registered.',
  });
  t.throws(() => isolated.highlightSync('plain', 'missing'), {
    message:
      'Language "missing" is not loaded. Register and load it before highlighting synchronously.',
  });
  t.throws(() => isolated.highlightLinesSync('plain', 'missing'), {
    message:
      'Language "missing" is not loaded. Register and load it before highlighting synchronously.',
  });
});

test.serial('loads and renders injected languages by line', async (t) => {
  const isolated = new Treelight();
  isolated.registerLanguage('markdown', resolveLanguage(markdownLanguage));
  isolated.registerLanguage(
    'markdown.inline',
    resolveLanguage(markdownInlineLanguage),
  );

  const lines = await isolated.highlightLines(
    'Read **one**.\n\nRead **two**.',
    'markdown',
    { strict: true },
  );

  t.is(lines.length, 3);
  t.regex(lines[0], /class="markup-bold"/);
  t.is(lines[1], '');
  t.regex(lines[2], /class="markup-bold"/);
});

test.serial(
  'eager highlighters expose synchronous line rendering',
  async (t) => {
    const highlighter = await Highlighter.create({
      languages: [resolveLanguage(javascriptLanguage)],
    });

    const lines = highlighter.highlightLines(
      'const ready = true;',
      'javascript',
      {
        strict: true,
      },
    );

    t.is(lines.length, 1);
    t.regex(lines[0], /<span[^>]+keyword/);
  },
);
