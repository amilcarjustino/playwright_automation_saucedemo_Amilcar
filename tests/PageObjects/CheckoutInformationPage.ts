import { expect, Locator, Page } from "@playwright/test";

const CHECKOUT_STEP_ONE_URL = "/checkout-step-one.html";
const PAGE_TITLE_STEP_ONE = "Checkout: Your Information";
const BUTTON_CONTINUE_LABEL = "Continue";
const FIRST_NAME_SELECTOR = '[data-test="firstName"]';
const LAST_NAME_SELECTOR = '[data-test="lastName"]';
const POSTAL_CODE_SELECTOR = '[data-test="postalCode"]';

export class CheckoutInformationPage {
  readonly page: Page;
  readonly locatorPageTitle: Locator;
  readonly locatorFirstName: Locator;
  readonly locatorLastName: Locator;
  readonly locatorPostalCode: Locator;
  readonly locatorContinueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorPageTitle = this.page.getByText(PAGE_TITLE_STEP_ONE);
    this.locatorFirstName = this.page.locator(FIRST_NAME_SELECTOR);
    this.locatorLastName = this.page.locator(LAST_NAME_SELECTOR);
    this.locatorPostalCode = this.page.locator(POSTAL_CODE_SELECTOR);
    this.locatorContinueButton = this.page.getByRole("button", { name: BUTTON_CONTINUE_LABEL });
  }

  async assertPageVisible() {
    await expect(this.page).toHaveURL(CHECKOUT_STEP_ONE_URL);
    await expect(this.locatorPageTitle).toBeVisible();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.locatorFirstName.fill(firstName);
    await this.locatorLastName.fill(lastName);
    await this.locatorPostalCode.fill(postalCode);
  }

  async clickContinueButton(){
    await this.locatorContinueButton.click()

  }
}
