import { MD_REGEX } from '../constants';
import { Plugin } from 'vite';
import { RouteService } from '../plugin-routes/RouteService';
import { SiteConfig } from 'shared/types/index';
import assert from 'assert';

export function pluginMdxHMR(config: SiteConfig): Plugin {
  let viteReactPlugin: Plugin;
  return {
    name: 'vite-plugin-mdx-hmr',
    apply: 'serve',
    configResolved(config) {
      viteReactPlugin = config.plugins.find(
        (plugin) => plugin.name === 'vite:react-babel'
      ) as Plugin;
    },
    async transform(code, id, opts) {
      if (MD_REGEX.test(id)) {
        viteReactPlugin.transform;
        // Inject babel refresh template code by @vitejs/plugin-react
        assert(typeof viteReactPlugin.transform === 'function');
        const result = await viteReactPlugin.transform?.call(
          this,
          code,
          id + '?.jsx',
          opts
        );
        const selfAcceptCode = 'import.meta.hot.accept();';
        if (
          typeof result === 'object' &&
          !result!.code?.includes(selfAcceptCode)
        ) {
          result!.code += selfAcceptCode;
        }
        return result;
      }
    },
    handleHotUpdate(ctx) {
      if (/\.mdx?/.test(ctx.file)) {
        const routePath = RouteService.getRoutePathFromFile(
          ctx.file,
          config.root,
          config.base || '/'
        );
        ctx.server.ws!.send({
          type: 'custom',
          event: 'md(x)-changed',
          data: {
            filePath: ctx.file,
            routePath
          }
        });
      }
    }
  };
}
