import { MD_REGEX } from '../../node/constants';
import { Plugin } from 'vite';
import { SiteConfig } from 'shared/types/index';
import { getGitTimestamp } from '../utils';

export function pluginMdxLastUpdated(config: SiteConfig): Plugin {
  return {
    name: 'vite-plugin-mdx-last-updated',
    async transform(code, id) {
      if (MD_REGEX.test(id)) {
        const lastUpdatedTimeStamp = await getGitTimestamp(id);
        const appendCode = `export const lastUpdatedTimeStamp = ${lastUpdatedTimeStamp};`;
        return `
          ${code}
          ${appendCode}
      `;
      }
      return code;
    }
  };
}
