import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      'jsx-runtime': 'src/runtime/island-jsx-runtime.js',
      cli: 'src/node/cli.ts',
      index: 'src/node/index.ts'
    },
    minifyIdentifiers: false,
    bundle: true,
    platform: 'node',
    format: 'esm',
    dts: true,
    sourcemap: true,
    splitting: false,
    keepNames: true,
    minify: process.env.NODE_ENV === 'production',
    skipNodeModulesBundle: true
  },
  {
    entry: {
      lazyWithPreload: 'src/runtime/lazyWithPreload.tsx'
    },
    format: 'esm',
    dts: false,
    minify: false
  }
]);
