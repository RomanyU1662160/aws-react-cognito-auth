// @ts-check
import { test, expect } from '@playwright/test';

test('has correct title locally', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Amplify-auth/);
});

test('has correct heading locally', async ({ page }) => {
  await page.goto('/');
  const title = page.getByRole('heading', { name: 'Home Page' });

  // Expect a title "to contain" a substring.
  await expect(title).toBeVisible();
  await expect(title).toHaveText(/Home Page/);
});
