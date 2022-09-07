import { createServer as createViteDevServer } from 'vite';
import { resolveConfig } from './config';
import { createIslandPlugins } from './plugin';

export async function createDevServer(root = process.cwd()) {
  const config = await resolveConfig(root, 'serve', 'development');
  return createViteDevServer({
    root,
    base: '/',
    plugins: [await createIslandPlugins(config)]
  });
}
