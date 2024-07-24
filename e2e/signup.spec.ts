import { expect } from '@playwright/test';
import { test } from './fixtures/pages';

test('should navigate to signup page', async ({ signupPage }) => {
  await signupPage.gotoSignUpPage();
  await expect(signupPage.page).toHaveURL('/#/signup');
});

test('should display validation message if form is empty', async ({
  signupPage,
}) => {
  await signupPage.gotoSignUpPage();
  await signupPage.submitSignupForm();
  await expect(signupPage.emailErrMsg).toBeVisible();
  await expect(signupPage.passwordErrMsg).toBeVisible();
});
