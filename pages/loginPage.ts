
import { Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private usernameInput = () => this.page.locator('#user-name');
  private passwordInput = () => this.page.locator('#password');
  private loginButton = () => this.page.locator('#login-button');

  async goto() {
    await this.page.goto(process.env.BASE_URL ?? '');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }
}