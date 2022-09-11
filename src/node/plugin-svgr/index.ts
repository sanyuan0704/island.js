import { Plugin } from 'vite';
import * as fs from 'fs';

interface SvgrOptions {
  defaultExport?: 'url' | 'component';
}

export function pluginSvgr(options: SvgrOptions = {}): Plugin {
  const { defaultExport = 'component' } = options;

  return {
    name: 'island:vite-plugin-svgr',
    async transform(code, id) {
      if (!id.endsWith('.svg')) {
        return code;
      }
      const svgrTransform = await (await import('@svgr/core')).transform;
      const esbuild = await import('esbuild');
      const svg = await fs.promises.readFile(id, 'utf8');
      const svgrResult = await svgrTransform(
        svg,
        {},
        { componentName: 'ReactComponent' }
      );
      let componentCode = svgrResult;
      if (defaultExport === 'url') {
        componentCode = svgrResult.replace(
          'export default ReactComponent',
          'export { ReactComponent }'
        );
        componentCode += code;
      }
      const result = await esbuild.transform(componentCode, {
        loader: 'jsx'
      });
      return result.code;
    }
  };
}
