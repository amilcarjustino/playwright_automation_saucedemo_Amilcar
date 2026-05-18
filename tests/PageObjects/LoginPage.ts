import { expect, Locator, Page } from "@playwright/test";
import { users } from "../testData/users";
import type { VoidCallbackFunction } from "../support/types";

const authFile = ".auth/authStandardUser.json";
const LOGIN_URL = "/";
const LOGIN_HEADER_TITLE = "Swag Labs";

const USERNAME_SELECTOR = '[data-test="username"]';
const PASSWORD_SELECTOR = '[data-test="password"]';
const LOGIN_BUTTON_SELECTOR = '[data-test="login-button"]';

export class LoginPage {
  readonly page: Page;
  readonly loginUrl: string = LOGIN_URL;
  readonly locatorPageHeader: Locator;
  readonly locatorUsernameInput: Locator;
  readonly locatorPasswordInput: Locator;
  readonly locatorLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorPageHeader = page.getByText(LOGIN_HEADER_TITLE);
    this.locatorUsernameInput = page.locator(USERNAME_SELECTOR);
    this.locatorPasswordInput = page.locator(PASSWORD_SELECTOR);
    this.locatorLoginButton = page.locator(LOGIN_BUTTON_SELECTOR);
  }

  async gotoLoginPage() {
    await this.page.goto(this.loginUrl);
    await this.assertPageVisible();
  }

  async assertPageVisible() {
    await expect(this.page).toHaveURL(this.loginUrl);
    await expect(this.locatorPageHeader).toBeVisible();
    await expect(this.locatorLoginButton).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.gotoLoginPage();
    await this.locatorUsernameInput.fill(username);
    await this.locatorPasswordInput.fill(password);
    await this.locatorLoginButton.click();
  }

  async authenticateStandardUser(postLoginAssertion: VoidCallbackFunction) {
    const { username, password } = users.standard;
    await this.login(username, password);
    // Wait for the final URL to ensure that the cookies are actually set.
    await postLoginAssertion();

    await this.page.context().storageState({ path: authFile });
  }
}
