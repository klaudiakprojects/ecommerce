import { expect, Locator, Page } from '@playwright/test';
import allProducts from '../src/Components/Assets/data.js';


export class Mainpage {
    readonly page: Page;
    readonly groundCategoryButton: Locator;
    readonly beansCategoryButton: Locator;
    readonly promotionsCategoryButton: Locator;
    readonly categoryPageHeader: Locator;
    readonly footerAboutLink: Locator;
    readonly footerFAQLink: Locator;
    readonly footerContactUs: Locator;
    readonly footerPagesH2: Locator;
    readonly aboutUsTextOnPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.groundCategoryButton = page.locator('.nav-menu li:has-text("Ground")');
        this.beansCategoryButton = page.locator('.nav-menu li:has-text("Beans")');
        this.promotionsCategoryButton = page.locator('.nav-menu li:has-text("Promotions")');
        this.categoryPageHeader = page.locator('.products-grid h2');
        this.footerAboutLink = page.locator('.footer-navbar li:has-text("About")');
        this.footerFAQLink = page.locator('.footer-navbar li:has-text("FAQ")');
        this.footerContactUs = page.locator('.footer-navbar li:has-text("Contact us")');
        this.footerPagesH2 = page.locator('h2');
        this.aboutUsTextOnPage = page.locator('.about-us p');
    }

    getProductsId = async () => {
        let getProducts = await Promise.all(await this.page.locator('.item a').all());
        return await Promise.all(getProducts.map(async (product) => {
            return (await product.getAttribute('href') as string).split('/').pop() as string;
        }));
    };

    productsCategoryCheck = async () => {
        const categoryProductsId = await this.getProductsId();
        const productsCategory = await this.page.locator('h2').innerText();
        const allProductsCategoryCheck = allProducts.filter(product =>
            categoryProductsId.includes(product.id.toString())
            && productsCategory.includes(product.type)
        );
    };

    async goTo(): Promise<void> {
        await this.page.goto('localhost:3000');
    };

    async goToGroundCategory(): Promise<void> {
        this.goTo();
        await this.groundCategoryButton.click();
        await expect(this.page).toHaveURL(/.*ground/);
        await expect(this.categoryPageHeader).toContainText('GROUND');
        await this.getProductsId();
        await this.productsCategoryCheck();
    };

    async goToBeansCategory(): Promise<void> {
        this.goTo();
        await this.beansCategoryButton.click();
        await expect(this.page).toHaveURL(/.*beans/);
        await expect(this.categoryPageHeader).toContainText('BEANS');
        await this.getProductsId();
        await this.productsCategoryCheck();
    };

    async goToPromotionsCategory(): Promise<void> {
        this.goTo();
        await this.promotionsCategoryButton.click();
        await expect(this.page).toHaveURL(/.*promotions/);
        await expect(this.categoryPageHeader).toContainText('PROMOTIONS');
        await this.getProductsId();
        await this.productsCategoryCheck();
    };

    async goToAboutPage(): Promise<void> {
        this.goTo();
        await expect (this.footerAboutLink).toHaveText('About')
        await expect (this.footerAboutLink).not.toBeDisabled();
        await this.footerAboutLink.click();
        await expect (this.footerPagesH2).toContainText('ABOUT US');
        await expect (this.aboutUsTextOnPage).not.toBeEmpty();
    };

    async goToFAQPage(): Promise<void> {
        this.goTo();
        await expect (this.footerFAQLink).toHaveText('FAQ');
        await expect (this.footerFAQLink).not.toBeDisabled();
        await this.footerFAQLink.click();
        await expect (this.footerPagesH2).toContainText('FAQ');
    };

    async goToContactUsPage(): Promise<void> {
        this.goTo();
        await expect (this.footerContactUs).toHaveText('Contact us');
        await expect (this.footerContactUs).not.toBeDisabled();
        await this.footerContactUs.click();
        await expect (this.footerPagesH2).toContainText('Contact us');
    };
};