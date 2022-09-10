import { RollupOutput } from 'rollup';
import { build, InlineConfig } from 'vite';
import {
  CLIENT_ENTRY_PATH,
  DIST_PATH,
  SERVER_ENTRY_PATH,
  TEMP_PATH
} from '../constants';
import { createIslandPlugins } from '../plugin';
import { dynamicImport } from '../utils';
import { join } from 'path';
import { copy } from 'fs-extra';
import { resolveConfig } from '../config';

export const okMark = '\x1b[32m✓\x1b[0m';
export const failMark = '\x1b[31m✖\x1b[0m';

export type Builder = (
  isServer: boolean,
  options: InlineConfig
) => Promise<RollupOutput>;

export async function createBuilder(root: string): Promise<Builder> {
  const config = await resolveConfig(root, 'build', 'production');

  return function (isServer: boolean, options: InlineConfig = {}) {
    const resolveViteConfig = (isServer: boolean): InlineConfig => ({
      ...options,
      mode: 'production',
      root,
      plugins: [
        createIslandPlugins(config, isServer),
        ...(options?.plugins || [])
      ],
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
        },
        ...options?.build
      }
    });
    return build(resolveViteConfig(isServer)) as Promise<RollupOutput>;
  };
}

export async function bundle(root: string) {
  // `ora` is a pure esm package.
  const { default: ora } = await dynamicImport('ora');
  const spinner = ora();
  const builder = await createBuilder(root);
  spinner.start('Building client + server bundles...');
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      builder(false, {}),
      // server build
      builder(true, {})
    ]);
    spinner.stopAndPersist({
      symbol: okMark
    });
    await copy(
      join(root, TEMP_PATH, 'ssr', 'assets'),
      join(root, DIST_PATH, 'assets')
    );
    return [clientBundle, serverBundle, builder] as [
      RollupOutput,
      RollupOutput,
      Builder
    ];
  } catch (e) {
    spinner.stopAndPersist({
      symbol: failMark
    });
  }
}
