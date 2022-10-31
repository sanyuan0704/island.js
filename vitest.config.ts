import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    passWithNoTests: true,
    exclude: [
      '**/node_modules/**',
      '**/src/node/__tests__/e2e/*.*',
      '**/playground/**'
    ],
    threads: true,
    maxThreads: 2,
    minThreads: 1
  }
});
