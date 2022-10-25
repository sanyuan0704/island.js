import { createServer as createViteDevServer } from 'vite';
import { DevOption } from './cli';
import { resolveConfig } from './config';
import { createIslandPlugins } from './plugin';
function cleanOptions(options: DevOption) {
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
  options: DevOption,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(
    root,
    'serve',
    'development',
    options.config
  );
  return createViteDevServer({
    root,
    base: '/',
    optimizeDeps: { force: options.force },
    cacheDir: options.cacheDir,
    logLevel: options.logLevel,
    clearScreen: options.clearScreen,
    server: cleanOptions(options),
    plugins: [await createIslandPlugins(config, false, restartServer)]
  });
}
