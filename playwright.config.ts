import type { PlaywrightTestConfig } from '@playwright/test';

const siteUrl = 'http://localhost:1234/';

const config: PlaywrightTestConfig = {
  testDir: './packages/island/src/node/__tests__/e2e',
  timeout: 50000,
  webServer: {
    command: 'npm run e2e:prepare',
    url: siteUrl,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  },
  use: {
    baseURL: siteUrl,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry'
  }
};
export default config;
