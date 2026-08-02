import astroLanguage from '@treelight/astro';
import awkLanguage from '@treelight/awk';
import bashLanguage from '@treelight/bash';
import cSharpLanguage from '@treelight/c-sharp';
import dartLanguage from '@treelight/dart';
import elixirLanguage from '@treelight/elixir';
import erbLanguage from '@treelight/erb';
import fishLanguage from '@treelight/fish';
import hclLanguage from '@treelight/hcl';
import heexLanguage from '@treelight/heex';
import jqLanguage from '@treelight/jq';
import kotlinLanguage from '@treelight/kotlin';
import latexLanguage from '@treelight/latex';
import luaLanguage from '@treelight/lua';
import luaFormatStringLanguage from '@treelight/lua-format-string';
import markdownInlineLanguage from '@treelight/markdown-inline';
import nixLanguage from '@treelight/nix';
import phpLanguage from '@treelight/php';
import phpdocLanguage from '@treelight/phpdoc';
import powershellLanguage from '@treelight/powershell';
import protobufLanguage from '@treelight/protobuf';
import rubyLanguage from '@treelight/ruby';
import svelteLanguage from '@treelight/svelte';
import swiftLanguage from '@treelight/swift';
import vueLanguage from '@treelight/vue';
import test from 'ava';
import treelight from '../../core/dist/index.js';

const { Treelight } = treelight;
const resolveLanguage = (module) => module.default ?? module;

const cases = [
  ['c-sharp', cSharpLanguage, 'public record User(int Id, string Name);'],
  [
    'kotlin',
    kotlinLanguage,
    'fun greet(name: String): String = "Hello, $name"',
  ],
  ['swift', swiftLanguage, 'let names: [String] = ["Tree", "light"]'],
  ['dart', dartLanguage, "void main() { print('Hello, Treelight!'); }"],
  [
    'hcl',
    hclLanguage,
    'resource "aws_s3_bucket" "assets" { bucket = "treelight-assets" }',
  ],
  [
    'nix',
    nixLanguage,
    '{ pkgs }: pkgs.mkShell { packages = [ pkgs.nodejs ]; }',
  ],
  [
    'protobuf',
    protobufLanguage,
    'syntax = "proto3"; message User { string name = 1; }',
  ],
  [
    'vue',
    vueLanguage,
    '<template><button @click="count++">{{ count }}</button></template>',
  ],
  [
    'svelte',
    svelteLanguage,
    '<script>let count = 0;</script><button>{count}</button>',
  ],
  [
    'astro',
    astroLanguage,
    '---\nconst title = "Treelight";\n---\n<h1>{title}</h1>',
  ],
  ['fish', fishLanguage, 'for name in Tree light; echo $name; end'],
  [
    'powershell',
    powershellLanguage,
    "$names = @('Tree', 'light'); $names | ForEach-Object { Write-Host $_ }",
  ],
  ['awk', awkLanguage, 'BEGIN { print "Hello, Treelight!" }'],
  ['jq', jqLanguage, '.items[] | select(.enabled) | .name'],
  ['latex', latexLanguage, '\\section{Treelight} $E = mc^2$'],
  ['erb', erbLanguage, '<h1><%= @title %></h1>'],
  ['heex', heexLanguage, '<div class="card">{@title}</div>'],
  ['lua-format-string', luaFormatStringLanguage, 'worker %03d: %.2f%%'],
  [
    'phpdoc',
    phpdocLanguage,
    '/** @param string $name Display name. @return string */',
  ],
];

test.serial('loads distinct WASM grammars concurrently', async (t) => {
  const cSharp = new Treelight();
  const hcl = new Treelight();
  cSharp.registerLanguage('c-sharp', resolveLanguage(cSharpLanguage));
  hcl.registerLanguage('hcl', resolveLanguage(hclLanguage));

  const [cSharpHtml, hclHtml] = await Promise.all([
    cSharp.highlight('public record User(int Id);', 'c-sharp', {
      strict: true,
    }),
    hcl.highlight('variable "region" { type = string }', 'hcl', {
      strict: true,
    }),
  ]);

  t.true(cSharpHtml.includes('<span'));
  t.true(hclHtml.includes('<span'));
});

