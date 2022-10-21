import { resolve } from 'path';
import { cac } from 'cac';
import { build } from './build';
import { serve } from './serve';
import { UserConfig } from 'vite/dist/node/index';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('./../../package.json');

const cli = cac('island').version(version).help();
export interface DevOption extends UserConfig {
  c?: string;
  force?: boolean;
  '--'?: string[];
}
cli.option(
  '--clearScreen',
  '[boolean] allow/disable clear screen when logging'
);
cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .option('--host <host>', 'SpecifyIP addresses for the server')
  .option('-p, --port <port>', 'use specified port (default: 8080)')
  .option('-c, --cacheDir [cacheDir]', 'set the directory of cache')
  .option('-o,--open', 'open browser when ready')
  .option('--force [force]', 'clean the cache before build')
  .action(async (root: string, devOptions: DevOption) => {
    try {
      root = resolve(root);
      const createServer = async () => {
        const { createDevServer } = await import(`./dev.js?t=${Date.now()}`);
        const server = await createDevServer(root, devOptions, async () => {
          await server.close();
          await createServer();
        });
        await server.listen();
        server.printUrls();
      };
      await createServer();
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  });

cli
  .command('build [root]', 'build for production') // default command
  .action(async (root: string) => {
    try {
      root = resolve(root);
      await build(root);
    } catch (e) {
      console.log(e);
    }
  });

cli
  .command('start [root]', 'serve for production') // default command
  .option('--port <port>', 'port to use for serve')
  .action(async (root: string, { port }: { port: number }) => {
    try {
      root = resolve(root);
      await serve(root, port);
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
