import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly loginLink: Locator;
  readonly signupLink: Locator;
  readonly loginURL: string;
  readonly signupURL: string;

  constructor(page: Page) {
    this.page = page;

    this.logo = page.getByRole('link', { name: 'LOGO' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.loginLink = page.getByRole('menuitem', { name: 'Signup' });
    this.loginURL = '/#/login';
    this.signupURL = '/#/signup';
  }

  private async gotToLogin() {
    await this.loginLink.click();
  }

  private async gotToSignup() {
    await this.signupLink.click();
  }
}
