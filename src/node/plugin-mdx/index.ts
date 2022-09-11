import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';
import remarkPluginGFM from 'remark-gfm';
import remarkPluginFrontMatter from 'remark-frontmatter';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import rehypePluginExternalLinks from 'rehype-external-links';
import type { Options } from '@mdx-js/rollup';
import { remarkPluginToc } from './remarkPlugins/toc';
import rehypeShiki from '@leafac/rehype-shiki';
import shiki from 'shiki';
import { rehypePluginShiki } from './rehypePlugins/shiki';

export async function createMDXOptions(): Promise<Options> {
  return {
    remarkPlugins: [
      remarkPluginGFM,
      // The following two plugin for frontmatter
      remarkPluginFrontMatter,
      remarkPluginMDXFrontMatter,
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
          highlighter: await shiki.getHighlighter({ theme: 'github-dark' })
        }
      ],
      rehypePluginPreWrapper
    ]
  };
}
