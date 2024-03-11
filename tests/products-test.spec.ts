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

test('Verify sorting', async ({ page }) => {
  const productPage = new ProductPage(page);
  const mainpage = new Mainpage(page);
  const categorypage = new Categorypage(page);

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
});