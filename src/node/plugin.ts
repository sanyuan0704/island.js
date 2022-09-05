import pluginReact from '@vitejs/plugin-react';
import pluginMdx from 'vite-plugin-mdx';
import { pluginSvgr } from './plugin-svgr';
import { pluginIsland } from './plugin-island';
import { pluginRoutes } from './plugin-routes';
import pluginInspect from 'vite-plugin-inspect';
import { SiteConfig } from '../shared/types';

export function createIslandPlugins(config: SiteConfig) {
  return [
    // For island internal use
    pluginIsland(config),
    // React hmr support
    pluginReact({
      jsxRuntime: 'classic',
      babel: {
        // plugins: ['@loadable/babel-plugin']
      }
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
