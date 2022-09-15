import {
  CLIENT_ENTRY_PATH,
  DEFAULT_HTML_PATH,
  ISLAND_CLI_PATH
} from '../constants';
import { SiteConfig } from 'shared/types/index';
import { Plugin } from 'vite';
import fs from 'fs-extra';

export function pluginIndexHtml(config: SiteConfig): Plugin {
  return {
    name: 'island:index-html',
    apply: 'serve',
    transformIndexHtml(html) {
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
}
