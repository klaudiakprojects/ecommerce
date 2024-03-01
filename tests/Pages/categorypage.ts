import { expect, Locator, Page } from '@playwright/test';
import allProducts from '../../src/Components/Assets/data.js';
import { waitFor } from '@testing-library/react';


export class Categorypage {
    readonly page: Page;
    readonly groundCategoryButton: Locator;
    readonly beansCategoryButton: Locator;
    readonly promotionsCategoryButton: Locator;
    readonly categoryPageHeader: Locator;
    readonly firstProductOnCategoryPage: Locator;
    readonly firstProductTitleOnCategoryPage: Locator;
    readonly firstProductPriceOnCategoryPage: Locator;
    readonly productTitleOnProductPage: Locator;
    readonly productPriceOnProductPage: Locator;
    


    constructor(page: Page) {
        this.page = page;
        this.groundCategoryButton = page.locator('.nav-menu li:has-text("Ground")');
        this.beansCategoryButton = page.locator('.nav-menu li:has-text("Beans")');
        this.promotionsCategoryButton = page.locator('.nav-menu li:has-text("Promotions")');
        this.categoryPageHeader = page.locator('.products-grid h2');
        this.firstProductOnCategoryPage = page.locator('.item').first();
        this.firstProductTitleOnCategoryPage = page.locator('.item p').first();
        this.firstProductPriceOnCategoryPage = page.locator('.item-new-price span').first();
        this.productTitleOnProductPage = page.locator('.product-details p');
        this.productPriceOnProductPage = page.locator('.product-new-price span');
        
    }

    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    };

    async goToFirstProduct(): Promise<void> {
        await this.firstProductOnCategoryPage.click();
    }

    async validateProductPage(): Promise<void> {
        const firstProductTitleOnCategoryPage = await this.firstProductTitleOnCategoryPage.innerText();
        const firstProductPriceOnCategoryPage = await this.firstProductPriceOnCategoryPage.innerText();
        const productTitleOnProductPage = await this.productTitleOnProductPage.innerText();
        const productPriceOnProductPage = await this.productPriceOnProductPage.innerText();
        expect(this.firstProductTitleOnCategoryPage).toHaveText(productTitleOnProductPage);
        expect(this.firstProductPriceOnCategoryPage).toHaveText(productPriceOnProductPage);
    }
};