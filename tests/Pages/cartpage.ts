import { expect, Locator, Page } from '@playwright/test';
import allProducts from '../../src/Components/Assets/data.js';
import { waitFor } from '@testing-library/react';


export class ProductPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly productDescription: Locator;
    readonly productImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('.product-details p');
        this.productPrice = page.locator('.product-new-price span');
        this.addToCartButton = page.locator('.add-to-cart');
        this.productDescription = page.locator('.product-description');
        this.productImage = page.locator('.product-image');
    }


    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    };

    async addProductToTheCart(): Promise<void> {
    };
};