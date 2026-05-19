# Playwright Automation - SauceDemo [Amilcar]

An example of a automated end-to-end test suite for the SauceDemo website using Playwright and the Page Object Model (POM) pattern.

## 📌 Prerequisites

- Node.js must be installed locally.
- Minimum supported Node.js version: `18.x`.
- npm is required and is normally installed with Node.js.

## 🚀 Project Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browser binaries
npx playwright install

# 3. Copy environment config and update if needed
cp .env.example .env

# 4. Run all tests
npx playwright test

# 5. View the HTML report
npx playwright show-report

# 6. Run tests in UI mode (interactive)
npx playwright test --ui
```

## ⚙️ Environment Configuration

This project loads local environment variables from a `.env` file at runtime.

- Copy `.env.example` to `.env` before running tests.
- The configuration is loaded in `playwright.config.ts` using `dotenv.config()`.
- `BASE_URL` is read from the `.env` file and used as the Playwright `baseURL`.
- If `BASE_URL` is not set, the default value is `https://www.saucedemo.com`.

Example `.env` contents:

```env
BASE_URL=https://www.saucedemo.com
```

## 🔐 Auth Storage Configuration

The project uses Playwright auth storage state to persist a logged-in session for the standard user.

- Login flow and storage capture are implemented in `tests/e2e/authentication/authenticate.setup.ts` and page objects.
- After a successful login, `page.context().storageState({ path: '.auth/authStandardUser.json' })` saves the browser context cookies and local storage.
- The `login setup` project in `playwright.config.ts` runs before the browser projects and creates the authenticated storage state.
- Browser projects reuse `.auth/authStandardUser.json` so tests can execute from an authenticated session.
- The `.auth` folder is excluded from version control and is kept out of Git using `.gitignore`.

## 📋 Project Structure

### `tests/e2e/`
Contains end-to-end test files organized by feature area:

- `authentication/authenticate.setup.ts` - Setup file for standard user authentication
- `authentication/invalidLogin.spec.ts` - Invalid login test cases
- `products/purchaseProduct.spec.ts` - Product purchase flow test cases

### `tests/PageObjects/`
Page Object Model implementations for reusable UI interactions:

- `LoginPage.ts` - Encapsulates login page interactions and selectors
- `ProductsPage.ts` - Encapsulates product listing page interactions
- `CartPage.ts` - Encapsulates cart page interactions
- `CheckoutInformationPage.ts` - Encapsulates checkout information page interactions
- `CheckoutOverview.ts` - Encapsulates checkout overview interactions
- `CheckoutConfirmationPage.ts` - Encapsulates checkout confirmation page interactions

### `tests/support/`
Support files and shared test types:

- `types.ts` - Shared TypeScript types used by tests
- `tests/support` contains support constants and shared runtime types for the test suite.

### `tests/testData/`
Test data files used by the suite:

- `users.ts` - Credentials and user data for the configured tests

## 🌐 Configured Browsers

The suite is configured for normal web execution on desktop browser engines:

- `chromium` - Desktop Chrome
- `firefox` - Desktop Firefox
- `webkit` - Desktop Safari

These are the configured browser projects in `playwright.config.ts` and run as normal web tests on the SauceDemo application.

## 🏗️ Page Object Model (POM) Approach

This project uses the **Page Object Model** design pattern, which provides several benefits:

- **Maintainability**: Locators and interactions are centralized in page objects, making tests easier to update when the UI changes
- **Reusability**: Common page interactions are defined once and reused across multiple tests
- **Readability**: Tests are more readable as they use descriptive methods instead of raw selectors
- **Scalability**: Easy to add new page objects as the test suite grows

Each page object follows a simple structure:
- Constants and selectors are declared at the top of the class
- Locators are created in the constructor using `page.locator(...)` or `page.getByText(...)`
- Action methods use those locators to perform page interactions

Why constructor-based locators are preferable:
- One place for selectors: changing a selector only requires editing the constructor, not every test method
- Lazy evaluation: Playwright only resolves the locator when the action runs, so element lookup is safe even during page load
- Reusable across methods: the same locator can be used by multiple actions without repeating the selector
- Cleaner separation: constructor setup stays separate from page behavior, making page objects easier to read and maintain

Typical page object flow:
1. Declare selector constants and locator fields
2. Initialize locators once in the constructor
3. Implement action methods like `login()`, `addToCart()`, `checkout()` and assertion methods like `assertPageVisible()`, `assertLoginErrorMessageVisible()`
4. Keep page details inside the object so tests express user behavior instead of selector logic

## 🛠️ Tech Stack

- **Playwright** - Web automation and testing framework
- **TypeScript** - Type-safe test development
- **Node.js** - Runtime environment