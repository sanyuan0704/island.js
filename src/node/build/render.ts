import { join } from 'path';
import fs, { remove } from 'fs-extra';
import type { RollupOutput } from 'rollup';
import { dynamicImport } from '../utils';
import { okMark, Builder } from './bundle';
import { MASK_SPLITTER, TEMP_PATH } from '../constants/index';

export async function renderPages(
  render: (pagePath: string) => {
    appHtml: string;
    propsData: string;
    islandToPathMap: Record<string, string>;
  },
  root: string,
  clientBundle: RollupOutput,
  serverBundle: RollupOutput,
  builder: Builder
) {
  // Island components chunk
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  const clientChunkCode = await fs.readFile(
    join(root, 'dist', clientChunk!.fileName),
    'utf-8'
  );
  // We get style from server bundle because it will generate complete css
  const styleAssets = serverBundle.output.filter(
    (item) => item.type === 'asset' && item.fileName.endsWith('.css')
  );
  const { default: ora } = await dynamicImport('ora');
  const spinner = ora();
  spinner.start('Rendering page in server side...');
  const { appHtml, propsData, islandToPathMap } = await render('/');
  const islandInjectCode = `
    ${Object.entries(islandToPathMap)
      .map(([islandName, path]) => `import { ${islandName} } from '${path}';`)
      .join('')}
    window.ISLANDS = {
      ${Object.entries(islandToPathMap)
        .map(([islandName]) => `${islandName}`)
        .join(',')}
    };
    window.ISLAND_PROPS = JSON.parse(
      document.getElementById('island-props').textContent
    );
  `;
  const islandInjectId = 'island-inject';
  const injectBundle = await builder(false, {
    build: {
      minify: true,
      outDir: TEMP_PATH,
      ssrManifest: false,
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react-dom/client',
          'react-dom/server'
        ],
        input: islandInjectId
      }
    },
    plugins: [
      {
        name: 'island-inject',
        enforce: 'post',
        banner: 'import React from "react";',
        resolveId(id) {
          if (id.includes(MASK_SPLITTER)) {
            const [originId, importer] = id.split(MASK_SPLITTER);
            return this.resolve(originId, importer, { skipSelf: true });
          }
          if (id === islandInjectId) {
            return islandInjectId;
          }
        },
        load(id) {
          if (id === islandInjectId) {
            return islandInjectCode;
          }
        },
        generateBundle(_options, bundle) {
          for (const name in bundle) {
            if (bundle[name].type === 'asset') {
              delete bundle[name];
            }
          }
        }
      }
    ]
  });
  const injectCode = injectBundle.output[0].code;
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react",
          "react-dom": "https://esm.sh/react-dom",
          "react-dom/client": "https://esm.sh/react-dom/client"
        }
      }
    </script>
    ${styleAssets
      .map((item) => `<link rel="stylesheet" href="/${item.fileName}">`)
      .join('\n')}
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script id="island-props">${JSON.stringify(propsData)}</script>
    <script type="module">${injectCode}</script>
    <script type="module">${clientChunkCode}</script>
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
