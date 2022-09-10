import { join, dirname } from 'path';
import fs, { remove } from 'fs-extra';
import type { RollupOutput } from 'rollup';
import { createHash, dynamicImport } from '../utils';
import { okMark, Builder } from './bundle';
import { MASK_SPLITTER, TEMP_PATH, DIST_PATH } from '../constants/index';
import { Route } from '../plugin-routes';

export const islandsInjectCache = new Map<string, Promise<string>>();

export async function renderPages(
  render: (pagePath: string) => {
    appHtml: string;
    propsData: string;
    islandToPathMap: Record<string, string>;
  },
  routes: Route[],
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
    join(root, DIST_PATH, clientChunk!.fileName),
    'utf-8'
  );
  // We get style from server bundle because it will generate complete css
  const styleAssets = serverBundle.output.filter(
    (item) => item.type === 'asset' && item.fileName.endsWith('.css')
  );
  const { default: ora } = await dynamicImport('ora');
  const spinner = ora();
  spinner.start('Rendering page in server side...');
  await Promise.all(
    routes.map(async (route) => {
      // Different pages may have different island components
      const { appHtml, propsData, islandToPathMap } = await render(route.path);
      const islandHash = createHash(JSON.stringify(islandToPathMap));
      let injectBundlePromise = islandsInjectCache.get(islandHash);

      if (!injectBundlePromise) {
        const rawInjectCode = `
          ${Object.entries(islandToPathMap)
            .map(
              ([islandName, path]) => `import { ${islandName} } from '${path}';`
            )
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
        injectBundlePromise = (async () => {
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
                    return rawInjectCode;
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
          return injectBundle.output[0].code;
        })();
        islandsInjectCache.set(islandHash, injectBundlePromise);
      }
      const injectCode = await injectBundlePromise;
      const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>title</title>
        <meta name="description" content="xxx">
        <link rel="icon" href="/public/icon.png" type="image/svg+xml">

        <script type="importmap">
          {
            "imports": {
              "react": "https://esm.sh/stable/react@18.2.0/es2022/react.js",
              "react-dom": "https://esm.sh/v94/react-dom@18.2.0/es2022/react-dom.js",
              "react-dom/client": "https://esm.sh/v94/react-dom@18.2.0/es2022/client.js"
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
      const fileName =
        route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
      await fs.ensureDir(join(root, DIST_PATH, dirname(fileName)));
      await fs.writeFile(join(root, DIST_PATH, fileName), html);
      spinner.stopAndPersist({
        symbol: okMark
      });
    })
  );
  // Render ended, remove temp files
  await remove(join(root, TEMP_PATH));
}
