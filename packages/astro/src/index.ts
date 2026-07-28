import rehypeTreelight, {
  type RehypeTreelightOptions,
} from '@treelight/rehype';
import type { AstroIntegration } from 'astro';

export type AstroTreelightOptions = RehypeTreelightOptions;

function treelight(options: AstroTreelightOptions = {}): AstroIntegration {
  return {
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            rehypePlugins: [[rehypeTreelight, options]],
          },
        });
      },
    },
    name: '@treelight/astro',
  };
}

export { treelight };
export default treelight;
