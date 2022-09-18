import type { PluginOption } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import { pluginSvgr } from './plugin-svgr';
import { pluginIsland } from './plugin-island';
import { pluginRoutes } from './plugin-routes';
import { SiteConfig } from '../shared/types';
import { pluginMdx } from './plugin-mdx';
import babelPluginIsland from './babel-plugin-island';
import { ISLAND_JSX_RUNTIME_PATH } from './constants/index';
import pluginInspect from 'vite-plugin-inspect';

export async function createIslandPlugins(
  config: SiteConfig,
  isServer = false,
  restartServer?: () => Promise<void>
): Promise<PluginOption[]> {
  return [
    // pluginInspect({}),

    // For island internal use
    pluginIsland(config, isServer, restartServer),
    // React hmr support
    pluginReact({
      jsxRuntime: 'automatic',
      jsxImportSource:
        isServer && !config.enableSpa ? ISLAND_JSX_RUNTIME_PATH : 'react',
      babel: {
        // Babel plugin for island(mpa) mode
        plugins: [...(config.enableSpa ? [] : [babelPluginIsland])]
      }
    }),
    // Svg component support
    pluginSvgr(),
    // Md(x) compile
    await pluginMdx(config),
    // Conventional Route
    pluginRoutes({ prefix: '', root: config.root })
  ];
}
