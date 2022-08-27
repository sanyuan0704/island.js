import { cac } from 'cac';
import { build } from './build';
import { createDevServer } from './dev';
import { resolve } from 'path';

const cli = cac('island').version('0.0.0').help();

cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .action(async (root: string) => {
    try {
      const server = await createDevServer(root);
      await server.listen();
      console.log();
      server.printUrls();
    } catch (e) {
      console.log(e);
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

cli.parse();
