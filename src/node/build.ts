/**
 * In production build, we should do following steps:
 * 1. Bundle client and ssr entry code, get clientBundle and serverBundle
 * 2. Execute serverBundle to get render function and routes
 * 3. Render pages to static html string (renderToString)
 * 4. Get island components from render process, and bundle the components together.We call this bundle as islandBundle,
    and the island components will be hang on window so that client bundle can access them.
 * 5. Inject islandBundle and client bundle to html string, as well as island props data.
 * 6. Write html string to file.   
 */

import { InlineConfig, build as viteBuild } from 'vite';
import { SiteConfig } from '../shared/types';
import { resolveConfig } from './config';
import {
  CLIENT_ENTRY_PATH,
  DEFAULT_EXTERNALS,
  DIST_PATH,
  MASK_SPLITTER,
  PUBLIC_DIR,
  SERVER_ENTRY_PATH,
  SERVER_OUTPUT_PATH,
  TEMP_PATH,
  VENDOR_PATH
} from './constants';
import { createIslandPlugins } from './plugin';
import { join, dirname } from 'path';
import { OutputAsset, OutputChunk, RollupOutput } from 'rollup';
import { createHash, dynamicImport } from './utils';
import { Route } from './plugin-routes';
import fs, { copy, pathExists, remove } from 'fs-extra';
import ora from 'ora';
import { HelmetData } from 'react-helmet-async';

const islandInjectId = 'island:inject';
export const okMark = '\x1b[32m✓\x1b[0m';
export const failMark = '\x1b[31m✖\x1b[0m';

export type RenderFn = (
  url: string,
  helmetContext: object,
  enableSpa: boolean
) => Promise<{
  appHtml: string;
  propsData: string;
  islandToPathMap: Record<string, string>;
  pageData: any;
}>;

interface ServerEntryExports {
  render: RenderFn;
  routes: Route[];
}

class SSGBuilder {
  #root: string;
  #config: SiteConfig<any>;
  #clientBundle?: RollupOutput;
  #serverBundle?: RollupOutput;
  #islandsInjectCache: Map<string, Promise<string>> = new Map();

  constructor(config: SiteConfig<any>) {
    this.#config = config;
    this.#root = this.#config.root;
  }

