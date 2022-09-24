import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import path from 'path';
import { isProduction } from '../../../node/constants';

/**
 * Remark plugin to normalize a link href
 */
export const remarkPluginNormalizeLink: Plugin<[{ base: string }]> =
  ({ base }) =>
  (tree) => {
    visit(
      tree,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node: any) => node.type === 'a',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node: any) => {
        let url: string = node.url;
        const extname = path.extname(url);

        if (extname === '.md' || extname === '.mdx') {
          url = url.replace(extname, '');
        }

        if (
          isProduction() &&
          !import.meta.env.ENABLE_SPA &&
          extname !== '.html'
        ) {
          url += '.html';
        }

        node.url = path.join(base, url);
      }
    );
  };
