import { defineConfig } from 'tsup';

const pkgInfo = require('./package.json');

const external = [
  ...Object.keys(pkgInfo.dependencies),
  ...Object.keys(pkgInfo.devDependencies)
];

export default defineConfig({
  entry: {
    'jsx-runtime': 'src/client/app/island-jsx-runtime.js',
    cli: 'src/node/cli.ts'
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  sourcemap: true,
  splitting: false,
  skipNodeModulesBundle: true,
  // https://github.com/evanw/esbuild/issues/1921
  banner() {
    return {
      // js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`
    };
  }
});
