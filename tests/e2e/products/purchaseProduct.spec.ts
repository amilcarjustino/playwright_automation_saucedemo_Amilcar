import { test } from "@playwright/test";
import { ProductsPage } from "../../PageObjects/ProductsPage";
import { CartPage } from "../../PageObjects/CartPage";
import { CheckoutInformationPage } from "../../PageObjects/CheckoutInformationPage";
import { CheckoutConfirmationPage } from "../../PageObjects/CheckoutConfirmationPage";
import { CheckoutOverviewPage } from "../../PageObjects/CheckoutOverview";


test.describe("Product purchase", () => {
  test("Purchase a product", async ({ page }) => {
    const product = {
      name: "Sauce Labs Backpack",
      description:
        "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
      quantity: "1",
      price: 29.99,
      paymentInformation: "SauceCard #31337",
      shippingInformation: "Free Pony Express Delivery!",
      itemTotal: 29.99,
      tax: 2.40,
    };
    const userInformation = {
      firstName: "Amil",
      lastName: "Car",
      postalCode: "2415",
    };

    const products = new ProductsPage(page);
    await products.goto();
    await products.addProductToCart(product.name);
    await products.clickGotoCart();

    const cart = new CartPage(page);
    await cart.assertPageVisible();
    await cart.assertProductInCart(
      product.name,
      product.description,
      product.quantity,
      product.price,
    );
    await cart.clickCheckout();

    const checkoutInformation = new CheckoutInformationPage(page);
    await checkoutInformation.assertPageVisible();
    await checkoutInformation.fillCustomerInformation(
      userInformation.firstName,
      userInformation.lastName,
      userInformation.postalCode,
    );
    await checkoutInformation.clickContinueButton();

    const checkoutOverview = new CheckoutOverviewPage(page);
    await checkoutOverview.assertPageVisible();
    await checkoutOverview.assertOverviewDetails(
      product.name,
      product.description,
      product.quantity,
      product.price,
      product.paymentInformation,
      product.shippingInformation,
      product.itemTotal,
      product.tax,
    );
    await checkoutOverview.clickFinishButton();

    const confirmation = new CheckoutConfirmationPage(page);
    await confirmation.assertPageVisible();
  });
});
