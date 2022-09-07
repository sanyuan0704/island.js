import type { PluginOption } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import { pluginSvgr } from './plugin-svgr';
import { pluginIsland } from './plugin-island';
import { pluginRoutes } from './plugin-routes';
import pluginInspect from 'vite-plugin-inspect';
import { SiteConfig } from '../shared/types';
import { dynamicImport } from './utils';
import { rehypePluginPreWrapper } from './plugin-mdx/rehypePlugins/preWrapper';

export async function createIslandPlugins(
  config: SiteConfig
): Promise<PluginOption[]> {
  // Import pure esm package
  const { default: pluginMdx } = await dynamicImport('@mdx-js/rollup');
  const { default: remarkPluginGFM } = await dynamicImport('remark-gfm');
  const { default: rehypePluginSlug } = await dynamicImport('rehype-slug');
  const { default: rehypePluginAutolinkHeadings } = await dynamicImport(
    'rehype-autolink-headings'
  );
  const { default: rehypePluginExternalLinks } = await dynamicImport(
    'rehype-external-links'
  );
  return [
    // For island internal use
    pluginIsland(config),
    // React hmr support
    pluginReact({
      jsxRuntime: 'classic',
      babel: {
        // plugins: ['@loadable/babel-plugin']
      }
    }),
    // Svg component support
    pluginSvgr(),
    // Md(x) compile
    // @ts-ignore
    pluginMdx({
      remarkPlugins: [remarkPluginGFM],
      rehypePlugins: [
        rehypePluginSlug,
        [
          rehypePluginAutolinkHeadings,
          {
            properties: {
              class: 'header-anchor',
              ariaHidden: 'true'
            },
            content: {
              type: 'text',
              value: '#'
            }
          }
        ],
        [
          // Open new window then click external link
          rehypePluginExternalLinks,
          {
            target: '_blank'
          }
        ],
        rehypePluginPreWrapper
      ]
    }),
    // Conventional Route
    pluginRoutes({ prefix: '' }),
    // Inspect transformation
    pluginInspect({})
  ];
}
