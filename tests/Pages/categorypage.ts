import { expect, Locator, Page } from '@playwright/test';
import allProducts from '../../src/Components/Assets/data.js';
import { waitFor } from '@testing-library/react';


export class CategoryPage {
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
    readonly sortSelect: Locator;
    readonly sortFromAToZ: Locator;
    readonly sortFromZtoA: Locator;
    readonly sortPriceLowToHigh: Locator;
    readonly sortPriceHighToLow: Locator;
    readonly productTitles: Locator;
    readonly productPrices: Locator;
    readonly secondProduct: Locator;


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
        this.productTitles = page.locator('.item p');
        this.productPrices = page.locator('.item span');
        this.sortSelect = page.locator('.sort');
        this.secondProduct = page.locator('.item').nth(1);
    }

    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    };

    async goToFirstProduct(): Promise<void> {
        await this.firstProductOnCategoryPage.click();
    }

    async goToSecondProduct(): Promise<void> {
        await this.secondProduct.click();
    }

    async validateProductPage(): Promise<void> {
        const firstProductTitleOnCategoryPage = await this.firstProductTitleOnCategoryPage.innerText();
        const firstProductPriceOnCategoryPage = await this.firstProductPriceOnCategoryPage.innerText();
        const productTitleOnProductPage = await this.productTitleOnProductPage.innerText();
        const productPriceOnProductPage = await this.productPriceOnProductPage.innerText();
        expect(this.firstProductTitleOnCategoryPage).toHaveText(productTitleOnProductPage);
        expect(this.firstProductPriceOnCategoryPage).toHaveText(productPriceOnProductPage);
    }

    async validateSortingFromAToZ(productsNamesAZ: string[]): Promise<void> {
        await this.sortSelect.click();
        await this.sortSelect.selectOption({ value: "asc" });

        const productTitles = await Promise.all(
            (await this.productTitles.all())
                .map(async (titleLocator) => {
                    return titleLocator.innerText();
                }));

        expect(productTitles).toEqual(productsNamesAZ);
    };

    async validateSortingFromZToA(productsNamesZA: string[]): Promise<void> {
        await this.sortSelect.click();
        await this.sortSelect.selectOption({ value: "desc" });

        const productTitles = await Promise.all(
            (await this.productTitles.all())
                .map(async (titleLocator) => {
                    return titleLocator.innerText();
                }));

        expect(productTitles).toEqual(productsNamesZA);
    };

    async validateSortingHighToLowPrice(): Promise<void> {
        await this.sortSelect.click();
        await this.sortSelect.selectOption({ value: "highToLow" });

        const productPrices = await Promise.all(
            (await this.productPrices.all())
                .map(async (priceLocator) => {
                    return Number((await priceLocator.innerText()).split(' ').shift());
                })
        );

        for (let i = 1; i < productPrices.length; i++) {
            expect(productPrices[i]).toBeLessThanOrEqual(productPrices[i - 1]);
        }
    };

    async validateSortingLowToHighPrice(): Promise<void> {
        await this.sortSelect.click();
        await this.sortSelect.selectOption({ value: "lowToHigh" });

        const productPrices = await Promise.all(
            (await this.productPrices.all())
                .map(async (priceLocator) => {
                    return Number((await priceLocator.innerText()).split(' ').shift());
                })
        );

        for (let i = 1; i < productPrices.length; i++) {
            expect(productPrices[i]).toBeGreaterThanOrEqual(productPrices[i - 1]);
        }
    };
};