import type { PluginOption } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import { pluginSvgr } from './plugin-svgr';
import { pluginIsland } from './plugin-island';
import { pluginRoutes } from './plugin-routes';
import pluginInspect from 'vite-plugin-inspect';
import { SiteConfig } from '../shared/types';
import pluginMdx from '@mdx-js/rollup';
import { createMDXOptions } from './plugin-mdx';

export async function createIslandPlugins(
  config: SiteConfig
): Promise<PluginOption[]> {
  const mdxOptions = createMDXOptions();
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
    // @ts-ignore
    pluginMdx(mdxOptions),
    // Conventional Route
    pluginRoutes({ prefix: '' }),
    // Inspect transformation
    pluginInspect({})
  ];
}
