import { test, expect } from '@playwright/test';
import { ProductPage } from './Pages/productpage';
import { Mainpage } from './Pages/mainpage';
import { Categorypage } from './Pages/categorypage';

test('Verify product page', async ({ page }) => {
  const productPage = new ProductPage(page);
  const mainpage = new Mainpage(page);
  const categorypage = new Categorypage(page);

  await productPage.goTo();
  await mainpage.goToGroundCategory();
  await categorypage.goToFirstProduct();
  await productPage.validateProductPage();
});