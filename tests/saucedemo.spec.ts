import { test, expect, type Page } from '@playwright/test';

const PASSWORD = 'secret_sauce';

async function login(page: Page, username: string) {
  await page.goto('/');
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(PASSWORD);
  await page.getByTestId('login-button').click();
}

test('standard user can log in and sees the product list', async ({ page }) => {
  await login(page, 'standard_user');

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByTestId('inventory-item')).toHaveCount(6);
});

test('locked out user is rejected with an error message', async ({ page }) => {
  await login(page, 'locked_out_user');

  await expect(page.getByTestId('error')).toContainText('Sorry, this user has been locked out.');
  await expect(page).not.toHaveURL(/inventory\.html/);
});

test('standard user can buy a backpack', async ({ page }) => {
  await login(page, 'standard_user');

  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

  await page.getByTestId('shopping-cart-link').click();
  await expect(page.getByTestId('cart-list').getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');

  await page.getByTestId('checkout').click();
  await page.getByTestId('firstName').fill('Demo');
  await page.getByTestId('lastName').fill('User');
  await page.getByTestId('postalCode').fill('1011');
  await page.getByTestId('continue').click();
  await page.getByTestId('finish').click();

  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});
