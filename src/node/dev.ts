import { createServer as createViteDevServer } from 'vite';
import { createIslandPlugins } from './plugin';

export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    base: '/',
    plugins: [createIslandPlugins()]
  });
}
