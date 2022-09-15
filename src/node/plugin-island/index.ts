import type { Plugin } from 'vite';
import {
  CLIENT_ENTRY_PATH,
  CLIENT_RUNTIME_PATH,
  DEFAULT_HTML_PATH,
  isProduction,
  ROUTE_PATH,
  DEFAULT_THEME_PATH,
  DEFAULT_EXTERNALS,
  TS_REGEX,
  ISLAND_JSX_RUNTIME_PATH,
  PACKAGE_ROOT_PATH,
  CLIENT_EXPORTS_PATH
} from '../constants';
import fs from 'fs-extra';
import { join, relative } from 'path';
import { SiteConfig } from '../../shared/types';
import { transformAsync } from '@babel/core';
import babelPluginIsland from '../babel-plugin-island';
import { transformWithEsbuild } from 'vite';
import pc from 'picocolors';
import { ISLAND_CLI_PATH } from '../constants/index';

const { green } = pc;

export const SITE_DATA_ID = 'island:site-data';

/**
 * The plugin for island framework:
 * 1. Handle module alias
 * 2. Response page data
 * 3. Generate html template for development
 */
export function pluginIsland(
  config: SiteConfig,
  isServer: boolean = false,
  restartServer?: () => Promise<void>
): Plugin[] {
  const { siteData } = config;
  const siteDataPlugin: Plugin = {
    name: 'island:site-data',
    async resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
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
    }
  };
  const internalPlugin: Plugin = {
    name: 'island:vite-plugin-internal',
    enforce: 'pre',
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
    async resolveId(id) {
      if (isProduction() && DEFAULT_EXTERNALS.includes(id)) {
        return {
          id,
          external: true
        };
      }
    },
    async transform(code, id, options) {
      // Note: @vitejs/plugin-react cannot compile files in node_modules, so we need to compile them manually.
      // In production, we should transform the __island props for collecting island components
      if (
        options?.ssr &&
        TS_REGEX.test(id) &&
        id.includes(DEFAULT_THEME_PATH)
      ) {
        let strippedTypes = await transformWithEsbuild(code, id, {
          jsx: 'preserve'
        });
        const result = await transformAsync((await strippedTypes).code, {
          filename: id,
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
                importSource: isServer ? ISLAND_JSX_RUNTIME_PATH : 'react'
              }
            ]
          ],
          plugins: [babelPluginIsland]
        });
        return {
          code: result?.code || code,
          map: result?.map
        };
      }
    },
    transformIndexHtml(html) {
      if (isProduction()) {
        return html;
      }
      // Insert client entry script in development
      // And in production, we will insert it in ssr render
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: 'body'
          }
        ]
      };
    },
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
        await restartServer!();
        return [];
      }

      if (/\.mdx?/.test(ctx.file)) {
        ctx.server.ws!.send({
          type: 'custom',
          event: 'md(x)-changed'
        });
      }
    },
    configureServer(server) {
      if (config.configPath) {
        server.watcher.add(config.configPath);
        config.configDeps?.forEach((dep) => {
          server.watcher.add(dep);
        });
      }
      server.watcher.add(ISLAND_CLI_PATH);
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (res.writableEnded) {
            return next();
          }
          if (req.url?.replace(/\?.*/, '').endsWith('.html')) {
            let html = fs.readFileSync(DEFAULT_HTML_PATH, 'utf8');

            try {
              html = await server.transformIndexHtml(
                req.url,
                html,
                req.originalUrl
              );
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/html');
              res.end(html);
            } catch (e) {
              return next(e);
            }
          }
        });
      };
    }
  };

  return [siteDataPlugin, internalPlugin];
}
