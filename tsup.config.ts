import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'jsx-runtime': 'src/client/runtime/island-jsx-runtime.js',
    cli: 'src/node/cli.ts',
    index: 'src/node/index.ts'
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  dts: true,
  sourcemap: true,
  splitting: false,
  skipNodeModulesBundle: true
  // https://github.com/evanw/esbuild/issues/1921
  // banner() {
  //   return {
  //     // js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`
  //   };
  // }
});
