import { test, expect } from '@playwright/test';
import { MainPage } from './Pages/mainpage';
import { ProductPage } from './Pages/productpage';
import { CategoryPage } from './Pages/categorypage';
import { CartPage } from './Pages/cartpage';


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