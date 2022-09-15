import {
  DEFAULT_THEME_PATH,
  ISLAND_JSX_RUNTIME_PATH,
  TS_REGEX
} from '../constants';
import { Plugin, transformWithEsbuild } from 'vite';
import { transformAsync } from '@babel/core';
import babelPluginIsland from '../babel-plugin-island';

export function pluginIslandTransform(isServer: boolean): Plugin {
  return {
    name: 'island:vite-plugin-internal',
    enforce: 'pre',
    async transform(code, id, options) {
      // Note: @vitejs/plugin-react cannot compile files in node_modules, so we need to compile them manually.
      // In production, we should transform the __island props for collecting island components
      if (
        options?.ssr &&
        TS_REGEX.test(id) &&
        id.includes(DEFAULT_THEME_PATH)
      ) {
        let strippedTypes = await transformWithEsbuild(code, id, {
          jsx: 'preserve'
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
            ]
          ],
          plugins: [babelPluginIsland]
        });
        return {
          code: result?.code || code,
          map: result?.map
        };
      }
    }
  };
}
