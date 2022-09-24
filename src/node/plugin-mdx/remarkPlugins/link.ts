import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import path from 'path';
import { isProduction } from '../../../node/constants';
import { parseUrl } from '../../../node/utils';

/**
 * Remark plugin to normalize a link href
 */
export const remarkPluginNormalizeLink: Plugin<
  [{ base: string; enableSpa: boolean }]
> =
  ({ base, enableSpa }) =>
  (tree) => {
    visit(
      tree,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node: any) => node.type === 'link',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node: any) => {
        if (node.url.startsWith('http')) {
          return;
        }
        // eslint-disable-next-line prefer-const
        let { url, hash } = parseUrl(node.url);
        const extname = path.extname(url);

        if (extname === '.md' || extname === '.mdx') {
          url = url.replace(extname, '');
        }

        if (isProduction() && !enableSpa && extname !== '.html') {
          url += '.html';
        }
        if (hash) {
          url += `#${hash}`;
        }
        node.url = path.join(base, url);
      }
    );
  };
