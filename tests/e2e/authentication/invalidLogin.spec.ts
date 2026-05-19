import { test } from "@playwright/test";
import { LoginPage } from "../../PageObjects/LoginPage";
import { users } from "../../testData/users";

const { username, password } = users.standard;

test.describe("Authentication negative scenarios", () => {
  test("Empty username", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login("", password);
    await loginPage.assertLoginErrorMessageVisible(
      "Epic sadface: Username is required",
    );
  });

  test("Empty password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(username, "");
    await loginPage.assertLoginErrorMessageVisible(
      "Epic sadface: Password is required",
    );
  });

  test("Invalid login credentials", async ({ page }) => {
    const expectedErrorMessage =
      "Epic sadface: Username and password do not match any user in this service";
    const loginPage = new LoginPage(page);

    await loginPage.login(username, "wrong_password");

    await loginPage.assertLoginErrorMessageVisible(expectedErrorMessage);
  });
});
