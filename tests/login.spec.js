import { test, expect } from '@playwright/test';

// test('basic test', async ({ page }) => {
//     await page.goto('/signin');
//     await page.getByLabel('User Name').fill('user');
//     await page.getByLabel('Password').fill('password');
//     await page.getByText('Sign in').click();
//     // ...
//   });

const testUser = {
  username: 'romanyfayiez+2@hotmail.com',
  password: 'XXXXXXXX',
};

test('should navigate to login page from the home page', async ({ page }) => {
  await page.goto('/');
  const loginLink = await page.getByRole('link', { name: 'Login' });
  await loginLink.click();
  await expect(page).toHaveURL('/#/login');
});

test('login Page has the correct title', async ({ page }) => {
  await page.goto('/#/login');

  //   const pageHeading = page.getByRole('heading', { name: 'Login' });
  const element = await page.getByTestId(/Login/);
  await expect(element).toHaveText(/Login/);
});

test('should display error messages', async ({ page }) => {
  await page.goto('/#/login');
  const userNameInput = await page.getByRole('textbox', { name: 'email' });
  const passwordInput = await page.getByRole('textbox', { name: 'password' });
  const submitBtn = await page.getByRole('button', { name: 'submit' });

  await userNameInput.fill(testUser.username);
  await passwordInput.fill(testUser.password);
  await submitBtn.click();

  const errorMsg = await page.getByText('Incorrect username or password.');
  await expect(errorMsg).toBeVisible();
});
