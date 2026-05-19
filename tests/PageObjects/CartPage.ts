import { expect, Locator, Page } from "@playwright/test";

const CART_URL = "/cart.html";
const CART_TITLE_TEXT = "Your Cart";
const REMOVE_BUTTON_TEXT = "Remove";
const CHECKOUT_BUTTON_TEXT = "Checkout";
const SELECTOR_ITEM_QUANTITY = '[data-test="item-quantity"]';
const SELECTOR_ITEM_NAME = '[data-test="inventory-item-name"]';
const SELECTOR_ITEM_DESC = '[data-test="inventory-item-desc"]';
const SELECTOR_ITEM_PRICE = '[data-test="inventory-item-price"]';

export class CartPage {
  readonly page: Page;
  readonly locatorCartTitle: Locator;
  readonly locatorRemoveButton: Locator;
  readonly locatorCheckoutButton: Locator;
  readonly locatorItemQuantity: Locator;
  readonly locatorItemName: Locator;
  readonly locatorItemDescription: Locator;
  readonly locatorItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorCartTitle = this.page.getByText(CART_TITLE_TEXT);
    this.locatorRemoveButton = this.page.getByRole("button", {
      name: REMOVE_BUTTON_TEXT,
    });
    this.locatorCheckoutButton = this.page.getByRole("button", {
      name: CHECKOUT_BUTTON_TEXT,
    });
    this.locatorItemQuantity = this.page.locator(SELECTOR_ITEM_QUANTITY);
    this.locatorItemName = this.page.locator(SELECTOR_ITEM_NAME);
    this.locatorItemDescription = this.page.locator(SELECTOR_ITEM_DESC);
    this.locatorItemPrice = this.page.locator(SELECTOR_ITEM_PRICE);
  }

  async assertPageVisible() {
    await expect(this.page).toHaveURL(CART_URL);
    await expect(this.locatorCartTitle).toBeVisible();
    await expect(this.locatorCheckoutButton).toBeVisible();
  }

  async assertProductInCart(
    productName: string,
    description: string,
    quantity: string,
    price: number,
  ) {
    await expect(this.locatorItemQuantity).toHaveText(quantity);
    await expect(this.locatorItemName).toHaveText(productName);
    await expect(this.locatorItemDescription).toHaveText(description);
    await expect(this.locatorItemPrice).toHaveText(`$${price.toFixed(2)}`);

    await expect(this.locatorRemoveButton).toBeVisible();
  }

  async clickCheckout() {
    await this.locatorCheckoutButton.click();
  }
}
