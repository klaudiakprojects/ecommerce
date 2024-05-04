import { expect, Locator, Page } from '@playwright/test';

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
    };

    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    };

    async validateProductPage(): Promise<void> {
        expect(await this.productTitle.innerText()).toContain('Coffee');
        expect(this.productImage).toBeVisible();
        expect(this.productDescription).not.toBeEmpty();
        expect(this.addToCartButton).not.toBeDisabled();
        expect(this.productPrice).toBeVisible();
    };

    async validateProductFromCategoryPage() {

    };
};