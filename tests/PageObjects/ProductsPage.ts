import { expect, Locator, Page } from "@playwright/test";

const INVENTORY_URL = "/inventory.html";
const PAGE_HEADER_TITLE = "Swag Labs";
const PRODUCTS_TITLE = "Products";
const ADD_TO_CART_BUTTON_NAME = "Add to cart";
const INVENTORY_ITEM_DESCRIPTION_SELECTOR =
  '[data-test="inventory-item-description"]';
const SHOPPING_CART_LINK_SELECTOR = '[data-test="shopping-cart-link"]';

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
    await this.assertPageVisible();
  }

  async assertPageVisible() {
    await expect(this.page).toHaveURL(INVENTORY_URL);
    await expect(this.locatorPageTitle).toBeVisible();
    await expect(this.locatorProductsTitle).toBeVisible();
  }

  async addProductToCart(productName: string) {
    const product = this.page
      .locator(INVENTORY_ITEM_DESCRIPTION_SELECTOR)
      .filter({ hasText: productName });
    await product
      .getByRole("button", { name: ADD_TO_CART_BUTTON_NAME })
      .click();
  }

  async gotoCart() {
    await this.page.locator(SHOPPING_CART_LINK_SELECTOR).click();
  }
}
