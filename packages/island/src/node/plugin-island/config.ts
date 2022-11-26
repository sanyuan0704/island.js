import {
  CLIENT_EXPORTS_PATH,
  CLIENT_RUNTIME_PATH,
  DEFAULT_EXTERNALS,
  DEFAULT_THEME_PATH,
  ISLAND_CLI_PATH,
  ISLAND_JSX_RUNTIME_PATH,
  isProduction,
  PUBLIC_DIR,
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
  const getComposedPluginConfig = (key: 'alias' | 'define' | 'vite') => {
    return config.plugins
      ?.map((plugin) => plugin[key])
      .filter(Boolean)
      .reduce((acc, cur) => {
        return mergeConfig(acc as UserConfig, cur as UserConfig);
      }, {});
  };
  const pluginAlias = getComposedPluginConfig('alias');
  const pluginDefine = getComposedPluginConfig('define');
  const pluginViteConfig = getComposedPluginConfig('vite');
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
    config() {
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
              'medium-zoom',
              'body-scroll-lock'
            ],
            exclude: [
              'islandjs',
              '@theme',
              '@runtime',
              '@shared',
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
              '@runtime': `${CLIENT_EXPORTS_PATH}`,
              '@shared': `${SHARED_PATH}`,
              'island/jsx-runtime': join(
                ISLAND_JSX_RUNTIME_PATH,
                'jsx-runtime.js'
              ),
              '@theme-default': DEFAULT_THEME_PATH,
              ...pluginAlias
            }
          },
          define: {
            'import.meta.env.ENABLE_SPA': config.enableSpa,
            ...pluginDefine
          },
          css: {
            modules: {
              localsConvention: 'camelCaseOnly'
            }
          }
        } as UserConfig,
        mergeConfig(config.vite ?? {}, pluginViteConfig ?? {})
      );
    },
    // Restart when config file changes
    async handleHotUpdate(ctx) {
      const watchFilesFromPlugins = config.plugins
        ?.map((plugin) => plugin.watchFiles)
        .flat() as string[];
      const customWatchedFiles = [
        ISLAND_CLI_PATH,
        config.configPath,
        ...(config.configDeps || []),
        ...(watchFilesFromPlugins || [])
      ].filter(Boolean) as string[];
      const include = (id: string) => {
        return customWatchedFiles.some((file) => id.includes(file));
      };
      if (include(ctx.file)) {
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
