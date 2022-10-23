import { createServer as createViteDevServer } from 'vite';
import { DevOption } from './cli';
import { resolveConfig } from './config';
import { createIslandPlugins } from './plugin';

function cleanOptions(options: DevOption) {
  const ret = { ...options };
  delete ret['--'];
  delete ret.cacheDir;
  delete ret.force;
  delete ret.logLevel;
  delete ret.clearScreen;
  return ret;
}

export async function createDevServer(
  root = process.cwd(),
  options: DevOption,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
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
