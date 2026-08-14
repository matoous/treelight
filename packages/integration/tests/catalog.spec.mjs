import {
  getLanguageCatalogEntry,
  languageCatalog,
  registerLanguageCatalog,
  resolveLanguage,
} from '@treelight/catalog';
import test from 'ava';
import treelight from '../../core/dist/index.js';

const { Treelight } = treelight;

const resolutionCases = [
  [{ fileType: 'csharp', path: 'src/Program.cs' }, 'c-sharp'],
  [{ fileType: 'terraform', path: 'main.tf' }, 'hcl'],
  [{ fileType: 'shell', path: 'script.fish' }, 'fish'],
  [{ fileType: 'typescript', path: 'src/App.tsx' }, 'tsx'],
  [{ fileType: 'unknown', path: 'src/Component.astro' }, 'astro'],
  [{ fileType: 'clojure', path: 'src/core.clj' }, 'clojure'],
  [{ fileType: 'shell', path: 'script.nu' }, 'nu'],
  [{ fileType: 'objc', path: 'Sources/AppDelegate.m' }, 'objective-c'],
  [{ fileType: 'unknown', path: 'nginx.conf' }, 'nginx'],
  [{ fileType: 'unknown', path: 'styles.scss' }, 'scss'],
  [{ fileType: 'unknown', path: 'document.xml' }, 'xml'],
  [{ fileType: 'unknown', path: 'README' }, null],
];

test('resolves backend file types and path-specific languages', (t) => {
  for (const [input, expected] of resolutionCases) {
    t.is(resolveLanguage(input), expected);
  }
  t.is(getLanguageCatalogEntry('tf')?.id, 'hcl');
});

test('catalog IDs are unique and every registration stays lazy', (t) => {
  const ids = languageCatalog.map((entry) => entry.id);
  t.is(ids.length, 60);
  t.is(new Set(ids).size, ids.length);

  const registrations = new Map();
  registerLanguageCatalog({
    registerLanguage(name, loader) {
      registrations.set(name, loader);
    },
  });

  const expectedRegistrations = new Set(
    languageCatalog.flatMap((entry) => [
      entry.id,
      ...entry.aliases,
      ...entry.extensions,
    ]),
  );
  t.is(registrations.size, expectedRegistrations.size);
  t.true(
    [...registrations.values()].every((loader) => typeof loader === 'function'),
  );
});

test.serial(
  'catalog loaders highlight a selected language on demand',
  async (t) => {
    const isolated = new Treelight();
    registerLanguageCatalog(isolated);

    const lines = await isolated.highlightLines('{"ready": true}', 'json', {
      strict: true,
    });

    t.is(lines.length, 1);
    t.regex(lines[0], /<span/);
    t.regex(lines[0], /ready/);
  },
);

test.serial(
  'new injection grammars load and highlight on demand',
  async (t) => {
    const isolated = new Treelight();
    registerLanguageCatalog(isolated);

    const samples = [
      ['clojure', '(defn hello [] "world")'],
      ['haskell', 'main = putStrLn "hello"'],
      ['luap', '%a+'],
      ['nginx', 'server { listen 80; }'],
      ['nim', 'proc greet() = echo "hello"'],
      ['nu', 'let answer = 42'],
      ['objective-c', '@interface Greeter : NSObject\n- (void)greet;\n@end'],
      ['perl', 'my $answer = 42;'],
      ['pod', '=head1 NAME\n\nExample'],
      ['scss', '$color: red; .button { color: $color; }'],
      ['xml', '<root key="value">text</root>'],
    ];

    for (const [language, source] of samples) {
      const lines = await isolated.highlightLines(source, language, {
        strict: true,
      });
      t.true(
        lines.some((line) => line.includes('<span')),
        `${language} should emit highlighted spans`,
      );
    }
  },
);

test.serial('bundled POD grammar highlights nested regions', async (t) => {
  const isolated = new Treelight();
  registerLanguageCatalog(isolated);

  const perl = (
    await isolated.highlightLines(
      '=head1 NAME\n\nExample\n\n=cut\nmy $answer = 42;',
      'perl',
      { strict: true },
    )
  ).join('\n');
  t.regex(
    perl,
    /class="markup-heading-1"[^>]*>NAME/,
    'POD should highlight its injected heading',
  );
});
