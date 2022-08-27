import { Plugin } from 'vite';
import { CLIENT_ENTRY_PATH, THEME_PATH } from './constants';
import reactPlugin from '@vitejs/plugin-react';

export function createIslandPlugins() {
  const islandPlugin: Plugin = {
    name: 'internal:vite-plugin-island',
    config(config, env) {
      return {
        resolve: {
          alias: {
            '/@island/theme': `/@fs/${THEME_PATH}`
          }
        }
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith('.html')) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(`
          <!DOCTYPE html>
          <html>
            <head>
              <title></title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width,initial-scale=1">
              <meta name="description" content="">
            </head>
            <body>
              <div id="root"></div>
              <script type="module" src="/@fs/${CLIENT_ENTRY_PATH}"></script>
            </body>
          </html>`);
            return;
          }

          next();
        });
      };
    }
  };
  const reactImportPlugin: Plugin = {
    name: 'internal:react-import',
    transform(code, id) {
      if (id.endsWith('.jsx') || id.endsWith('.tsx')) {
        return `import React from 'react';\n${code}`;
      }
    }
  };
  return [islandPlugin];
}
