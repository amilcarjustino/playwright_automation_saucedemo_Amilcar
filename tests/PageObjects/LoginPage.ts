import { expect, Locator, Page } from "@playwright/test";
import { users } from "../testData/users";

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
    this.locatorPageHeader = page.getByRole("heading", {
      name: LOGIN_HEADER_TITLE,
    });
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

  async authenticateStandardUser() {
    const { username, password } = users.standard;
    await this.login(username, password);

    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.

    // Alternatively, you can wait until the page reaches a state where all cookies are set.

    // End of authentication steps.

    await this.page.context().storageState({ path: authFile });
  }
}
