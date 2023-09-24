import test from 'ava'

import { highlight } from '../index.js'

test('go', (t) => {
  t.snapshot(highlight('x := 1', 'go'));
  t.snapshot(highlight(`
package main

func foo(s string) string {
  return "foo" + s
}

func main() {
  fmt.Println(foo("bar"))
}`, 'go'));
})

test('js', (t) => {
  t.snapshot(highlight('console.info("test")', 'js'));
})

test('ts', (t) => {
  t.snapshot(highlight('console.info("test")', 'ts'));
})
