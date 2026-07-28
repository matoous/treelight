import bashLanguage from '@treelight/bash';
import cLanguage from '@treelight/c';
import cppLanguage from '@treelight/cpp';
import cssLanguage from '@treelight/css';
import dockerfileLanguage from '@treelight/dockerfile';
import ecmaLanguage, { ecmaHighlightQuery } from '@treelight/ecma';
import elixirLanguage from '@treelight/elixir';
import goLanguage from '@treelight/go';
import graphqlLanguage from '@treelight/graphql';
import htmlLanguage from '@treelight/html';
import javaLanguage from '@treelight/java';
import javascriptLanguage from '@treelight/javascript';
import jsonLanguage from '@treelight/json';
import luaLanguage from '@treelight/lua';
import markdownLanguage from '@treelight/markdown';
import phpLanguage from '@treelight/php';
import pythonLanguage from '@treelight/python';
import rubyLanguage from '@treelight/ruby';
import rustLanguage from '@treelight/rust';
import schemeLanguage from '@treelight/scheme';
import sqlLanguage from '@treelight/sql';
import ayuDarkTheme from '@treelight/theme-ayu-dark';
import catppuccinMochaTheme from '@treelight/theme-catppuccin-mocha';
import draculaTheme from '@treelight/theme-dracula';
import everforestDarkTheme from '@treelight/theme-everforest-dark';
import githubDarkTheme from '@treelight/theme-github-dark';
import githubLightTheme from '@treelight/theme-github-light';
import gruvboxTheme from '@treelight/theme-gruvbox';
import gruvboxMaterialTheme from '@treelight/theme-gruvbox-material';
import kanagawaTheme from '@treelight/theme-kanagawa';
import nordTheme from '@treelight/theme-nord';
import onedarkTheme from '@treelight/theme-onedark';
import rosePineTheme from '@treelight/theme-rose-pine';
import solarizedLightTheme from '@treelight/theme-solarized-light';
import tokyonightTheme from '@treelight/theme-tokyonight';
import tomlLanguage from '@treelight/toml';
import tsxLanguage from '@treelight/tsx';
import typescriptLanguage from '@treelight/typescript';
import yamlLanguage from '@treelight/yaml';
import zigLanguage from '@treelight/zig';
import test from 'ava';
import { createHighlighter } from '../../core/dist/index.js';

const renderableLanguageCases = [
  ['bash', bashLanguage, 'echo "hello"'],
  ['c', cLanguage, 'int main(void) { return 0; }'],
  ['cpp', cppLanguage, '#include <vector>\nint main() { return 0; }'],
  ['css', cssLanguage, '.root { color: red; }'],
  ['dockerfile', dockerfileLanguage, 'FROM node:24\nCOPY . /app'],
  ['elixir', elixirLanguage, 'defmodule Demo do\n  def hello, do: :ok\nend'],
  ['go', goLanguage, 'package main\nfunc main() {}'],
  ['graphql', graphqlLanguage, 'query Viewer { viewer { login } }'],
  ['html', htmlLanguage, '<section class="hero">Hello</section>'],
  [
    'java',
    javaLanguage,
    'class Main { public static void main(String[] args) {} }',
  ],
  ['javascript', javascriptLanguage, 'const greeting = "hello";'],
  ['json', jsonLanguage, '{"name": "Treelight"}'],
  ['lua', luaLanguage, 'local greeting = "hello"\nprint(greeting)'],
  ['markdown', markdownLanguage, '# Title\n\n`code`'],
  ['php', phpLanguage, '<?php echo "hello";'],
  ['python', pythonLanguage, 'def main():\n    return "hello"'],
  ['ruby', rubyLanguage, 'def hello\n  "hello"\nend'],
  ['rust', rustLanguage, 'fn main() { println!("hello"); }'],
  ['scheme', schemeLanguage, '(define greeting "hello")'],
  ['sql', sqlLanguage, 'select id, name from users;'],
  ['toml', tomlLanguage, 'name = "Treelight"'],
  ['tsx', tsxLanguage, 'export function App() { return <h1>Hello</h1>; }'],
  ['typescript', typescriptLanguage, 'const greeting: string = "hello";'],
  ['yaml', yamlLanguage, 'name: Treelight'],
  ['zig', zigLanguage, 'const std = @import("std");'],
];

const themeCases = [
  ['ayu-dark', ayuDarkTheme],
  ['catppuccin-mocha', catppuccinMochaTheme],
  ['dracula', draculaTheme],
  ['everforest-dark', everforestDarkTheme],
  ['github-dark', githubDarkTheme],
  ['github-light', githubLightTheme],
  ['gruvbox', gruvboxTheme],
  ['gruvbox-material', gruvboxMaterialTheme],
  ['kanagawa', kanagawaTheme],
  ['nord', nordTheme],
  ['onedark', onedarkTheme],
  ['rose-pine', rosePineTheme],
  ['solarized-light', solarizedLightTheme],
  ['tokyonight', tokyonightTheme],
];

const resolveModule = (module) => module.default ?? module;

test('shared ECMAScript query package exposes highlight queries', (t) => {
  const language = resolveModule(ecmaLanguage);
  t.is(language.id, 'ecma');
  t.is(language.queries.highlights, ecmaHighlightQuery);
  t.true(ecmaHighlightQuery.includes('@'));
});

test.serial(
  'all renderable language packages load and highlight a sample',
  async (t) => {
    const highlighter = await createHighlighter({
      languages: renderableLanguageCases.map(([, language]) => language),
      themes: [githubDarkTheme],
    });

    for (const [id, , code] of renderableLanguageCases) {
      const html = highlighter.highlight(code, id, { strict: true });
      t.true(html.includes('<pre class="treelight github-dark"'), id);
      t.true(html.includes('<code>'), id);
      t.true(html.includes('</pre>'), id);
      t.true(html.includes('background-color: #'), id);
    }
  },
);

test.serial(
  'all theme packages render background and foreground styles',
  async (t) => {
    const highlighter = await createHighlighter({
      languages: [javascriptLanguage],
      themes: themeCases.map(([, theme]) => theme),
    });

    for (const [id] of themeCases) {
      const html = highlighter.highlight(
        'console.info("theme")',
        'javascript',
        {
          strict: true,
          theme: id,
        },
      );
      t.true(html.includes(`<pre class="treelight ${id}"`), id);
      t.regex(html, /background-color: #[0-9a-fA-F]{3,8}/, id);
      t.regex(html, /color: #[0-9a-fA-F]{3,8}/, id);
    }
  },
);
