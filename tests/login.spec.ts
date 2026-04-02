import { test, expect } from '@playwright/test';
test.describe('OrangeHRM Login Tests', () => {
test('User logs in with valid credentials and navigates to dashboard', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.getByPlaceholder('username').fill('Admin');
  await page.getByPlaceholder('password').fill('admin123');
  await page.getByRole('button', { name: 'Login'}).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
});
});