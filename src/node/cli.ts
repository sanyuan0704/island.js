import { resolve } from 'path';
import { cac } from 'cac';
import { build } from './build';
import { serve } from './serve';
import { CLIServeOption } from './serve';
import type { UserConfig } from 'vite';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('./../../package.json');

const cli = cac('island').version(version).help();
export interface CLIDevOption extends UserConfig {
  force?: boolean;
  config?: string;
  '--'?: string[];
}
export interface CLIBuildOption extends UserConfig {
  config?: string;
  force?: boolean;
  sourcemap?: boolean | 'inline' | 'hidden';
}
cli.option(
  '--config [config]',
  '[string]explicitly specify a config file to use with the --config CLI option'
);
cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
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
  .action(async (root: string, devOptions: CLIDevOption) => {
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
  .option(
    '--force [force]',
    '[boolean] force the optimizer to ignore the cache and re-bundle'
  )
  .option(
    '--sourcemap',
    '[boolean] output source maps for build (default: false)'
  )
  .action(async (root: string, buildOptions: CLIBuildOption) => {
    try {
      root = resolve(root);
      await build(root, buildOptions);
    } catch (e) {
      console.log(e);
    }
  });

cli
  .command('start [root]', 'serve for production') // default command
  .option('--port <port>', 'port to use for serve')
  .option('--host <host>', '[string] specify hostname')
  .action(async (root: string, serveOptions: CLIServeOption) => {
    try {
      root = resolve(root);
      await serve(root, serveOptions);
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
