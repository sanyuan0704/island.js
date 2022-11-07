import type { IslandPlugin } from 'islandjs/plugin';
import { join } from 'path';

export interface SearchOptions {
  maxSuggestions?: number;
}

export function pluginSearch(options: SearchOptions = {}): IslandPlugin {
  const { maxSuggestions = 7 } = options;
  return {
    name: 'island:plugin-search',
    vite: {
      optimizeDeps: {
        include: ['flexsearch']
      }
    },
    alias: {
      '@search-box': join(__dirname, '../src/component/index.tsx')
    },
    define: {
      __SEARCH_MAX_SUGGESTIONS__: JSON.stringify(maxSuggestions)
    },
    // Restart dev server when plugin file changes.
    watchFiles: [join(__dirname, 'index.js')]
  };
}
