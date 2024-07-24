import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly loginLink: Locator;
  readonly signupLink: Locator;

  readonly URLs = {
    home: '/',
    login: '/#/login',
    signup: '/#/signup',
  };
  constructor(page: Page) {
    this.page = page;

    this.logo = page.getByRole('link', { name: 'LOGO' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.signupLink = page.getByRole('link', { name: 'Signup' });
  }
}
