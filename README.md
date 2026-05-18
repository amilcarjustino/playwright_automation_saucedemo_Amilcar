
# Playwright Automation - SauceDemo

Automated end-to-end test suite for the SauceDemo application using Playwright and the Page Object Model (POM) pattern.

## 🚀 Project Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment config and update if needed
cp .env.example .env

# 3. Run all tests
npx playwright test

# 4. View test report
npx playwright show-report

# 5. Run tests in UI mode (interactive)
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

- Login flow and storage capture are implemented in `tests/PageObjects/LoginPage.ts`.
- After a successful login, `page.context().storageState({ path: '.auth/authStandardUser.json' })` saves the browser context cookies and local storage.
- The `tests/authenticate.setup.ts` file runs a dedicated setup to authenticate the standard user once before the browser projects execute.
- This means browser projects can reuse the authenticated state and avoid repeating login actions during test execution.

## 📋 Project Structure

### `tests/`
Contains all test specifications and page objects:

- **`*.spec.ts`** - Test files with test cases and assertions
  - `login.spec.ts` - Login flow tests
  - `checkout.spec.ts` - Checkout flow tests
  - `example.spec.ts` - Example tests
  - `login.setup.ts` - Setup/authentication helper

- **`PageObjects/`** - Page Object Model implementations
  - `LoginPage.ts` - Encapsulates login page interactions and selectors

## 🏗️ Page Object Model (POM) Approach

This project uses the **Page Object Model** design pattern, which provides several benefits:

- **Maintainability**: Locators and interactions are centralized in page objects, making tests easier to update when the UI changes
- **Reusability**: Common page interactions are defined once and reused across multiple tests
- **Readability**: Tests are more readable as they use descriptive methods instead of raw selectors
- **Scalability**: Easy to add new page objects as the test suite grows

Each page object encapsulates:
- Element selectors/locators
- Page-specific actions (methods)
- Navigation logic

## 🛠️ Tech Stack

- **Playwright** - Web automation and testing framework
- **TypeScript** - Type-safe test development
- **Node.js** - Runtime environment