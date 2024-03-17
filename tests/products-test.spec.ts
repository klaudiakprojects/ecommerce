import { test, expect } from '@playwright/test';
import { ProductPage } from './Pages/productpage';
import { MainPage } from './Pages/mainpage';
import { CategoryPage } from './Pages/categorypage';

test('Verify product page', async ({ page }) => {
  const productPage = new ProductPage(page);
  const mainpage = new MainPage(page);
  const categorypage = new CategoryPage(page);

  await productPage.goTo();
  await mainpage.goToGroundCategory();
  await categorypage.goToFirstProduct();
  await productPage.validateProductPage();
});

test('Verify sorting', async ({ page }) => {
  const productPage = new ProductPage(page);
  const mainpage = new MainPage(page);
  const categorypage = new CategoryPage(page);

  const productsNamesZA = {
    ground: [
      "Coffee Panama",
      "Coffee Mexico",
      "Coffee Gwatemala",
      "Coffee Costa Rica",
    ]
  };

  const productsNamesAZ = [...productsNamesZA.ground].reverse();

  await productPage.goTo();
  await mainpage.goToGroundCategory();
  await categorypage.validateSortingFromAToZ(productsNamesAZ);
  await categorypage.validateSortingFromZToA(productsNamesZA.ground);
  await categorypage.validateSortingHighToLowPrice();
  await categorypage.validateSortingLowToHighPrice();
});