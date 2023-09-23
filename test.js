import ts from './';

let go = `
package main

func main() {
  i := 1
  for x := range []{1,2,3} {
    fmt.Println(x)
  }
}
`

const high = ts.highlight(go, ts.Language.GO);
console.info({
  high
})
