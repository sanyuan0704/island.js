import { cac } from 'cac';
import { createDevServer } from './dev';

const cli = cac('island').version('0.0.0').help();

cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .allowUnknownOptions()
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

cli.parse();
