import { expect, Page } from "@playwright/test";
import { users } from "../testData/users";

export class LoginPage {
  readonly page: Page;
  readonly loginUrl: string = "https://www.saucedemo.com/";

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLoginPage() {
    await this.page.goto(this.loginUrl);
  }

  async assertPageVisible() {
    await expect(this.page.getByText("Swag Labs")).toBeVisible();
    await expect(this.page.locator('[data-test="username"]')).toBeVisible();
    await expect(this.page.locator('[data-test="password"]')).toBeVisible();
    await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
  }

  async typeUsername(username: string) {
    await this.page.locator('[data-test="username"]').fill(username);
  }

  async typePassword(password: string) {
    await this.page.locator('[data-test="password"]').fill(password);
  }

  async clickLoginButton() {
    await this.page.locator('[data-test="login-button"]').click();
  }

  async loginStandardUser() {
    const standardCredentials = users.standard;

    await this.gotoLoginPage();
    await this.typeUsername(standardCredentials.username);
    await this.typePassword(standardCredentials.password);
    await this.clickLoginButton();
  }
}
