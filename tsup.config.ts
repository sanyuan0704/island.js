import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      'jsx-runtime': 'src/client/runtime/island-jsx-runtime.js',
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
    clean: true,
    minify: process.env.NODE_ENV === 'production',
    skipNodeModulesBundle: true
  },
  {
    entry: {
      lazyWithPreload: 'src/client/runtime/lazyWithPreload.tsx'
    },
    format: 'esm',
    clean: true,
    dts: false,
    minify: false
  }
]);
