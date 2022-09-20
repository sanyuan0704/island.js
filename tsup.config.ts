import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      cli: 'src/node/cli.ts',
      dev: 'src/node/dev.ts',
      index: 'src/node/index.ts'
    },
    minifyIdentifiers: false,
    bundle: true,
    platform: 'node',
    format: 'esm',
    dts: true,
    sourcemap: true,
    splitting: true,
    keepNames: true,
    minify: process.env.NODE_ENV === 'production',
    skipNodeModulesBundle: true,
    outDir: 'dist/node',
    clean: true
  },
  {
    entry: {
      'jsx-runtime': 'src/runtime/island-jsx-runtime.js',
      lazyWithPreload: 'src/runtime/lazyWithPreload.tsx'
    },
    format: 'esm',
    dts: false,
    minify: false,
    outDir: 'dist/runtime',
    clean: true
  }
]);
