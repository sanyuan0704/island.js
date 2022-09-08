import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: true,
  platform: 'node',
  format: 'esm',
  sourcemap: true,
  // https://github.com/evanw/esbuild/issues/1921
  banner() {
    return {
      js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`
    };
  }
});
