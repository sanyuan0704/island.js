import type { PluginOption } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import { pluginSvgr } from './plugin-svgr';
import { pluginIsland } from './plugin-island';
import { pluginRoutes } from './plugin-routes';
import { SiteConfig } from '../shared/types';
import { createMDXOptions, pluginMdx } from './plugin-mdx';
import babelPluginIsland from './babel-plugin-island';
import { ISLAND_JSX_RUNTIME_PATH } from './constants/index';

export async function createIslandPlugins(
  config: SiteConfig,
  isServer: boolean = false,
  restartServer?: () => Promise<void>
): Promise<PluginOption[]> {
  const mdxOptions = await createMDXOptions();
  return [
    // For island internal use
    pluginIsland(config, isServer, restartServer),
    // React hmr support
    pluginReact({
      jsxRuntime: 'automatic',
      jsxImportSource: isServer ? ISLAND_JSX_RUNTIME_PATH : 'react',
      babel: {
        plugins: [babelPluginIsland]
      }
    }),
    // Svg component support
    pluginSvgr(),
    // Md(x) compile
    pluginMdx(),
    // Conventional Route
    pluginRoutes({ prefix: '', root: config.root })
  ];
}
