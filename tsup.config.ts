import { defineConfig } from 'tsup';

export default defineConfig({
  platform: 'node',
  format: 'esm',
  banner() {
    return {
      js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`
    };
  }
});