for (const [id, definition, source] of cases) {
  test.serial(`loads and highlights ${id}`, async (t) => {
    const isolated = new Treelight();
    isolated.registerLanguage(id, resolveLanguage(definition));

    const html = await isolated.highlight(source, id, { strict: true });

    t.true(html.includes('<span'));
    t.true(html.includes('class="'));
  });
}

test.serial('Bash injects AWK and jq programs', async (t) => {
  const isolated = new Treelight();
  isolated.registerLanguage('bash', resolveLanguage(bashLanguage));
  isolated.registerLanguage('awk', resolveLanguage(awkLanguage));
  isolated.registerLanguage('jq', resolveLanguage(jqLanguage));

  const html = await isolated.highlight(
    `awk 'BEGIN { print "ready" }' data.txt
jq '.items[] | select(.enabled)' data.json`,
    'bash',
    { strict: true },
  );

  t.regex(html, /class="keyword"[^>]*>print<\/span>/);
  t.regex(html, /class="function-builtin"[^>]*>select<\/span>/);
});

test.serial('Markdown inline injects LaTeX', async (t) => {
  const isolated = new Treelight();
  isolated.registerLanguage(
    'markdown.inline',
    resolveLanguage(markdownInlineLanguage),
  );
  isolated.registerLanguage('latex', resolveLanguage(latexLanguage));

  const html = await isolated.highlight(
    'Energy is $E = mc^2$ and \\alpha is a symbol.',
    'markdown.inline',
    { strict: true },
  );

  t.regex(html, /class="operator"[^>]*>=<\/span>/);
});

test.serial('Ruby injects ERB heredocs', async (t) => {
  const isolated = new Treelight();
  isolated.registerLanguage('ruby', resolveLanguage(rubyLanguage));
  isolated.registerLanguage('erb', resolveLanguage(erbLanguage));

  const html = await isolated.highlight(
    `template = <<~ERB
<h1><%= title %></h1>
ERB
`,
    'ruby',
    { strict: true },
  );

  t.regex(html, /class="keyword"[^>]*>&lt;%=<\/span>/);
});

test.serial('Elixir injects HEEx sigils', async (t) => {
  const isolated = new Treelight();
  isolated.registerLanguage('elixir', resolveLanguage(elixirLanguage));
  isolated.registerLanguage('heex', resolveLanguage(heexLanguage));

  const html = await isolated.highlight(
    '~H"""<div class="card">{@title}</div>"""',
    'elixir',
    { strict: true },
  );

  t.regex(html, /class="tag"[^>]*>div<\/span>/);
});

test.serial('Lua injects format strings', async (t) => {
  const isolated = new Treelight();
  isolated.registerLanguage('lua', resolveLanguage(luaLanguage));
  isolated.registerLanguage(
    'lua-format-string',
    resolveLanguage(luaFormatStringLanguage),
  );

  const html = await isolated.highlight(
    'return string.format("worker %03d", worker_id)',
    'lua',
    { strict: true },
  );

  t.regex(html, /class="punctuation-special"[^>]*>%<\/span>/);
  t.regex(html, /class="constant-numeric-integer"[^>]*>3<\/span>/);
});

test.serial('PHP injects PHPDoc comments', async (t) => {
  const isolated = new Treelight();
  isolated.registerLanguage('php', resolveLanguage(phpLanguage));
  isolated.registerLanguage('phpdoc', resolveLanguage(phpdocLanguage));

  const html = await isolated.highlight(
    '<?php /** @param string $name */ function greet(string $name): void {}',
    'php',
    { strict: true },
  );

  t.regex(html, /class="attribute"/);
  t.true(html.includes('@param'));
});
