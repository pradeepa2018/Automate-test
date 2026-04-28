import { chromium, FullConfig, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { ENV } from './../config/env';

async function globalSetup(config: FullConfig) {
  const storagePath = path.resolve(__dirname, '../playwright/.auth/user.json');
  fs.mkdirSync(path.dirname(storagePath), { recursive: true });

  const browser = await chromium.launch({
    headless: process.env.CI === 'true' || process.env.HEADLESS !== 'false',
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(ENV.BASE_URL);
  await page.getByPlaceholder('Username').fill(ENV.USERNAME);
  await page.getByPlaceholder('Password').fill(ENV.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });

  await context.storageState({ path: storagePath });
  await browser.close();
}

export default globalSetup;
