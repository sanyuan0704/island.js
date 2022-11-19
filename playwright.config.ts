import type { PlaywrightTestConfig } from '@playwright/test';

const siteUrl = 'http://localhost:5173/';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 50000,
  webServer: {
    command: 'npm run prepare:e2e',
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
