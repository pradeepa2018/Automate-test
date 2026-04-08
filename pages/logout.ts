import { Page } from '@playwright/test';

export class LogoutPage {
  readonly page: Page;
  readonly menuButton;
  readonly logoutLink;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn'); 
    this.logoutLink = page.locator('#logout_sidebar_link');   
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
}