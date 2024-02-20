import { expect, Locator, Page } from '@playwright/test';

export class Mainpage {
    readonly page: Page;
    readonly groundCategoryButton: Locator;
    readonly beansCategoryButton: Locator;
    readonly promotionsCategoryButton: Locator;
    readonly categoryPageHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.groundCategoryButton = page.locator('.nav-menu li:has-text("Ground")');
        this.beansCategoryButton = page.locator('.nav-menu li:has-text("Beans")');
        this.promotionsCategoryButton = page.locator('.nav-menu li:has-text("Promotions")');
        this.categoryPageHeader = page.locator('.products-grid h2');
    }

    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    }

    async goToGroundCategory(): Promise<void> {
        this.goTo();
        await this.groundCategoryButton.click();
        await expect(this.page).toHaveURL(/.*ground/);
        await expect(this.categoryPageHeader).toContainText('GROUND');
    }

    async goToBeansCategory(): Promise<void> {
        this.goTo();
        await this.beansCategoryButton.click();
        await expect(this.page).toHaveURL(/.*beans/);
        await expect(this.categoryPageHeader).toContainText('BEANS');
    }

    async goToPromotionsCategory(): Promise<void> {
        this.goTo();
        await this.promotionsCategoryButton.click();
        await expect(this.page).toHaveURL(/.*promotions/);
        await expect(this.categoryPageHeader).toContainText('PROMOTIONS');
    }
}