  async build() {
    const spinner = ora();
    spinner.start('Building client + server bundles...');
    try {
      const [clientBundle, serverBundle] = await Promise.all([
        this.#clientBuild(),
        this.#ssrBuild()
      ]);
      spinner.stopAndPersist({
        symbol: okMark
      });

      this.#clientBundle = clientBundle;
      this.#serverBundle = serverBundle;

      // Get complete css from server bundle
      await copy(
        join(this.#root, TEMP_PATH, 'ssr', 'assets'),
        join(this.#root, DIST_PATH, 'assets')
      );

      // Copy public assets
      const publicDirInRoot = join(this.#root, PUBLIC_DIR);
      if (await pathExists(publicDirInRoot)) {
        await copy(publicDirInRoot, join(this.#root, DIST_PATH));
      }

      const serverEntryPath = join(this.#root, SERVER_OUTPUT_PATH);
      const { render, routes } = (await dynamicImport(
        serverEntryPath
      )) as ServerEntryExports;
      return [render, routes];
    } catch (e) {
      spinner.stopAndPersist({
        symbol: failMark
      });
      throw e;
    }
  }

  async renderPages(render: RenderFn, routes: Route[]) {
    // Island components chunk
    const clientEntryChunk = this.#clientBundle!.output.find(
      (chunk) => chunk.type === 'chunk' && chunk.isEntry
    );
    const clientChunkCode = await fs.readFile(
      join(this.#root, DIST_PATH, clientEntryChunk!.fileName),
      'utf-8'
    );
    // We get style from server bundle because it will generate complete css
    const styleAssets = this.#serverBundle!.output.filter(
      (item) => item.type === 'asset' && item.fileName.endsWith('.css')
    );
    const { default: ora } = await dynamicImport('ora');
    const spinner = ora();
    spinner.start('Rendering page in server side...');
    const clientChunkInfo = {
      code: clientChunkCode,
      fileName: clientEntryChunk!.fileName
    };
    await Promise.all(
      routes.map((route) =>
        this.#renderPage(render, route.path, clientChunkInfo, styleAssets)
      )
    );
    await this.#render404Page(render, clientChunkInfo, styleAssets);
    try {
      await fs.copy(VENDOR_PATH, join(this.#root, DIST_PATH));
    } catch (e) {
      console.log(e);
      throw e;
    }
    spinner.stopAndPersist({
      symbol: okMark
    });
  }

  async end() {
    await remove(join(this.#root, TEMP_PATH));
  }

  async islandsBuild(injectCode: string) {
    return this.#baseBuild(false, {
      build: {
        minify: true,
        outDir: TEMP_PATH,
        ssrManifest: false,
        rollupOptions: {
          external: DEFAULT_EXTERNALS,
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
              return injectCode;
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
  }

  #clientBuild() {
    return this.#baseBuild(false);
  }

  #ssrBuild() {
    return this.#baseBuild(true);
  }

  async #renderPage(
    render: RenderFn,
    routePath: string,
    clientChunk: { code?: string; fileName?: string },
    styleAssets: (OutputChunk | OutputAsset)[]
  ) {
    const helmetContext: HelmetData = {
      context: {}
    } as HelmetData;
    const { appHtml, propsData, islandToPathMap, pageData } = await render(
      routePath,
      helmetContext.context,
      this.#config.enableSpa!
    );
    const hasIsland = Object.keys(islandToPathMap).length > 0;
    let injectIslandsCode = '';
    // In island mode, we will bundle and inject island components code to html
    if (hasIsland && !this.#config.enableSpa) {
      const islandHash = createHash(JSON.stringify(islandToPathMap));
      let injectBundlePromise = this.#islandsInjectCache.get(islandHash);

      if (!injectBundlePromise) {
        const rawInjectCode = this.#generateIslandInjectCode(islandToPathMap);
        injectBundlePromise = (async () => {
          const injectBundle = await this.islandsBuild(rawInjectCode);
          return injectBundle.output[0].code;
        })();
        this.#islandsInjectCache.set(islandHash, injectBundlePromise);
      }
      injectIslandsCode = await injectBundlePromise;
    }
    const { helmet } = helmetContext.context!;
    const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <link rel="icon" href="${
        this.#config.siteData!.icon
      }" type="image/svg+xml"></link>
      ${helmet?.title.toString() || ''}
      ${helmet?.meta.toString() || ''}
      ${helmet?.link.toString() || ''}
      ${helmet?.style.toString() || ''}
      <script type="importmap">
        {
          "imports": {
            ${DEFAULT_EXTERNALS.map(
              (name) => `"${name}": "/${name.replaceAll('/', '_')}.js"`
            ).join(',')}
          }
        }
      </script>

      ${styleAssets
        .map((item) => `<link rel="stylesheet" href="/${item.fileName}">`)
        .join('\n')}
    </head>
    <body>
      <div id="root">${appHtml}</div>
      ${
        this.#config.enableSpa
          ? `<script>window.ISLAND_PAGE_DATA=${JSON.stringify(
              pageData
            )};</script>`
          : ''
      }
      ${
        !this.#config.enableSpa && hasIsland
          ? `<script id="island-props">${JSON.stringify(
              propsData
            )}</script><script type="module">${injectIslandsCode}</script>`
          : ''
      }
      ${
        this.#config.enableSpa
          ? `<script type="module" src="/${clientChunk.fileName}"></script>`
          : `<script type="module">${clientChunk.code}</script>`
      }
    </body>
  </html>`.trim();
    const fileName =
      routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`;
    await fs.ensureDir(join(this.#root, DIST_PATH, dirname(fileName)));
    await fs.writeFile(join(this.#root, DIST_PATH, fileName), html);
  }

  #render404Page(
    render: RenderFn,
    clientChunk: { code: string; fileName: string },
    styleAssets: (OutputChunk | OutputAsset)[]
  ) {
    return this.#renderPage(render, '/404', clientChunk, styleAssets);
  }

  #generateIslandInjectCode(islandToPathMap: Record<string, string>) {
    return `
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
  }

  async #baseBuild(isServer: boolean, options: InlineConfig = {}) {
    const resolveViteConfig = async (
      isServer: boolean
    ): Promise<InlineConfig> => ({
      ...options,
      mode: 'production',
      root: this.#root,
      plugins: [
        await createIslandPlugins(this.#config, isServer),
        ...(options?.plugins || [])
      ],
      esbuild: {
        // Reserve island component name
        minifyIdentifiers: !isServer
      },
      ssr: {
        noExternal: ['lodash-es', 'react-router-dom']
      },
      build: {
        minify: !process.env.DEBUG,
        ssr: isServer,
        outDir: isServer
          ? join(this.#root, TEMP_PATH, 'ssr')
          : join(this.#root, DIST_PATH),
        cssCodeSplit: false,
        ssrManifest: !isServer,
        rollupOptions: {
          output: {
            entryFileNames: isServer ? '[name].js' : undefined,
            format: isServer ? 'cjs' : 'es'
          },
          input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH
        },
        ...options?.build
      }
    });
    return viteBuild(
      await resolveViteConfig(isServer)
    ) as Promise<RollupOutput>;
  }
}

export async function build(root: string) {
  const config = await resolveConfig(root, 'build', 'production');
  const builder = new SSGBuilder(config);

  const [render, routes] = await builder.build();

  await builder.renderPages(render as RenderFn, routes as Route[]);

  await builder.end();
}
