import { createServer as createViteDevServer } from 'vite';
import { CLIDevOption } from './cli';
import { resolveConfig } from './config';
import { createVitePlugins } from './vitePlugin';

function cleanOptions(options: CLIDevOption) {
  const option = { ...options };
  delete option['--'];
  delete option.cacheDir;
  delete option.force;
  delete option.logLevel;
  delete option.clearScreen;
  delete option.config;
  return option;
}
export async function createDevServer(
  root = process.cwd(),
  cliOptions: CLIDevOption,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(
    root,
    'serve',
    'development',
    cliOptions.config
  );
  return createViteDevServer({
    root,
    base: '/',
    optimizeDeps: { force: cliOptions.force },
    cacheDir: cliOptions.cacheDir,
    logLevel: cliOptions.logLevel,
    clearScreen: cliOptions.clearScreen,
    server: cleanOptions(cliOptions),
    plugins: [await createVitePlugins(config, false, restartServer)]
  });
}
