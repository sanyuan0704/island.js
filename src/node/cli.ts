import { resolve } from 'path';
import { cac } from 'cac';
import { build } from './build';
import { serve } from './serve';
import { UserConfig } from 'vite/dist/node/index';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('./../../package.json');

const cli = cac('island').version(version).help();
export interface DevOption extends UserConfig {
  force?: boolean;
  viteConfig?: string;
  '--'?: string[];
}
cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .option(
    '--viteConfig [config]',
    'explicitly specify a config file to use with the --config CLI option'
  )
  .option('--host <host>', '[string] specify hostname')
  .option('-p, --port <port>', '[number] specify port')
  .option('--cacheDir [cacheDir]', '[string] set the directory of cache')
  .option(
    '--force [force]',
    '[boolean] force the optimizer to ignore the cache and re-bundle'
  )
  .option('-m, --mode <mode>', '[string] set env mode')
  .option('-l, --logLevel <level>', '[string] info | warn | error | silent')
  .option('--clearScreen', '[boolean] allow/disable clear screen when logging')
  .option('--https', '[boolean] use TLS + HTTP/2')
  .option('--cors', '[boolean] enable CORS')
  .option('--strictPort', '[boolean] exit if specified port is already in use')
  .option('--open [path]', '[boolean | string] open browser on startup')
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
