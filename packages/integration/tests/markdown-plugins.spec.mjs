import { createHighlighter } from '@treelight/core';
import javascriptLanguage from '@treelight/javascript';
import rehypeTreelight from '@treelight/rehype';
import remarkTreelight from '@treelight/remark';
import test from 'ava';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const markdown = `# Example

\`\`\`javascript
const greeting = 'hello';
\`\`\`
`;

const multilineMarkdown = `# Example

\`\`\`javascript
const greeting = 'hello';
console.info(greeting);
\`\`\`
`;

const metadataLineNumbersMarkdown = `# Example

\`\`\`javascript showLineNumbers startLineNumber=41
const greeting = 'hello';
console.info(greeting);
\`\`\`
`;

const disabledLineNumbersMarkdown = `# Example

\`\`\`javascript showLineNumbers=false
const greeting = 'hello';
console.info(greeting);
\`\`\`
`;

test.before(async (t) => {
  t.context.highlighter = await createHighlighter({
    languages: [javascriptLanguage],
  });
});

test('rehype plugin renders code blocks with Treelight', async (t) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeTreelight, {
      highlighter: t.context.highlighter,
    })
    .use(rehypeStringify)
    .process(markdown);

  const html = String(file);
  t.true(html.includes('class="treelight github-dark language-javascript"'));
  t.true(html.includes('<span class="variable"'));
});

test('rehype plugin reads Rspress-style pre lang properties', async (t) => {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'pre',
        properties: { lang: 'javascript' },
        children: [
          {
            type: 'element',
            tagName: 'code',
            properties: {},
            children: [{ type: 'text', value: "const greeting = 'hello';" }],
          },
        ],
      },
    ],
  };

  const result = await unified()
    .use(rehypeTreelight, {
      highlighter: t.context.highlighter,
    })
    .run(tree);

  const html = JSON.stringify(result);
  t.true(
    html.includes(
      '"className":["treelight","github-dark","language-javascript"]',
    ),
  );
  t.true(html.includes('"variable"'));
});

test('rehype plugin can render line numbers', async (t) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeTreelight, {
      highlighter: t.context.highlighter,
      lineNumbers: { start: 41 },
    })
    .use(rehypeStringify)
    .process(multilineMarkdown);

  const html = String(file);
  t.true(
    html.includes(
      'class="treelight github-dark language-javascript has-line-numbers"',
    ),
  );
  t.true(html.includes('data-line-number-start="41"'));
  t.true(html.includes('class="treelight-line-number"'));
  t.true(html.includes('>41</span>'));
  t.true(html.includes('>42</span>'));
  t.true(html.includes('<span class="variable"'));
});

test('remark plugin renders code blocks with Treelight', async (t) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkTreelight, {
      highlighter: t.context.highlighter,
    })
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(markdown);

  const html = String(file);
  t.true(html.includes('<pre class="treelight github-dark"'));
  t.true(html.includes('<span class="variable"'));
  t.false(html.includes('class="language-javascript"'));
});

test('remark plugin can render line numbers', async (t) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkTreelight, {
      highlighter: t.context.highlighter,
      lineNumbers: { startLineNumber: 41 },
    })
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(multilineMarkdown);

  const html = String(file);
  t.true(html.includes('<pre class="treelight github-dark has-line-numbers"'));
  t.true(html.includes('data-line-number-start="41"'));
  t.true(html.includes('class="treelight-line-number"'));
  t.true(html.includes('>41</span>'));
  t.true(html.includes('>42</span>'));
  t.true(html.includes('<span class="variable"'));
});

test('remark plugin can render line numbers from code metadata', async (t) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkTreelight, {
      highlighter: t.context.highlighter,
    })
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(metadataLineNumbersMarkdown);

  const html = String(file);
  t.true(html.includes('data-line-number-start="41"'));
  t.true(html.includes('>41</span>'));
  t.true(html.includes('>42</span>'));
});

test('remark plugin can disable global line numbers from code metadata', async (t) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkTreelight, {
      highlighter: t.context.highlighter,
      lineNumbers: true,
    })
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(disabledLineNumbersMarkdown);

  const html = String(file);
  t.false(html.includes('has-line-numbers'));
  t.false(html.includes('treelight-line-number'));
});
