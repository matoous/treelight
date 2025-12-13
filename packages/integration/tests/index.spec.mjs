import goLanguage from '@treelight/go';
import javascriptLanguage from '@treelight/javascript';
import typescriptLanguage from '@treelight/typescript';
import test from 'ava';
import treelight from '../../core/dist/index.js';

const { highlight, registerLanguage } = treelight;
const resolveLanguage = (module) => module.default ?? module;

test.before(() => {
  registerLanguage('go', resolveLanguage(goLanguage));
  registerLanguage('javascript', resolveLanguage(javascriptLanguage));
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

test('typescript', async (t) => {
  t.snapshot(await highlight('console.info("test")', 'typescript'));
});
