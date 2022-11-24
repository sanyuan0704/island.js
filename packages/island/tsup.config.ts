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
    dts: true,
    sourcemap: true,
    splitting: true,
    minify: process.env.NODE_ENV === 'production',
    skipNodeModulesBundle: true,
    outDir: 'dist/node',
    shims: true,
    clean: true
  },
  {
    entry: {
      'jsx-runtime': 'src/runtime/island-jsx-runtime.js',
      lazyWithPreload: 'src/runtime/lazyWithPreload.tsx'
    },
    dts: false,
    minify: false,
    outDir: 'dist/runtime'
  }
]);
