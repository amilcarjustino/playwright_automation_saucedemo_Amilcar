import { test as setup } from "@playwright/test";
import { LoginPage } from "./PageObjects/LoginPage";
import { ProductsPage } from "./PageObjects/ProductsPage";

setup("authenticate standard user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.authenticateStandardUser();

  const productsPage = new ProductsPage(page);
  await productsPage.assertPageVisible();
});
