import { expect, Locator, Page } from "@playwright/test";

const CHECKOUT_COMPLETE_URL = "/checkout-complete.html";
const SELECTOR_TITLE = '[data-test="title"]';
const SELECTOR_PONY_EXPRESS = '[data-test="pony-express"]';
const SELECTOR_COMPLETE_HEADER = '[data-test="complete-header"]';
const SELECTOR_COMPLETE_TEXT = '[data-test="complete-text"]';
const SELECTOR_BACK_TO_PRODUCTS = '[data-test="back-to-products"]';

export class CheckoutConfirmationPage {
  readonly page: Page;
  readonly locatorTitle: Locator;
  readonly locatorPonyExpress: Locator;
  readonly locatorCompleteHeader: Locator;
  readonly locatorCompleteText: Locator;
  readonly locatorBackToProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorTitle = this.page.locator(SELECTOR_TITLE);
    this.locatorPonyExpress = this.page.locator(SELECTOR_PONY_EXPRESS);
    this.locatorCompleteHeader = this.page.locator(SELECTOR_COMPLETE_HEADER);
    this.locatorCompleteText = this.page.locator(SELECTOR_COMPLETE_TEXT);
    this.locatorBackToProducts = this.page.locator(SELECTOR_BACK_TO_PRODUCTS);
  }

  async assertPageVisible() {
    await expect(this.page).toHaveURL(CHECKOUT_COMPLETE_URL);
    await expect(this.locatorTitle).toBeVisible();
    await expect(this.locatorPonyExpress).toBeVisible();
    await expect(this.locatorCompleteHeader).toBeVisible();
    await expect(this.locatorCompleteText).toBeVisible();
    await expect(this.locatorBackToProducts).toBeVisible();
  }

  async backToProducts() {
    await this.locatorBackToProducts.click();
  }
}
