import { test, expect } from '@playwright/test';

const siteUrl = 'http://localhost:1234/';

test('Verify that the page renders properly', async ({ page }) => {
  await page.goto(siteUrl);

  await page.waitForTimeout(2000);

  const res = await page.evaluate(async () => {
    const pageContent = document.body.innerText;
    return pageContent.includes('Hello');
  });
  expect(res).toBe(true);
});
