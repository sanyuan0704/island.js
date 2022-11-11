// Pre-bundle in production
// Handle common dependencies such as react and react-dom
import { build, Loader } from 'esbuild';
import { parse, init } from 'es-module-lexer';
import fs from 'fs-extra';
import path from 'path';
import resolve from 'resolve';
import { performance } from 'perf_hooks';
import { green } from 'picocolors';
import { remove, pathExists } from 'fs-extra';
import { normalizePath } from 'vite';

type PreBundleItem = string;

const PRE_BUNDLE_DIR = 'vendors';

async function preBundle(deps: PreBundleItem[]) {
  const startTime = performance.now();
  const flattenDepMap = {} as Record<string, string>;
  deps.map((item) => {
    const flattedName = item.replace(/\//g, '_');
    flattenDepMap[flattedName] = item;
  });
  const outputAbsolutePath = path.resolve(process.cwd(), PRE_BUNDLE_DIR);
  if (await pathExists(outputAbsolutePath)) {
    await remove(path.join(process.cwd(), PRE_BUNDLE_DIR));
  }
  await init;
  const env = process.env.NODE_ENV || 'production';
  await build({
    entryPoints: flattenDepMap,
    outdir: PRE_BUNDLE_DIR,
    bundle: true,
    minify: env === 'production',
    splitting: true,
    format: 'esm',
    define: {
      'process.env.NODE_ENV': JSON.stringify(env || 'production')
    },
    platform: 'browser',
    plugins: [
      {
        name: 'pre-bundle',
        setup(build) {
          build.onResolve({ filter: /^[\w@][^:]/ }, async (args) => {
            if (!deps.includes(args.path)) {
              return;
            }
            const isEntry = !args.importer;
            const resolved = resolve.sync(args.path, {
              basedir: args.importer || process.cwd()
            });
            return isEntry
              ? {
                  path: resolved,
                  namespace: 'dep'
                }
              : {
                  path: resolved
                };
          });

          build.onLoad({ filter: /.*/, namespace: 'dep' }, async (args) => {
            const entryPath = normalizePath(args.path);
            const code = await fs.readFile(entryPath, 'utf-8');
            const [imports, exports] = await parse(code);
            const proxyModule = [];
            // cjs
            if (!imports.length && !exports.length) {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const res = require(entryPath);
              const specifiers = Object.keys(res);
              proxyModule.push(
                `export { ${specifiers.join(',')} } from "${entryPath}"`,
                `export default require("${entryPath}")`
              );
            } else {
              const hasDefaultExport = exports.some((exportInfo) => {
                const exportName = code.slice(exportInfo.s, exportInfo.e);
                return exportName === 'default';
              });
              // Has default export
              if (hasDefaultExport) {
                proxyModule.push(
                  `import d from "${entryPath}";export default d`
                );
              }
              proxyModule.push(`export * from "${entryPath}"`);
            }
            const loader = path.extname(entryPath).slice(1);
            return {
              loader: loader as Loader,
              contents: proxyModule.join('\n'),
              resolveDir: process.cwd()
            };
          });
        }
      }
    ]
  });
  const timeCost = performance.now() - startTime;
  console.log(`✅ Pre bundle finished, cost ${green(timeCost.toFixed(2))}ms`);
}

preBundle(['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime']);
