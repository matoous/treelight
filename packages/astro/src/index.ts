import rehypeTreelight, {
  type RehypeTreelightOptions,
} from '@treelight/rehype';
import type { AstroIntegration } from 'astro';

export type AstroTreelightOptions = RehypeTreelightOptions;

type MarkdownProcessor = {
  name?: unknown;
  options?: Record<string, unknown>;
};

type RehypePluginEntry = unknown;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getProcessor(value: unknown): MarkdownProcessor | undefined {
  return isObject(value) ? value : undefined;
}

function hasHastPlugins(
  processor: MarkdownProcessor,
): processor is MarkdownProcessor & {
  options: { hastPlugins: RehypePluginEntry[] };
} {
  return (
    processor.name === 'satteri' &&
    isObject(processor.options) &&
    Array.isArray(processor.options.hastPlugins)
  );
}

function hasRehypePlugins(
  processor: MarkdownProcessor,
): processor is MarkdownProcessor & {
  options: { rehypePlugins: RehypePluginEntry[] };
} {
  return (
    processor.name === 'unified' &&
    isObject(processor.options) &&
    Array.isArray(processor.options.rehypePlugins)
  );
}

function treelight(options: AstroTreelightOptions = {}): AstroIntegration {
  return {
    hooks: {
      'astro:config:setup': ({ config, logger, updateConfig }) => {
        const plugin = [rehypeTreelight, options] as const;
        const processor = getProcessor(config.markdown.processor);

        if (processor && hasHastPlugins(processor)) {
          processor.options.hastPlugins.push(plugin);
          updateConfig({
            markdown: {
              syntaxHighlight: false,
            },
          });
          return;
        }

        if (processor && hasRehypePlugins(processor)) {
          processor.options.rehypePlugins.push(plugin);
          updateConfig({
            markdown: {
              syntaxHighlight: false,
            },
          });
          return;
        }

        if (processor) {
          logger.warn(
            '@treelight/astro could not install @treelight/rehype because markdown.processor is not a supported satteri or unified processor. Add @treelight/rehype to your Markdown processor manually.',
          );
          return;
        }

        updateConfig({
          markdown: {
            rehypePlugins: [...(config.markdown.rehypePlugins ?? []), plugin],
            syntaxHighlight: false,
          },
        });
      },
    },
    name: '@treelight/astro',
  };
}

export { treelight };
export default treelight;
