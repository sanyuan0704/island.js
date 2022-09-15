import {
  CLIENT_EXPORTS_PATH,
  CLIENT_RUNTIME_PATH,
  DEFAULT_EXTERNALS,
  DEFAULT_THEME_PATH,
  ISLAND_CLI_PATH,
  ISLAND_JSX_RUNTIME_PATH,
  isProduction,
  PACKAGE_ROOT_PATH,
  ROUTE_PATH
} from '../constants';
import { Plugin } from 'vite';
import { SiteConfig } from 'shared/types/index';
import { join, relative } from 'path';
import pc from 'picocolors';

const { green } = pc;

export function pluginConfig(config: SiteConfig): Plugin {
  return {
    name: 'island:vite-config',
    // Set external
    async resolveId(id) {
      if (isProduction() && DEFAULT_EXTERNALS.includes(id)) {
        return {
          id,
          external: true
        };
      }
    },
    config(c) {
      return {
        root: PACKAGE_ROOT_PATH,
        optimizeDeps: {
          include: [
            'react',
            'react-dom',
            'react-dom/client',
            'react/jsx-runtime',
            '@loadable/component'
          ],
          exclude: [
            'island-ssg',
            'island/theme',
            'island/client',
            'island/routes',
            'island/jsx-runtime'
          ]
        },
        server: {
          fs: {
            allow: [CLIENT_RUNTIME_PATH, DEFAULT_THEME_PATH, process.cwd()]
          }
        },
        resolve: {
          alias: {
            'island/theme': config.themeDir!,
            'island/client': `/@fs/${CLIENT_EXPORTS_PATH}`,
            'island/routes': join(c.root!, ROUTE_PATH),
            'island/jsx-runtime': join(
              ISLAND_JSX_RUNTIME_PATH,
              'jsx-runtime.js'
            )
          }
        },
        css: {
          modules: {
            localsConvention: 'camelCaseOnly'
          }
        }
      };
    },
    // Restart when config file changes
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [
        ...(config.configDeps || []),
        config.configPath,
        ISLAND_CLI_PATH
      ];
      if (customWatchedFiles.includes(ctx.file)) {
        console.log(
          green(
            `\n${relative(config.root, ctx.file)} changed, restarting server...`
          )
        );
        return [];
      }
    }
  };
}
