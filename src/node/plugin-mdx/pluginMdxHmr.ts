import { MD_REGEX } from '../../node/constants';
import { Plugin, ResolvedConfig } from 'vite';
import { RouteService } from '../plugin-routes/RouteService';

export function pluginMdxHMR(): Plugin {
  let viteReactPlugin: Plugin;
  let resolvedConfig: ResolvedConfig;
  return {
    name: 'vite-plugin-mdx-hmr',
    apply: 'serve',
    configResolved(config) {
      resolvedConfig = config;
      viteReactPlugin = config.plugins.find(
        (plugin) => plugin.name === 'vite:react-babel'
      ) as Plugin;
    },
    async transform(code, id, opts) {
      if (MD_REGEX.test(id)) {
        // Inject babel refresh template code by @vitejs/plugin-react
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
          resolvedConfig!.root
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
