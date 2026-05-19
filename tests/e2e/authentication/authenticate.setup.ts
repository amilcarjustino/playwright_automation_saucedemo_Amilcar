import { test as setup } from "@playwright/test";
import { LoginPage } from "../../PageObjects/LoginPage";
import { ProductsPage } from "../../PageObjects/ProductsPage";

setup("authenticate standard user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const assertLoginSuccessFunction = async () =>
    productsPage.assertPageVisible();

  await loginPage.authenticateStandardUser(assertLoginSuccessFunction);
});
