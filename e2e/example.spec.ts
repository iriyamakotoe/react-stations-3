import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/')
})

test('emailのtype属性がemail,値が必須になっているかどうか', async ({ page }) => {
  const emailInput = await page.getByLabel("email")
  await expect(emailInput).toHaveAttribute('type','email');
  await expect(emailInput).toHaveAttribute('required','');
});

test('passwordのtype属性がpassword,値が必須になっているかどうか', async ({ page }) => {
  const emailInput = await page.getByLabel("password")
  await expect(emailInput).toHaveAttribute('type','password');
  await expect(emailInput).toHaveAttribute('required','');
});

test('emailへ値を入力して判定する', async ({ page }) => {
  await page.getByLabel("email").fill('iriyama')
  await expect(page.getByLabel("email")).toHaveValue('iriyama@icloud.com');
});

test('パスワードへ値を入力して判定する', async ({ page }) => {
  await page.getByLabel("password").fill('kotoe')
  await expect(page.getByLabel("password")).toHaveValue('kotoe');
});