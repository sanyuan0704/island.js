import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    minifyIdentifiers: false,
    bundle: true,
    dts: true,
    sourcemap: true,
    splitting: true,
    minify: process.env.NODE_ENV === 'production',
    skipNodeModulesBundle: true,
    outDir: 'dist',
    clean: true,
    shims: true
  }
]);
