import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { routeService } from '../../plugin-routes';
import checkLinks from 'check-links';

/**
 * Remark plugin to normalize a link href
 */
export const remarkCheckDeadLinks: Plugin = () => {
  return (tree) => {
    const externalLinks: string[] = [];
    const internalLinks: string[] = [];

    visit(tree, 'link', (node: any) => {
      const url = node.url;
      if (!url) return;
      if (internalLinks.includes(url) || externalLinks.includes(url)) return;

      if (!url.startsWith('http') && !url.startsWith('https')) {
        internalLinks.push(url);
        return;
      }

      // skip local links
      if (/^(http?:\/\/)(localhost|127\.0\.0\.1)(:\d+)?/.test(url)) {
        return;
      }
      externalLinks.push(url);
    });

    internalLinks.map((link) => {
      !routeService.isExistRoute(link) &&
        console.log(`Internal link to ${link} is dead`);
    });

    checkLinks(externalLinks, { timeout: 1000 }).then((results: any) => {
      Object.keys(results).forEach((url) => {
        const result = results[url];
        if (result.status !== 'dead') return;
        if (!externalLinks.includes(url)) return;

        console.log(`External link to ${url} is dead`);
      });
    });
  };
};
