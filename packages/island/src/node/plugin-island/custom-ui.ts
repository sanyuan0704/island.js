import { CUSTOM_GLOBAL_STYLE, CUSTOM_UI_COMPONENTS } from '../constants';
import { Plugin, normalizePath } from 'vite';
import { join } from 'path';
import fs from 'fs-extra';
import { SiteConfig } from 'shared/types';

// 1. custom global style
// 2. custom global components
export function pluginCustomUI(config: SiteConfig): Plugin {
  return {
    name: 'island:custom-ui',
    resolveId(id) {
      if (id === CUSTOM_GLOBAL_STYLE) {
        return `\0${CUSTOM_GLOBAL_STYLE}`;
      }

      if (id === CUSTOM_UI_COMPONENTS) {
        return `\0${CUSTOM_UI_COMPONENTS}`;
      }
    },
    async load(id) {
      if (id === `\0${CUSTOM_GLOBAL_STYLE}`) {
        const stylePath = join(config.root!, '.island', 'styles', 'index.css');
        const styles =
          [stylePath]
            .concat(
              config.plugins?.map((plugin) => plugin.globalStyles || '') || []
            )
            .filter((pluginStylePath) => {
              return pluginStylePath && fs.existsSync(pluginStylePath);
            }) || [];

        return styles
          .map((style) => `import '${normalizePath(style)}';`)
          .join('\n');
      }
      // TODO: support island component in global ui component
      // if (id === `\0${CUSTOM_UI_COMPONENTS}`) {
      //   const components = config.plugins
      //     ?.map((plugin) => plugin.globalUIComponents)
      //     .flat()
      //     .filter(Boolean);
      //   const code = `${components
      //     ?.map(
      //       (component, index) => `import Comp_${index} from '${component}';`
      //     )
      //     .join('\n')}
      //     export default [
      //       ${
      //         components
      //           ? components.map((_, index) => `Comp_${index}`).join(',')
      //           : ''
      //       }
      //     ]
      //   `;
      //   return code;
      // }
    }
  };
}
