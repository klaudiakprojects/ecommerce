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


    constructor(page: Page) {
        this.page = page;
        this.groundCategoryButton = page.locator('.nav-menu li:has-text("Ground")');
        this.beansCategoryButton = page.locator('.nav-menu li:has-text("Beans")');
        this.promotionsCategoryButton = page.locator('.nav-menu li:has-text("Promotions")');
        this.categoryPageHeader = page.locator('.products-grid h2');
        this.firstProductOnCategoryPage = page.locator('.item').first();

    }

    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    };

    async goToFirstProduct(): Promise<void> {
        await this.firstProductOnCategoryPage.click();
    }
};