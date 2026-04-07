import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

import { ENV } from '../../config/env';

test('saucedemo login success', async ({ page }) => {
  await page.goto(ENV.BASE_URL);

  await page.locator('#user-name').fill(ENV.USER_NAME);
  await page.locator('#password').fill(ENV.PASSWORD);
  await page.locator('#login-button').click();

  
});