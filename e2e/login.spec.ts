import { expect } from '@playwright/test';
import { test } from './fixtures/pages';

const mockUser = {
  email: 'romanyfayiez@hotmail.com',
  password: '123456',
};

test('navigate to login page', async ({ LoginPage }) => {
  await LoginPage.gotToLogin();
  await expect(LoginPage.loginLink).toBeVisible();
  await expect(LoginPage.page).toHaveURL('/#/login');
});

test('Should validate empty form submission on the FE', async ({
  LoginPage,
}) => {
  await LoginPage.assertFEErrMsg();
});

test('Should validate form submission on the BE', async ({ LoginPage }) => {
  await LoginPage.fillLoginForm({
    email: mockUser.email,
    password: mockUser.password,
  });

  await LoginPage.submitLoginForm();
  const BEErrorMsg = LoginPage.page.getByText(
    'Incorrect username or password.'
  );
  await expect(BEErrorMsg).toBeVisible();
});
