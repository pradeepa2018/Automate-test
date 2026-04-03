import { test, expect } from '@playwright/test';

test('Search user in Admin section - OrangeHRM', async ({ page }) => {

await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
console.log(await page.url());
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    const adminMenu = page.getByRole('link', { name: 'Admin' });
  await adminMenu.click();
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  
  const searchUsername = page.getByPlaceholder('Username');
  const searchButton = page.getByRole('button', { name: 'Search' });
  const user = 'Admin';
  await searchUsername.fill(user);
  await searchButton.click();
  const searchResult = page.locator('.oxd-table-body').getByText(user);

  await expect(searchResult).toBeVisible();

});