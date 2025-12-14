import goLanguage from '@treelight/go';
import javascriptLanguage from '@treelight/javascript';
import jsonLanguage from '@treelight/json';
import phpLanguage from '@treelight/php';
import pythonLanguage from '@treelight/python';
import rustLanguage from '@treelight/rust';
import schemeLanguage from '@treelight/scheme';
import tsxLanguage from '@treelight/tsx';
import typescriptLanguage from '@treelight/typescript';
import yamlLanguage from '@treelight/yaml';
import test from 'ava';
import treelight from '../../core/dist/index.js';

const { highlight, registerLanguage } = treelight;
const resolveLanguage = (module) => module.default ?? module;

test.before(() => {
  registerLanguage('go', resolveLanguage(goLanguage));
  registerLanguage('javascript', resolveLanguage(javascriptLanguage));
  registerLanguage('json', resolveLanguage(jsonLanguage));
  registerLanguage('php', resolveLanguage(phpLanguage));
  registerLanguage('python', resolveLanguage(pythonLanguage));
  registerLanguage('rust', resolveLanguage(rustLanguage));
  registerLanguage('scheme', resolveLanguage(schemeLanguage));
  registerLanguage('tsx', resolveLanguage(tsxLanguage));
  registerLanguage('typescript', resolveLanguage(typescriptLanguage));
  registerLanguage('yaml', resolveLanguage(yamlLanguage));
});

test('go', async (t) => {
  t.snapshot(await highlight('x := 1', 'go'));
  t.snapshot(
    await highlight(
      `
package main

func foo(s string) string {
  return "foo" + s
}

func main() {
  fmt.Println(foo("bar"))
}`,
      'go',
    ),
  );
});

test('javascript', async (t) => {
  t.snapshot(await highlight('console.info("test")', 'javascript'));
});

test('json', async (t) => {
  t.snapshot(
    await highlight(
      `{
  "name": "treelight",
  "languages": ["json", "yaml", "scheme"],
  "enabled": true
}`,
      'json',
    ),
  );
});

test('php', async (t) => {
  t.snapshot(
    await highlight(
      `<?php

function greet(string $name): string {
  return "Hello, {$name}!";
}

echo greet('Treelight');`,
      'php',
    ),
  );
});

test('python', async (t) => {
  t.snapshot(
    await highlight(
      `def run(items: list[str]) -> None:
  for item in items:
    print(item.upper())


if __name__ == '__main__':
  run(['treelight', 'python'])`,
      'python',
    ),
  );
});

test('rust', async (t) => {
  t.snapshot(
    await highlight(
      `fn add(left: i32, right: i32) -> i32 {
  left + right
}

fn main() {
  println!("{}", add(2, 3));
}`,
      'rust',
    ),
  );
});

test('scheme', async (t) => {
  t.snapshot(
    await highlight(
      `;; Simple Scheme example
(define (double x)
  (* x 2))

(display (double 4))`,
      'scheme',
    ),
  );
});

test('typescript', async (t) => {
  t.snapshot(await highlight('console.info("test")', 'typescript'));
});

test('tsx', async (t) => {
  t.snapshot(
    await highlight(
      `<Title message="hello">
  <Button disabled={state.loading}>Submit</Button>
</Title>`,
      'tsx',
    ),
  );
});

test('yaml', async (t) => {
  t.snapshot(
    await highlight(
      `pipeline:
  steps:
    - name: fetch
      retries: 2
    - name: render
      threads: 4`,
      'yaml',
    ),
  );
});
