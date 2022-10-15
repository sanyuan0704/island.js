import { CUSTOM_GLOBAL_STYLE } from '../../node/constants';
import { Plugin } from 'vite';
import { join } from 'path';
import { pathExists } from 'fs-extra';
import { SiteConfig } from 'shared/types';

export function pluginCustomStyle(config: SiteConfig): Plugin {
  return {
    name: 'island:custom-style',
    resolveId(id) {
      if (id === CUSTOM_GLOBAL_STYLE) {
        return `\0${CUSTOM_GLOBAL_STYLE}`;
      }
    },
    async load(id) {
      const stylePath = join(config.root!, '.island', 'styles', 'index.css');
      const styleExists = await pathExists(stylePath);

      if (id === `\0${CUSTOM_GLOBAL_STYLE}`) {
        return styleExists ? `import '${stylePath}';` : '';
      }
    }
  };
}
