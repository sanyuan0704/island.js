import pluginReact from '@vitejs/plugin-react';
import pluginMdx from 'vite-plugin-mdx';
import { pluginSvgr } from './plugin-svgr';
import { pluginIsland } from './plugin-island';
import { pluginRoutes } from './plugin-routes';
import pluginInspect from 'vite-plugin-inspect';
export function createIslandPlugins() {
  return [
    // For island internal use
    pluginIsland(),
    // React hmr support
    pluginReact({
      jsxRuntime: 'classic'
    }),
    // Svg component support
    pluginSvgr(),
    // Md(x) compile
    pluginMdx(),
    // Conventional Route
    pluginRoutes({ prefix: '' }),
    // Inspect transformation
    pluginInspect({})
  ];
}
