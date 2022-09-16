import { SiteConfig } from 'shared/types';
import type { Plugin } from 'vite';
import { pluginConfig } from './config';
import { pluginIndexHtml } from './indexHtml';
import { pluginIslandTransform } from './islandTransform';
import { pluginSiteData } from './siteDataPlugin';

export function pluginIsland(
  config: SiteConfig,
  isServer: boolean = false,
  restartServer?: () => Promise<void>
): Plugin[] {
  return [
    pluginSiteData(config),
    pluginConfig(config),
    pluginIndexHtml(config),
    pluginIslandTransform(config, isServer)
  ];
}
