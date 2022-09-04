import pluginReact from '@vitejs/plugin-react';
import pluginMdx from 'vite-plugin-mdx';
import { pluginSvgr } from './plugin-svgr';
import { pluginIsland } from './plugin-island';
import { CONVENTIONAL_ROUTE_ID, pluginRoutes } from './plugin-routes';

export function createIslandPlugins() {
  return [
    // For island internal use
    pluginIsland(),
    // React hmr support
    pluginReact({
      jsxRuntime: 'classic',
      include: [CONVENTIONAL_ROUTE_ID]
    }),
    // Svg component support
    pluginSvgr(),
    // Md(x) compile
    pluginMdx(),
    // Conventional Route
    pluginRoutes({ prefix: '' })
  ];
}
