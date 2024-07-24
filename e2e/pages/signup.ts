import { Locator, Page } from '@playwright/test';
import { BasePage } from './home';

export class SignupPage extends BasePage {
  readonly signupFormTitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly emailErrMsg: Locator;
  readonly passwordErrMsg: Locator;
  readonly signupURL: Locator;

  constructor(page: Page) {
    super(page);
    this.signupURL = page.getByRole('link', { name: 'Signup' });
    this.signupFormTitle = page.getByRole('heading', { name: 'Signup' });
    this.emailInput = page.getByPlaceholder('Add your email');
    this.passwordInput = page.getByPlaceholder('Add your password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.emailErrMsg = page.getByText('Invalid Email');
    this.passwordErrMsg = page.getByText(
      'Password must be at least 2 characters.'
    );
  }

  async gotoSignUpPage() {
    //  this.page.pause();
    await this.page.goto(this.URLs.home);
    //  await this.page.goto(this.URLs.signup);
    await this.signupURL.click();
  }

  async fillSignupForm({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitSignupForm() {
    await this.submitButton.click();
  }
}
