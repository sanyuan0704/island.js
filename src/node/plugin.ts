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
import presetWind from '@unocss/preset-wind';
import presetAttributify from '@unocss/preset-attributify';

// import pluginInspect from 'vite-plugin-inspect';

export async function createIslandPlugins(
  config: SiteConfig,
  isServer = false,
  restartServer?: () => Promise<void>
): Promise<PluginOption[]> {
  return [
    pluginUnocss({
      presets: [presetAttributify(), presetWind({})],
      shortcuts: {
        'flex-center': 'flex justify-center items-center',
        'border-top': 'border-top border-solid border-soft'
      },
      rules: [],
      theme: {
        fontSize: {
          '6xl': ['3.5rem', '4rem']
        },
        colors: {
          brand: 'var(--island-c-green)',
          text: {
            1: 'var(--island-c-text-1)',
            2: 'var(--island-c-text-2)',
            3: 'var(--island-c-text-3)',
            4: 'var(--island-c-text-4)'
          },
          divider: {
            default: 'var(--island-c-divider)',
            light: 'var(--island-c-divider-light)',
            dark: 'var(--island-c-divider-dark)'
          },
          gray: {
            light: {
              1: 'var(--island-c-gray-light-1)',
              2: 'var(--island-c-gray-light-2)',
              3: 'var(--island-c-gray-light-3)',
              4: 'var(--island-c-gray-light-4)'
            }
          },
          bg: {
            default: 'var(--island-c-bg)',
            soft: 'var(--island-c-bg-soft)'
          }
        }
      }
    }),
    // pluginInspect({}),
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
            // Babel plugin for island(mpa) mode
            plugins: [...(config.enableSpa ? [] : [babelPluginIsland])]
          }
        }),
    // Svg component support
    pluginSvgr(),
    // Conventional Route
    pluginRoutes({ prefix: '', root: config.root, ...config.route })
  ];
}
