import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { SignupPage } from '../pages/signup';

export type TestFixtures = {
  LoginPage: LoginPage;
  signupPage: SignupPage;
};

export const test = base.extend<TestFixtures>({
  LoginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },
});
