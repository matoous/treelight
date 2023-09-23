const {Benchmark} = require("tiny-benchy");
const ts = require('./');

let input = `
function Example() {
  let alertDismiss = (close) => {
    close();
    alert('Dialog dismissed.');
  };
  return (
    <DialogTrigger isDismissable>
      <ActionButton>Info</ActionButton>
      {(close) => (
        <Dialog onDismiss={() => alertDismiss(close)}>
          <Heading>Version Info</Heading>
          <Divider />
          <Content>
            <Text>Version 1.0.0, Copyright 2020</Text>
          </Content>
        </Dialog>
      )}
    </DialogTrigger>
  );
}
`;

let go = `
package main

func main() {
  i := 1
  for x := range []{1,2,3} {
    fmt.Println(x)
  }
}
`

let suite = new Benchmark({iterations: 50});

suite.add('html', () => {
  ts.highlight(input, ts.Language.JSX);
  ts.highlight(go, ts.Language.GO);
});

suite.add('hast', () => {
  ts.highlightHast(input, ts.Language.JSX);
  ts.highlightHast(go, ts.Language.GO);
});

suite.run();
