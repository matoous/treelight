import tinyBenchy from 'tiny-benchy';
import goLanguageModule from 'treelight-language-go';
import tsxLanguageModule from 'treelight-language-tsx';
import treelight from './dist/index.js';

const { Benchmark } = tinyBenchy;
const resolveLanguage = (language) => language.default ?? language;

treelight.registerLanguage('tsx', resolveLanguage(tsxLanguageModule));
treelight.registerLanguage('go', resolveLanguage(goLanguageModule));

const input = `
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

const go = `
package main

func main() {
  i := 1
  for x := range []{1,2,3} {
    fmt.Println(x)
  }
}
`;

const suite = new Benchmark({ iterations: 50 });

suite.add('html', async () => {
  await treelight.highlight(input, 'tsx');
  await treelight.highlight(go, 'go');
});

suite.run();
