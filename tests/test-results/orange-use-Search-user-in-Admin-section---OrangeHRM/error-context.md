# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: orange\use.spec.ts >> Search user in Admin section - OrangeHRM
- Location: orange\use.spec.ts:3:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index/"
Received: "about:blank"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    9 × unexpected value "about:blank"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Search user in Admin section - OrangeHRM', async ({ page }) => {
  4  | 
  5  | 
> 6  |   await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index/');
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  7  |   await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  8  |     const adminMenu = page.getByRole('link', { name: 'Admin' });
  9  |   await adminMenu.click();
  10 |   await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  11 | 
  12 |   const searchUsername = page.getByPlaceholder('Username');
  13 |   const searchButton = page.getByRole('button', { name: 'Search' });
  14 |   const user = 'Admin';
  15 |   await searchUsername.fill(user);
  16 |   await searchButton.click();
  17 |   const searchResult = page.locator('.oxd-table-body').getByText(user);
  18 | 
  19 |   await expect(searchResult).toBeVisible();
  20 | 
  21 | });
```