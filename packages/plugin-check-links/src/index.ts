import { IslandPlugin } from 'islandjs/plugin';
import { remarkCheckDeadLinks } from './remarkPlugin';

export interface DeadLinkCheckOptions {
  exclude?: (string | RegExp)[];
  timeout?: number;
}

export function pluginCheckLinks(
  options: DeadLinkCheckOptions = {}
): IslandPlugin {
  return {
    name: 'island:plugin-check-links',
    markdown: {
      remarkPlugins: [[remarkCheckDeadLinks, options]]
    }
  };
}
