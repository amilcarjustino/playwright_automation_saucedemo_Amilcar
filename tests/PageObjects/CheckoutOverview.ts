import { expect, Locator, Page } from "@playwright/test";

const CHECKOUT_OVERVIEW_URL = "/checkout-step-two.html";
const PAGE_TITLE_OVERVIEW = "Checkout: Overview";
const BUTTON_FINISH_LABEL = "Finish";
const SELECTOR_ITEM_QUANTITY = '[data-test="item-quantity"]';
const SELECTOR_ITEM_NAME = '[data-test="inventory-item-name"]';
const SELECTOR_ITEM_DESC = '[data-test="inventory-item-desc"]';
const SELECTOR_ITEM_PRICE = '[data-test="inventory-item-price"]';
const SELECTOR_PAYMENT_INFO = '[data-test="payment-info-value"]';
const SELECTOR_SHIPPING_INFO = '[data-test="shipping-info-value"]';
const SELECTOR_SUBTOTAL_LABEL = '[data-test="subtotal-label"]';
const SELECTOR_TAX_LABEL = '[data-test="tax-label"]';
const SELECTOR_TOTAL_LABEL = '[data-test="total-label"]';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly locatorOverviewTitle: Locator;
  readonly locatorItemQuantity: Locator;
  readonly locatorItemName: Locator;
  readonly locatorItemDescription: Locator;
  readonly locatorItemPrice: Locator;
  readonly locatorPaymentInformation: Locator;
  readonly locatorShippingInformation: Locator;
  readonly locatorSubtotalLabel: Locator;
  readonly locatorTaxLabel: Locator;
  readonly locatorTotalLabel: Locator;
  readonly locatorFinishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorOverviewTitle = this.page.getByText(PAGE_TITLE_OVERVIEW);
    this.locatorItemQuantity = this.page.locator(SELECTOR_ITEM_QUANTITY);
    this.locatorItemName = this.page.locator(SELECTOR_ITEM_NAME);
    this.locatorItemDescription = this.page.locator(SELECTOR_ITEM_DESC);
    this.locatorItemPrice = this.page.locator(SELECTOR_ITEM_PRICE);
    this.locatorPaymentInformation = this.page.locator(SELECTOR_PAYMENT_INFO);
    this.locatorShippingInformation = this.page.locator(SELECTOR_SHIPPING_INFO);
    this.locatorSubtotalLabel = this.page.locator(SELECTOR_SUBTOTAL_LABEL);
    this.locatorTaxLabel = this.page.locator(SELECTOR_TAX_LABEL);
    this.locatorTotalLabel = this.page.locator(SELECTOR_TOTAL_LABEL);
    this.locatorFinishButton = this.page.getByRole("button", {
      name: BUTTON_FINISH_LABEL,
    });
  }

  async assertPageVisible() {
    await expect(this.page).toHaveURL(CHECKOUT_OVERVIEW_URL);
    await expect(this.locatorOverviewTitle).toBeVisible();
  }

  async assertOverviewDetails(
    productName: string,
    description: string,
    quantity: string,
    price: number,
    paymentInformation: string,
    shippingInformation: string,
    itemTotal: number,
    tax: number,
  ) {
    const totalPrice = itemTotal + tax;
    await expect(this.locatorItemQuantity).toHaveText(quantity);
    await expect(this.locatorItemName).toHaveText(productName);
    await expect(this.locatorItemDescription).toHaveText(description);
    await expect(this.locatorItemPrice).toHaveText(`$${price.toFixed(2)}`);

    await expect(this.locatorPaymentInformation).toHaveText(paymentInformation);
    await expect(this.locatorShippingInformation).toHaveText(
      shippingInformation,
    );
    await expect(this.locatorSubtotalLabel).toHaveText(
      `Item total: $${itemTotal.toFixed(2)}`,
    );
    await expect(this.locatorTaxLabel).toHaveText(`Tax: $${tax.toFixed(2)}`);
    await expect(this.locatorTotalLabel).toHaveText(`Total: $${totalPrice.toFixed(2)}`);
  }

  async clickFinishButton() {
    await this.locatorFinishButton.click();
  }
}
