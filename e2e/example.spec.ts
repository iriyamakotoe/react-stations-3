import { test, expect } from '@playwright/test';

test('ログイン画面のブラウザテスト', async ({ page }) => {
  
  await page.goto('http://localhost:5173/');
  await page.getByLabel("email").fill('iriyama')
  await page.getByLabel("password").fill('kotoe')
  await page.locator("button").click()

});
