import { expect, Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async assertPageVisible() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(this.page.getByText("Swag Labs")).toBeVisible();
    await expect(this.page.getByText("Products")).toBeVisible();
  }

}