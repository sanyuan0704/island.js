import path from 'path';
import { PageModule } from '../../shared/types';
import type { Plugin } from 'vite';
import { normalizePath } from 'vite';
import { RouteService } from './RouteService';
import type { ComponentType } from 'react';

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
   */
  root?: string;
  /**
   * The prefix of the filepath that will be converted to a route
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
  filePath: string;
  preload: () => Promise<PageModule<ComponentType<unknown>>>;
}

export const CONVENTIONAL_ROUTE_ID = 'virtual:routes';

const DEFAULT_PAGE_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'];

export function pluginRoutes(options: PluginOptions = {}): Plugin {
  const {
    root = 'src',
    prefix = '',
    extensions = DEFAULT_PAGE_EXTENSIONS
  } = options;
  let scanDir: string;
  let routeService: RouteService;
  return {
    name: 'island:vite-plugin-routes',
    async configResolved() {
      scanDir = path.isAbsolute(root)
        ? path.join(root, prefix)
        : path.join(process.cwd(), root, prefix);
      routeService = new RouteService(normalizePath(scanDir), extensions);
      await routeService.init();
    },

    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        // This tells Vite that this is a virtual module
        return '\0' + CONVENTIONAL_ROUTE_ID;
      }
    },
    load(id: string, options) {
      if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
        return routeService.generateRoutesCode(options?.ssr);
      }
    },

    configureServer(server) {
      const fileChange = () => {
        const virtualRouteMod = server.moduleGraph.getModuleById(
          `\0${CONVENTIONAL_ROUTE_ID}`
        );
        if (virtualRouteMod) {
          server.moduleGraph.invalidateModule(virtualRouteMod!);
          server.ws.send({
            type: 'full-reload'
          });
        }
      };
      server.watcher
        .on('add', async (file) => {
          if (file.startsWith(scanDir)) {
            await routeService.addRoute(file);
            fileChange();
          }
        })
        .on('unlink', async (file) => {
          if (file.startsWith(scanDir)) {
            await routeService.removeRoute(file);
            fileChange();
          }
        });
    }
  };
}
