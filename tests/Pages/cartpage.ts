import { expect, Locator, Page } from '@playwright/test';
import allProducts from '../../src/Components/Assets/data.js';
import { waitFor } from '@testing-library/react';

export class CartPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly productDescription: Locator;
    readonly productImage: Locator;
    readonly goToCartButton: Locator;
    readonly cartProductTitle: Locator;
    readonly cartProductPrice: Locator;
    readonly cartProductQuantity: Locator;
    readonly cartTotalProductsPrice: Locator;
    readonly product: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('.product-details p');
        this.productPrice = page.locator('.product-new-price span');
        this.addToCartButton = page.locator('.add-to-cart');
        this.productDescription = page.locator('.product-description');
        this.productImage = page.locator('.product-image');
        this.goToCartButton = page.locator('.cart-icon a');
        this.cartProductTitle = page.locator('.product-name');
        this.cartProductPrice = page.locator('.product-price');
        this.cartProductQuantity = page.locator('.product-quantity');
        this.cartTotalProductsPrice = page.locator('.summary-container');
        this.product = page.locator('.item');
    };

    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    };

    async addProductToTheCart(): Promise<void> {
       const [productPageTitle, productPagePrice] = await Promise.all([
            this.productTitle.innerText(),
            this.productPrice.innerText()
        ]);
        expect(this.addToCartButton).toContainText('ADD TO CART');
        await this.addToCartButton.click();
        await this.goToCartButton.click();
        expect(await this.cartProductTitle.innerText()).toContain(productPageTitle);
        expect(await this.cartProductPrice.innerText()).toContain(productPagePrice);
        expect(await this.cartProductQuantity.innerText()).toEqual('Quantity: 1');
        expect(await this.cartTotalProductsPrice.innerText()).toEqual('Total Cart Price: ' + productPagePrice);
    };

    async addTheSameProductToTheCartTwice(): Promise<void> {
        const [productPageTitle, productPagePrice] = await Promise.all([
            this.productTitle.innerText(),
            Number((await this.productPrice.innerText()).split(" ")[0]),
        ]);
        expect(this.addToCartButton).toContainText('ADD TO CART');
        await this.addToCartButton.dblclick();
        await this.goToCartButton.click();
        const totalProductsPriceCart =  Number((await this.cartTotalProductsPrice.innerText()).split(" ")[0]);
        expect(await this.cartProductTitle.innerText()).toContain(productPageTitle);
        expect(Number((await this.cartProductPrice.innerText()).split(" ")[0])).toEqual(productPagePrice);
        expect(await this.cartProductQuantity.innerText()).toEqual('Quantity: 2');
        expect(Number(await this.cartTotalProductsPrice.innerText())).toEqual(totalProductsPriceCart);
    };

    async addTwoDifferentProductsToTheCart(): Promise<void> {
        const [productPageTitle, productPagePrice] = await Promise.all([
            this.productTitle.innerText(),
            Number((await this.productPrice.innerText()).split(" ")[0])
        ]);
        expect(this.addToCartButton).toContainText('ADD TO CART');
        await this.addToCartButton.click();
        await this.page.goBack();
        await this.product.nth(2).click();
        const [productPageTitle2, productPagePrice2] = await Promise.all([
            this.productTitle.innerText(),
            Number((await this.productPrice.innerText()).split(" ")[0])
        ]);
        await this.addToCartButton.click();
        await this.goToCartButton.click();
        const fullPriceOfTwoProducts = Number(productPagePrice + productPagePrice2).toFixed(2);
        const totalProductsPriceCart =  Number((await this.cartTotalProductsPrice.innerText()).split(" ")[0]);
        expect(Number(await this.cartTotalProductsPrice.innerText())).toEqual(totalProductsPriceCart);
    };
};