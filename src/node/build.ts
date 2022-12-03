import { build as viteBuild, InlineConfig } from 'vite';
import type { RollupOutput } from 'rollup';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import path, { join } from 'path';
import fs from 'fs-extra';
// import ora from 'ora';
import { pluginConfig } from './plugin-island/config';
import { SiteConfig } from 'shared/types';
import pluginReact from '@vitejs/plugin-react';

export async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: 'production',
    root,
    plugins: [pluginReact(), pluginConfig(config)],
    ssr: {
      noExternal: ['react-router-dom']
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? path.join(root, '.temp') : 'build',
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm'
        }
      }
    }
  });
  // const spinner = ora();
  // spinner.start(`Building client + server bundles...`);

  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(resolveViteConfig(false)),
      // server build
      viteBuild(resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  console.log('Rendering page in server side...');
  const appHtml = render();
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
  await fs.ensureDir(join(root, 'build'));
  await fs.writeFile(join(root, 'build/index.html'), html);
  await fs.remove(join(root, '.temp'));
}

export async function build(root: string = process.cwd(), config: SiteConfig) {
  // 1. bundle - client 端 + server 端
  const [clientBundle] = await bundle(root, config);
  // 2. 引入 server-entry 模块
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js');
  const { render } = await import(serverEntryPath);
  // 3. 服务端渲染，产出 HTML
  try {
    await renderPage(render, root, clientBundle);
  } catch (e) {
    console.log('Render page error.\n', e);
  }
}
