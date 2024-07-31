import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/login')
})

test('emailのtype属性がemailになっているかどうか', async ({ page }) => {
  const emailInput = await page.locator("input[name='email']")
  await expect(emailInput).toHaveAttribute('type','email')
});

test('passwordのtype属性がpasswordになっているかどうか', async ({ page }) => {
  const passwordInput = await page.locator("input[name='password']")
  await expect(passwordInput).toHaveAttribute('type','password')
});

test('emailの入力値に不備がある場合はエラーメッセージがでることの確認', async ({ page }) => {
  await page.locator("input[name='email']").fill('iriyamakotoe')
  await page.getByRole('button', { name: /ログイン/i }).click()
  await expect(page.locator(".email-error")).toHaveText('')
});

test('emailの入力値に不備がない場合はエラーメッセージがでないことの確認', async ({ page }) => {
  await page.locator("input[name='email']").fill('iriyamakotoe@icloud.com')
  await page.getByRole('button', { name: /ログイン/i }).click()
  await expect(page.locator(".email-error")).toHaveText('')
});

test('passwordの入力値に不備がある場合にエラーメッセージがでることの確認', async ({ page }) => {
  await page.locator("input[name='password']").fill('iriyamaaa')
  await page.getByRole('button', { name: /ログイン/i }).click()
  await expect(page.locator(".password-error")).toHaveText('')
});

test('passwordの入力値に不備がない時はエラーがでないことの確認', async ({ page }) => {
  await page.locator("input[name='password']").fill('iriyaaaaaaaaaaaaaaaa')
  await page.getByRole('button', { name: /ログイン/i }).click()
  await expect(page.locator(".password-error")).toHaveText('')
});

test('ログインが失敗した場合にエラーメッセージがでることの確認', async ({ page }) => {
  await page.locator("input[name='email']").fill('iriyamakotoe@icloud.com')
  await page.locator("input[name='password']").fill('iriyamaaaaaa')
  await page.getByRole('button', { name: /ログイン/i }).click()
  await page.waitForTimeout(5000);
  await expect(page.locator(".form-error")).toHaveText('')
});

test('ログインが成功した時はエラーメッセージがでないことの確認', async ({ page }) => {
  await page.locator("input[name='email']").fill('iriyamakotoe@icloud.com')
  await page.locator("input[name='password']").fill('iriyaa')
  await page.getByRole('button', { name: /ログイン/i }).click()
  await page.waitForTimeout(5000);
  await expect(page.locator(".form-error")).toHaveText('')
});