import goLanguage from '@treelight/go';
import javascriptLanguage from '@treelight/javascript';
import phpLanguage from '@treelight/php';
import pythonLanguage from '@treelight/python';
import rustLanguage from '@treelight/rust';
import typescriptLanguage from '@treelight/typescript';
import test from 'ava';
import treelight from '../../core/dist/index.js';

const { highlight, registerLanguage } = treelight;
const resolveLanguage = (module) => module.default ?? module;

test.before(() => {
  registerLanguage('go', resolveLanguage(goLanguage));
  registerLanguage('javascript', resolveLanguage(javascriptLanguage));
  registerLanguage('php', resolveLanguage(phpLanguage));
  registerLanguage('python', resolveLanguage(pythonLanguage));
  registerLanguage('rust', resolveLanguage(rustLanguage));
  registerLanguage('typescript', resolveLanguage(typescriptLanguage));
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

test('typescript', async (t) => {
  t.snapshot(await highlight('console.info("test")', 'typescript'));
});
