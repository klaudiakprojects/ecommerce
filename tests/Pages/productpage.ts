import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly productDescription: Locator;
    readonly productImage: Locator;
    readonly productTitleCategoryPage: Locator;
    readonly productPriceCategoryPage: Locator;
    readonly groundCategory: Locator;
    readonly productOnCategoryPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('.product-details p');
        this.productPrice = page.locator('.product-new-price span');
        this.addToCartButton = page.locator('.add-to-cart');
        this.productDescription = page.locator('.product-description');
        this.productImage = page.locator('.product-image');
        this.productTitleCategoryPage = page.locator('.item p');
        this.productPriceCategoryPage = page.locator('.item-prices span');
        this.groundCategory = page.locator('.nav-menu li:has-text("Ground")');
        this.productOnCategoryPage = page.locator('.item');
    };

    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    };

    async validateProductPage(): Promise<void> {
        await this.groundCategory.click();
        await this.productTitleCategoryPage.first().waitFor({ state: "visible" })
        const productNameOnCategoryPage = await this.productTitleCategoryPage.first().innerText();
        const productPriceOnCategoryPage = (await this.productPriceCategoryPage.first().innerText()).split(" ")[0];
        await this.productOnCategoryPage.first().click();
        const productNameOnProductPage = await this.productTitle.innerText();
        const productPriceOnProductPage = (await this.productPrice.innerText()).split(" ")[0];
        expect(productNameOnProductPage).toEqual(productNameOnCategoryPage);
        expect(productPriceOnProductPage).toEqual(productPriceOnCategoryPage);
    
    };
};
