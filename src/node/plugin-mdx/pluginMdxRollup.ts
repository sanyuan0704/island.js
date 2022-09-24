import pluginMdx from '@mdx-js/rollup';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';
import remarkPluginGFM from 'remark-gfm';
import remarkPluginFrontMatter from 'remark-frontmatter';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import rehypePluginExternalLinks from 'rehype-external-links';
import { remarkPluginToc } from './remarkPlugins/toc';
import shiki from 'shiki';
import { rehypePluginShiki } from './rehypePlugins/shiki';
import { SiteConfig } from 'shared/types/index';
import { Plugin } from 'vite';

export async function pluginMdxRollup(
  _config: SiteConfig,
  isServer: boolean
): Promise<Plugin> {
  return pluginMdx({
    // We should reserve the jsx in ssr build
    // to ensure the island components can be collected by `babel-plugin-island`
    jsx: isServer,
    remarkPlugins: [
      remarkPluginGFM,
      // The following two plugin for frontmatter
      remarkPluginFrontMatter,
      [remarkPluginMDXFrontMatter, { name: 'meta' }],
      remarkPluginToc
    ],
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
      [
        rehypePluginShiki,
        {
          highlighter: await shiki.getHighlighter({ theme: 'nord' })
        }
      ],
      rehypePluginPreWrapper
    ]
  }) as Plugin;
}
