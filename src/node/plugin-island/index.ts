import { SiteConfig } from 'shared/types';
import type { Plugin } from 'vite';
import { pluginConfig } from './config';
import { pluginCustomStyle } from './custom-style';
import { pluginIndexHtml } from './indexHtml';
import { pluginIslandTransform } from './islandTransform';
import { pluginSiteData } from './siteDataPlugin';

export function pluginIsland(
  config: SiteConfig,
  isServer = false,
  restartServer?: () => Promise<void>
): Plugin[] {
  return [
    pluginSiteData(config),
    pluginConfig(config, restartServer),
    pluginIndexHtml(config),
    pluginIslandTransform(config, isServer),
    pluginCustomStyle(config)
  ];
}
