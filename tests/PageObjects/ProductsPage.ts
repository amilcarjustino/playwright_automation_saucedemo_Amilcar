import { expect, Locator, Page } from "@playwright/test";

const INVENTORY_URL = "/inventory.html";
const PAGE_HEADER_TITLE = "Swag Labs";
const PRODUCTS_TITLE = "Products";

export class ProductsPage {
  readonly page: Page;
  readonly locatorPageTitle: Locator;
  readonly locatorProductsTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorPageTitle = this.page.getByText(PAGE_HEADER_TITLE);
    this.locatorProductsTitle = this.page.getByText(PRODUCTS_TITLE);
  }

  async goto() {
    await this.page.goto(INVENTORY_URL);
  }

  async assertPageVisible() {
    await expect(this.page).toHaveURL(INVENTORY_URL);
    await expect(this.locatorPageTitle).toBeVisible();
    await expect(this.locatorProductsTitle).toBeVisible();
  }
}
