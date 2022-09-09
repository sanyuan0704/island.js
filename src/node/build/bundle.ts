import { RollupOutput } from 'rollup';
import { build, InlineConfig } from 'vite';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH, TEMP_PATH } from '../constants';
import { createIslandPlugins } from '../plugin';
import { dynamicImport } from '../utils';
import { join } from 'path';
import { copy } from 'fs-extra';
import { resolveConfig } from '../config';

export const okMark = '\x1b[32m✓\x1b[0m';
export const failMark = '\x1b[31m✖\x1b[0m';

export async function bundle(root: string) {
  const config = await resolveConfig(root, 'build', 'production');
  const resolveViteConfig = async (
    isServer: boolean
  ): Promise<InlineConfig> => ({
    mode: 'production',
    root,
    plugins: [createIslandPlugins(config)],
    esbuild: {
      // Reserve island component name
      minifyIdentifiers: !isServer
    },
    build: {
      ssr: isServer,
      outDir: isServer ? join(TEMP_PATH, 'ssr') : 'dist',
      cssCodeSplit: false,
      ssrManifest: !isServer,
      rollupOptions: {
        output: {
          entryFileNames: isServer ? '[name].mjs' : undefined
        },
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH
      }
    }
  });
  // `ora` is a pure esm package.
  const { default: ora } = await dynamicImport('ora');
  const spinner = ora();
  spinner.start('Building client + server bundles...');
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      build(await resolveViteConfig(false)),
      // server build
      build(await resolveViteConfig(true))
    ]);
    spinner.stopAndPersist({
      symbol: okMark
    });
    await copy(
      join(root, TEMP_PATH, 'ssr', 'assets'),
      join(root, 'dist', 'assets')
    );
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    spinner.stopAndPersist({
      symbol: failMark
    });
  }
}
