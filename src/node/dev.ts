import { createServer as createViteDevServer, Plugin } from 'vite';
import { CLIENT_APP_PATH, THEME_PATH } from './constants';

export async function createDevServer(root = process.cwd()) {
  const islandPlugin: Plugin = {
    name: 'internal:vite-plugin-island',
    config(config, env) {
      return {
        resolve: {
          alias: {
            '/@island/theme': THEME_PATH
          }
        }
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
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
    <script type="module" src="/@fs/${CLIENT_APP_PATH}"></script>
  </body>
</html>`);
          next();
        });
      };
    }
  };
  return createViteDevServer({
    root,
    base: '/',
    plugins: [islandPlugin]
  });
}
