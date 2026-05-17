import { test as setup } from '@playwright/test';
import { LoginPage } from './PageObjects/LoginPage';

setup('login standard user', async ({page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginStandardUser();
});