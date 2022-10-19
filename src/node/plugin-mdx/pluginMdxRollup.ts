import pluginMdx from '@mdx-js/rollup';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';
import remarkPluginGFM from 'remark-gfm';
import remarkPluginFrontMatter from 'remark-frontmatter';
import remarkDirective from 'remark-directive';
import { remarkCheckDeadLinks } from './remarkPlugins/deadLinks';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import remarkGemoji from 'remark-gemoji';
import { remarkPluginNormalizeLink } from './remarkPlugins/link';
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import rehypePluginExternalLinks, { Element } from 'rehype-external-links';
import { remarkPluginToc } from './remarkPlugins/toc';
import { remarkPluginTip } from './remarkPlugins/tip';
import shiki from 'shiki';
import { rehypePluginShiki } from './rehypePlugins/shiki';
import { rehypePluginLineNumbers } from './rehypePlugins/lineNumbers';
import { SiteConfig } from 'shared/types/index';
import { Plugin } from 'vite';
import { TARGET_BLANK_WHITE_LIST } from '../../shared/constants';

export async function pluginMdxRollup(
  config: SiteConfig,
  isServer: boolean
): Promise<Plugin> {
  return pluginMdx({
    // We should reserve the jsx in ssr build
    // to ensure the island components can be collected by `babel-plugin-island`
    jsx: isServer && !config.enableSpa,
    remarkPlugins: [
      remarkPluginGFM,
      // The following two plugin for frontmatter
      remarkPluginFrontMatter,
      [remarkPluginMDXFrontMatter, { name: 'frontmatter' }],
      remarkGemoji,
      remarkPluginToc,
      remarkDirective,
      remarkPluginTip,
      [remarkCheckDeadLinks, { checkLink: config.markdown?.checkLink }],
      [
        remarkPluginNormalizeLink,
        { base: config.base || '/', enableSpa: config.enableSpa }
      ],
      ...(config.markdown?.remarkPlugins || [])
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
          target: (node: Element) => {
            const href = node.properties?.href;
            if (typeof href === 'string') {
              const inWhiteList = TARGET_BLANK_WHITE_LIST.some((item) =>
                href.startsWith(item)
              );
              return inWhiteList ? '_self' : '_blank';
            }
          }
        }
      ],
      [
        rehypePluginShiki,
        {
          highlighter: await shiki.getHighlighter({ theme: 'nord' })
        }
      ],
      rehypePluginPreWrapper,
      ...(config.markdown?.lineNumbers ? [rehypePluginLineNumbers] : []),
      ...(config.markdown?.rehypePlugins || [])
    ]
  }) as Plugin;
}
