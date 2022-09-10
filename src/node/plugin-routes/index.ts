import path from 'path';
import type { Plugin } from 'vite';
import { RouteService } from './RouteService';

/**
 * How does the conventional route work?
 * Essentially, it turns files into route object, e.g. src/pages/index.tsx -> { path: '/', element: <Index /> }
 * Implementation details:
 * 1. Find all files under src/pages (or the configured directory)
 * 2. Convert the file path to a route object
 * 3. Merge the route objects and generate route module code
 */
export interface PluginOptions {
  /**
   * The directory to search for pages
   * @default 'src'
   */
  srcDir?: string;
  /**
   * The prefix of the filepath that will be converted to a route
   * @default 'pages'
   */
  prefix?: string;
  /**
   * The extension name of the filepath that will be converted to a route
   * @default ['js','jsx','ts','tsx','md','mdx']
   */
  extensions?: string[];
}

export interface Route {
  path: string;
  element: React.ReactElement;
  preload: () => Promise<React.ReactElement>;
}

export const CONVENTIONAL_ROUTE_ID = 'virtual:routes';

const DEFAULT_PAGE_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'];

export function pluginRoutes(options: PluginOptions = {}): Plugin {
  const {
    srcDir = 'src',
    prefix = 'pages',
    extensions = DEFAULT_PAGE_EXTENSIONS
  } = options;
  let scanDir: string;
  let routeService: RouteService;
  return {
    name: 'island:vite-plugin-routes',
    async configResolved(c) {
      scanDir = path.isAbsolute(srcDir)
        ? path.join(srcDir, prefix)
        : path.join(c.root!, srcDir, prefix);
      routeService = new RouteService(scanDir, extensions);
      await routeService.init();
    },

    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        // This tells Vite that this is a virtual module
        return '\0' + CONVENTIONAL_ROUTE_ID;
      }
    },
    load(id: string) {
      if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
        return routeService.generateRoutesCode();
      }
    }
  };
}
