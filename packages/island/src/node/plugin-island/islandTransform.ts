import { ISLAND_JSX_RUNTIME_PATH, TS_REGEX } from '../constants';
import { Plugin, transformWithEsbuild } from 'vite';
import { transformAsync } from '@babel/core';
import babelPluginIsland from '../babel-plugin-island';
import { SiteConfig } from 'shared/types/index';
import { MD_REGEX } from '../constants/index';

export function pluginIslandTransform(
  config: SiteConfig,
  isServer: boolean
): Plugin {
  return {
    name: 'island:vite-plugin-internal',
    async transform(code, id, options) {
      // Note: @vitejs/plugin-react cannot compile files in node_modules, so we need to compile them manually.
      // In production, we should transform the __island props for collecting island components
      if (
        options?.ssr &&
        (TS_REGEX.test(id) || MD_REGEX.test(id)) &&
        !config.enableSpa
      ) {
        const strippedTypes = await transformWithEsbuild(code, id, {
          jsx: 'preserve',
          loader: 'tsx'
        });

        const result = await transformAsync((await strippedTypes).code, {
          filename: id,
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
                importSource: isServer ? ISLAND_JSX_RUNTIME_PATH : 'react'
              }
            ],
            ...(config.babel?.presets || [])
          ],
          plugins: [babelPluginIsland, ...(config.babel?.plugins || [])]
        });
        return {
          code: result?.code || code,
          map: result?.map
        };
      }
    }
  };
}
