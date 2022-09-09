import { join } from 'path';
import fs, { remove } from 'fs-extra';
import type { RollupOutput } from 'rollup';
import { dynamicImport } from '../utils';
import { okMark } from './bundle';
import { TEMP_PATH } from '../constants';

export async function renderPage(
  render: (pagePath: string) => { appHtml: string; propsData: string },
  root: string,
  clientBundle: RollupOutput,
  serverBundle: RollupOutput
) {
  // Island components chunk
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  // We get style from server bundle because it will generate complete css
  const styleAssets = serverBundle.output.filter(
    (item) => item.type === 'asset' && item.fileName.endsWith('.css')
  );
  const { default: ora } = await dynamicImport('ora');
  const spinner = ora();
  spinner.start('Rendering page in server side...');
  const { appHtml, propsData } = await render('/');
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
    <script id="island-props">${JSON.stringify(propsData)}</script>
    <script type="module" src="/${clientChunk?.fileName}"></script>
    ${styleAssets
      .map((item) => `<link rel="stylesheet" href="/${item.fileName}">`)
      .join('\n')}
  </body>
</html>`.trim();
  await fs.ensureDir(join(root, 'dist'));
  await fs.writeFile(join(root, 'dist/index.html'), html);
  spinner.stopAndPersist({
    symbol: okMark
  });
  // Render ended, remove temp files
  await remove(join(root, TEMP_PATH));
}
