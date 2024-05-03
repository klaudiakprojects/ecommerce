import { test, expect } from '@playwright/test';
import { MainPage } from './Pages/mainpage';
import { ProductPage } from './Pages/productpage';
import { CategoryPage } from './Pages/categorypage';
import { CartPage } from './Pages/cartpage';
import { Client } from 'pg';

async function clearDatabase() {
    const client = new Client({
      user: 'postgres',
      password: 'postgres',
      database: 'products'
    })
    await client.connect();
  
    const res = await client.query('DELETE FROM cart_items');
    await client.end();
  };

  test.beforeEach(async () => {
    await clearDatabase();  
  });
  
  test.afterEach(async () => {
    await clearDatabase();
  });

test('Add product to the cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const mainPage = new MainPage(page);
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);

  
    await productPage.goTo();
    await mainPage.goToGroundCategory();
    await categoryPage.goToFirstProduct();
    await productPage.validateProductPage();
    await cartPage.addProductToTheCart();
});

test('Add two the same products to the cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const mainPage = new MainPage(page);
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);

  
    await productPage.goTo();
    await mainPage.goToGroundCategory();
    await categoryPage.goToFirstProduct();
    await productPage.validateProductPage();
    await cartPage.addTheSameProductToTheCartTwice();
});

test('Add two different products to the cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const mainPage = new MainPage(page);
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);

    await productPage.goTo();
    await mainPage.goToGroundCategory();
    await categoryPage.goToFirstProduct();
    await productPage.validateProductPage();
    await cartPage.addTwoDifferentProductsToTheCart();
});

test('Remove one product from the cart', async ({ page }) => {
  const productPage = new ProductPage(page);
  const mainPage = new MainPage(page);
  const categoryPage = new CategoryPage(page);
  const cartPage = new CartPage(page);


  await productPage.goTo();
  await mainPage.goToGroundCategory();
  await categoryPage.goToFirstProduct();
  await productPage.validateProductPage();
  await cartPage.addProductToTheCart();
  await cartPage.removeOneProductFromTheCart();
});

test('Remove two the same products to the cart', async ({ page }) => {
  const productPage = new ProductPage(page);
  const mainPage = new MainPage(page);
  const categoryPage = new CategoryPage(page);
  const cartPage = new CartPage(page);


  await productPage.goTo();
  await mainPage.goToGroundCategory();
  await categoryPage.goToFirstProduct();
  await productPage.validateProductPage();
  await cartPage.addTheSameProductToTheCartTwice();
  await cartPage.removeTwoTheSameProductsFromTheCart();
});