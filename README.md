
# Playwright Automation - SauceDemo

Automated end-to-end test suite for the SauceDemo application using Playwright and the Page Object Model (POM) pattern.

## 🚀 Project Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run all tests
npx playwright test

# 3. View test report
npx playwright show-report

# 4. Run tests in UI mode (interactive)
npx playwright test --ui
```

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