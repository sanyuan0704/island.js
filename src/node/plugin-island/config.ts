import {
  CLIENT_EXPORTS_PATH,
  CLIENT_RUNTIME_PATH,
  DEFAULT_EXTERNALS,
  DEFAULT_THEME_PATH,
  ISLAND_CLI_PATH,
  ISLAND_JSX_RUNTIME_PATH,
  isProduction,
  ROUTE_PATH
} from '../constants';
import { Plugin } from 'vite';
import { SiteConfig } from 'shared/types/index';
import { join, relative } from 'path';
import pc from 'picocolors';

const { green } = pc;

export function pluginConfig(
  config: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin {
  return {
    name: 'island:vite-config',
    enforce: 'pre',
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
        optimizeDeps: {
          include: [
            'react',
            'react-dom',
            'react-dom/client',
            'react-router-dom',
            'react/jsx-runtime',
            'react-helmet-async',
            'lodash-es'
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
            'island/client': `${CLIENT_EXPORTS_PATH}`,
            'island/routes': join(c.root!, ROUTE_PATH),
            'island/jsx-runtime': join(
              ISLAND_JSX_RUNTIME_PATH,
              'jsx-runtime.js'
            ),
            'island/theme-default': DEFAULT_THEME_PATH
          }
        },
        define: {
          'import.meta.env.ENABLE_SPA': config.enableSpa
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
        ISLAND_CLI_PATH,
        config.configPath,
        ...(config.configDeps || [])
      ];
      if (customWatchedFiles.includes(ctx.file)) {
        console.log(
          green(
            `\n${relative(config.root, ctx.file)} changed, restarting server...`
          )
        );
        // `restartServer` always exist in current plugin hook
        await restartServer!();
        return [];
      }
    }
  };
}
