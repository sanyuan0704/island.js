import { DEFAULT_EXTERNALS, isProduction } from '../constants';
import { SiteConfig } from 'shared/types';
import { Plugin } from 'vite';

export const SITE_DATA_ID = 'island:site-data';

export const BASE_URL = 'island:base';

export function pluginSiteData(config: SiteConfig): Plugin {
  const { siteData } = config;
  return {
    name: 'island:site-data',
    async resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
      if (id === BASE_URL) {
        return '\0' + BASE_URL;
      }
      if (isProduction() && DEFAULT_EXTERNALS.includes(id)) {
        return {
          id,
          external: true
        };
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(siteData)}`;
      }
      if (id === '\0' + BASE_URL) {
        return `export default ${JSON.stringify(siteData?.base || '/')}`;
      }
    }
  };
}
