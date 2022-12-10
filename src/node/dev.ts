import { createServer } from 'vite';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { createVitePlugins } from './vitePlugins';

export async function createDevServer(
  root: string,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
  return createServer({
    plugins: await createVitePlugins(config, restartServer),
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
