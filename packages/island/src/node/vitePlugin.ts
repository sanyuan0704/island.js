import type { PluginOption } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import { pluginSvgr } from './plugin-svgr';
import { pluginIsland } from './plugin-island';
import { pluginRoutes } from './plugin-routes';
import { SiteConfig } from '../shared/types';
import { pluginMdx } from './plugin-mdx';
import babelPluginIsland from './babel-plugin-island';
import { ISLAND_JSX_RUNTIME_PATH } from './constants/index';
import pluginUnocss from 'unocss/vite';
import unocssOptions from './unocss.config';

export async function createVitePlugins(
  config: SiteConfig,
  isServer = false,
  restartServer?: () => Promise<void>
): Promise<PluginOption[]> {
  const pluginsFromIslandPlugins = config.plugins
    ?.map((item) => item.vite)
    .filter(Boolean)
    .map((item) => item?.plugins || [])
    .flat();
  return [
    pluginUnocss(unocssOptions),
    // Md(x) compile
    await pluginMdx(config, isServer),
    // For island internal use
    pluginIsland(config, isServer, restartServer),

    // React hmr support
    // In ssr, we will compile .tsx in islandTransform plugin
    isServer && !config.enableSpa
      ? []
      : pluginReact({
          jsxRuntime: 'automatic',
          jsxImportSource:
            isServer && !config.enableSpa ? ISLAND_JSX_RUNTIME_PATH : 'react',
          babel: {
            ...(config.babel || {}),
            // Babel plugin for island(mpa) mode
            plugins: [
              ...(config.enableSpa ? [] : [babelPluginIsland]),
              ...(config.babel?.plugins || [])
            ]
          }
        }),
    // Svg component support
    pluginSvgr(),
    // Conventional Route
    pluginRoutes({
      prefix: config.base ?? '/',
      root: config.root,
      ...config.route
    }),
    ...(pluginsFromIslandPlugins || [])
  ];
}
