import type { Plugin } from 'vite';
import {
  CLIENT_ENTRY_PATH,
  CLIENT_PATH,
  DEFAULT_HTML_PATH,
  isProduction,
  ROUTE_PATH,
  DEFAULT_THEME_PATH,
  DEFAULT_EXTERNALS,
  TS_REGEX
} from '../constants';
import fs from 'fs-extra';
import { join } from 'path';
import { SiteConfig } from '../../shared/types';
import { transformAsync } from '@babel/core';
import babelPluginIsland from '../babel-plugin-island';
import { transformWithEsbuild } from 'vite';

export const PAGE_DATA_ID = 'island:page-data';

/**
 * The plugin for island framework:
 * 1. Handle module alias
 * 2. Response page data
 * 3. Generate html template for development
 */
export function pluginIsland(
  config: SiteConfig,
  _isServer: boolean = false
): Plugin {
  const { pageData } = config;
  return {
    name: 'island:vite-plugin-internal',
    enforce: 'pre',
    config(c) {
      return {
        resolve: {
          alias: {
            'island/theme': `/@fs/${DEFAULT_THEME_PATH}`,
            'island/client': `/@fs/${CLIENT_PATH}`,
            'island/routes': join(c.root!, ROUTE_PATH)
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
      if (id === PAGE_DATA_ID) {
        return '\0' + PAGE_DATA_ID;
      }
      if (isProduction() && DEFAULT_EXTERNALS.includes(id)) {
        return {
          id,
          external: true
        };
      }
    },
    load(id) {
      if (id === '\0' + PAGE_DATA_ID) {
        return `export default ${JSON.stringify(pageData)}`;
      }
    },
    async transform(code, id) {
      // In production, we should transform the __island props for collecting island components
      if (
        isProduction() &&
        TS_REGEX.test(id) &&
        id.includes(DEFAULT_THEME_PATH)
      ) {
        let strippedTypes = await transformWithEsbuild(code, id, {
          jsx: 'preserve'
        });
        const result = await transformAsync((await strippedTypes).code, {
          filename: id,
          presets: ['@babel/preset-react'],
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
    configureServer(server) {
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
    },
    banner: 'import React from "react";'
  };
}
