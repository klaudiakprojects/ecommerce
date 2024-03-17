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
    }


    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    };

    async addProductToTheCart(): Promise<void> {
        const productPageTitle = await this.productTitle.innerText()
        const productPagePrice = await this.productPrice.innerText();
        expect(this.addToCartButton).toContainText('ADD TO CART');
        await this.addToCartButton.click();
        await this.goToCartButton.click();
        expect(await this.cartProductTitle.innerText()).toContain(productPageTitle);
        expect(await this.cartProductPrice.innerText()).toContain(productPagePrice);
        expect(await this.cartProductQuantity.innerText()).toEqual('Quantity: 1');
        expect(await this.cartTotalProductsPrice.innerText()).toEqual('Total Cart Price: ' + productPagePrice);
    };
};