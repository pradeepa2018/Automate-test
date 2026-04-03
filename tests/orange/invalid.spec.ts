import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Invalid Login Test', () => {

  test('User should see error message for invalid credentials', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByPlaceholder('Username').fill('Admin123');
    await page.getByPlaceholder('Password').fill('12334');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});