import {
  CLIENT_EXPORTS_PATH,
  CLIENT_RUNTIME_PATH,
  DEFAULT_EXTERNALS,
  DEFAULT_THEME_PATH,
  ISLAND_CLI_PATH,
  ISLAND_JSX_RUNTIME_PATH,
  isProduction,
  PUBLIC_DIR,
  ROUTE_PATH,
  SHARED_PATH
} from '../constants';
import { Plugin, UserConfig } from 'vite';
import { SiteConfig } from 'shared/types/index';
import { join, relative } from 'path';
import pc from 'picocolors';
import { mergeConfig } from 'vite';
import { PACKAGE_ROOT_PATH } from '../constants/index';
import sirv from 'sirv';
import path from 'path';
import fs from 'fs-extra';

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
      return mergeConfig(
        {
          root: PACKAGE_ROOT_PATH,
          esbuild: {
            jsx: 'preserve'
          },
          optimizeDeps: {
            include: [
              'react',
              'react-dom',
              'react-dom/client',
              'react-router-dom',
              'react/jsx-runtime',
              'react-helmet-async',
              'lodash-es',
              'copy-to-clipboard',
              'flexsearch'
            ],
            exclude: [
              'islandjs',
              '@theme',
              '@client',
              'island/routes',
              'island/jsx-runtime'
            ]
          },
          server: {
            fs: {
              allow: [
                CLIENT_RUNTIME_PATH,
                DEFAULT_THEME_PATH,
                SHARED_PATH,
                process.cwd()
              ]
            }
          },
          resolve: {
            alias: {
              '@theme': config.themeDir!,
              '@client': `${CLIENT_EXPORTS_PATH}`,
              'island/jsx-runtime': join(
                ISLAND_JSX_RUNTIME_PATH,
                'jsx-runtime.js'
              ),
              '@theme-default': DEFAULT_THEME_PATH
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
        } as UserConfig,
        config.vite || {}
      );
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
    },
    configureServer(server) {
      // Serve public dir
      // Cause by the pre-bundle problem, we have to set the island package as the root dir
      // So we need to serve the public dir in user's root dir manually

      const publicDir = path.join(config.root, PUBLIC_DIR);
      if (fs.pathExistsSync(publicDir)) {
        server.middlewares.use(sirv(publicDir));
      }
      server.middlewares.use(sirv(config.root));
    }
  };
}
