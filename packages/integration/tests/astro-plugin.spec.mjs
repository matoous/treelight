import treelight from '@treelight/astro';
import rehypeTreelight from '@treelight/rehype';
import test from 'ava';

function createSetupOptions(config) {
  const updates = [];
  const warnings = [];
  return {
    options: {
      config,
      logger: {
        warn(message) {
          warnings.push(message);
        },
      },
      updateConfig(update) {
        updates.push(update);
        return {
          ...config,
          ...update,
        };
      },
    },
    updates,
    warnings,
  };
}

async function runConfigSetup(config) {
  const { options, updates, warnings } = createSetupOptions(config);
  await treelight({ defaultLanguage: 'text' }).hooks['astro:config:setup'](
    options,
  );
  return { updates, warnings };
}

test('astro integration injects rehype plugin without a configured processor', async (t) => {
  const existingPlugin = () => undefined;
  const { updates, warnings } = await runConfigSetup({
    markdown: {
      rehypePlugins: [existingPlugin],
    },
  });

  t.is(warnings.length, 0);
  t.is(updates.length, 1);
  t.false(updates[0].markdown.syntaxHighlight);
  t.is(updates[0].markdown.rehypePlugins[0], existingPlugin);
  t.is(updates[0].markdown.rehypePlugins[1][0], rehypeTreelight);
  t.deepEqual(updates[0].markdown.rehypePlugins[1][1], {
    defaultLanguage: 'text',
  });
});

test('astro integration appends to a unified markdown processor', async (t) => {
  const existingPlugin = () => undefined;
  const processor = {
    name: 'unified',
    options: {
      rehypePlugins: [existingPlugin],
    },
  };
  const { updates, warnings } = await runConfigSetup({
    markdown: {
      processor,
    },
  });

  t.is(warnings.length, 0);
  t.is(updates.length, 1);
  t.false(updates[0].markdown.syntaxHighlight);
  t.is(processor.options.rehypePlugins[0], existingPlugin);
  t.is(processor.options.rehypePlugins[1][0], rehypeTreelight);
  t.deepEqual(processor.options.rehypePlugins[1][1], {
    defaultLanguage: 'text',
  });
});

test('astro integration appends to a satteri markdown processor', async (t) => {
  const existingPlugin = () => undefined;
  const processor = {
    name: 'satteri',
    options: {
      hastPlugins: [existingPlugin],
    },
  };
  const { updates, warnings } = await runConfigSetup({
    markdown: {
      processor,
    },
  });

  t.is(warnings.length, 0);
  t.is(updates.length, 1);
  t.false(updates[0].markdown.syntaxHighlight);
  t.is(processor.options.hastPlugins[0], existingPlugin);
  t.is(processor.options.hastPlugins[1][0], rehypeTreelight);
  t.deepEqual(processor.options.hastPlugins[1][1], {
    defaultLanguage: 'text',
  });
});

test('astro integration warns for unsupported markdown processors', async (t) => {
  const { updates, warnings } = await runConfigSetup({
    markdown: {
      processor: {
        name: 'custom',
        options: {},
      },
    },
  });

  t.is(updates.length, 0);
  t.is(warnings.length, 1);
  t.true(warnings[0].includes('markdown.processor'));
  t.true(warnings[0].includes('@treelight/rehype'));
});
