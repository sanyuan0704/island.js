import { dynamicImport } from '../utils';
import fs from 'fs-extra';
import { join } from 'path';
import type { RollupOutput } from 'rollup';
import { okMark } from './bundle';

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  const { default: ora } = await dynamicImport('ora');
  const spinner = ora();
  spinner.start(`Rendering page in server side...`);
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
  await fs.ensureDir(join(root, 'dist'));
  await fs.writeFile(join(root, 'dist/index.html'), html);
  spinner.stopAndPersist({
    symbol: okMark
  });
  // await fs.removes(join(root, TEMP_PATH));
}
