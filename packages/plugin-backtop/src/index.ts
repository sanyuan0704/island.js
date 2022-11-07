import type { IslandPlugin } from 'islandjs/plugin';
import { join } from 'path';

// TODO: expose options
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BackTopOptions {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function pluginBackTop(options: BackTopOptions = {}): IslandPlugin {
  return {
    name: 'island:plugin-backtop',
    vite: {
      optimizeDeps: {
        include: ['b-tween', 'lodash-es']
      }
    },
    alias: {
      '@back-top': join(__dirname, '../src/component/index.tsx')
    },
    // Since the component is an island component, so it will be a bit difficult to automatically inject it as global component
    // globalUIComponents: [],
    // Restart dev server when plugin file changes.
    watchFiles: [join(__dirname, 'index.js')]
  };
}
