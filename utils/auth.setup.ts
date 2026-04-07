import { chromium, FullConfig } from '@playwright/test';
import { ENV } from './../config/env';
async function globalSetup(config: FullConfig) {

  const browser = await chromium.launch({ headless: false }); // optional
  const page = await browser.newPage();
  await page.goto(ENV.BASE_URL)
  /*await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();*/
  await page.locator('#user-name').fill('ENV.USER_NAME');
  await page.locator('#password').fill('ENV.PASSWORD');
  await page.locator('#login-button').click();
  await page.waitForURL('await page.waitForURL(/dashboard/);')
;
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;