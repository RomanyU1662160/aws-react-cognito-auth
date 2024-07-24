import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly emailErrMsg: Locator;
  private readonly passwordErrMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('Your email');
    this.passwordInput = page.getByPlaceholder('Your password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.emailErrMsg = page.getByText('Invalid email');
    this.passwordErrMsg = page.getByText('Password must be at least 2');
  }

  async submitEmptyLoginForm() {
    await this.submitButton.click();
  }

  async assertFEErrMsg() {
    await this.submitEmptyLoginForm();
    await expect(this.emailErrMsg).toBeVisible();
    await expect(this.passwordErrMsg).toBeVisible();
  }
}
