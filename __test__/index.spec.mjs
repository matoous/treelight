import test from 'ava'

import { highlight, Language } from '../index.js'

test('highlihgt go', (t) => {
  t.is(highlight('x := 1', Language.GO), '<span class="variable">x</span> <span class="operator">:=</span> <span class="number">1</span>\n')
})
