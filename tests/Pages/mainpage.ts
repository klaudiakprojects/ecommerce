import { expect, Locator, Page } from '@playwright/test';
import allProducts from '../../src/Components/Assets/data.js';
import { waitFor } from '@testing-library/react';


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
    readonly firstSliderText: Locator;
    readonly firstSliderButton: Locator;
    readonly firstSliderImg: Locator;
    readonly secondSliderImg: Locator;
    readonly secondSliderText: Locator;
    readonly recommendedH2: Locator;
    readonly recommendedProducts: Locator;
    readonly recommendedProduct: Locator;
    readonly recommendedProductImg: Locator;
    readonly recommendedProductTitle: Locator;
    readonly recommendedProductPrice: Locator;

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
        this.firstSliderText = page.locator('.first-slider-text');
        this.firstSliderButton = page.locator('.buy-now-button');
        this.firstSliderImg = page.locator('.slider-item-1 img');
        this.secondSliderImg = page.locator('.slider-item-2 img');
        this.secondSliderText = page.locator('.second-slider-text');
        this.recommendedH2 = page.locator('.recommended-products h2');
        this.recommendedProducts = page.locator('.recommended-product');
        this.recommendedProduct = page.locator('.item');
        this.recommendedProductImg = page.locator('.item img');
        this.recommendedProductTitle = page.locator('.item p');
        this.recommendedProductPrice = page.locator('.item-new-price span');
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
        expect(this.page).toHaveURL(/.*ground/);
        expect(this.categoryPageHeader).toContainText('GROUND');
        await this.getProductsId();
        await this.productsCategoryCheck();
    };

    async goToBeansCategory(): Promise<void> {
        this.goTo();
        await this.beansCategoryButton.click();
        expect(this.page).toHaveURL(/.*beans/);
        expect(this.categoryPageHeader).toContainText('BEANS');
        await this.getProductsId();
        await this.productsCategoryCheck();
    };

    async goToPromotionsCategory(): Promise<void> {
        this.goTo();
        await this.promotionsCategoryButton.click();
        expect(this.page).toHaveURL(/.*promotions/);
        expect(this.categoryPageHeader).toContainText('PROMOTIONS');
        await this.getProductsId();
        await this.productsCategoryCheck();
    };

    async goToAboutPage(): Promise<void> {
        this.goTo();
        expect(this.footerAboutLink).toHaveText('About')
        expect(this.footerAboutLink).not.toBeDisabled();
        await this.footerAboutLink.click();
        expect(this.footerPagesH2).toContainText('ABOUT US');
        expect(this.aboutUsTextOnPage).not.toBeEmpty();
    };

    async goToFAQPage(): Promise<void> {
        this.goTo();
        expect(this.footerFAQLink).toHaveText('FAQ');
        expect(this.footerFAQLink).not.toBeDisabled();
        await this.footerFAQLink.click();
        expect(this.footerPagesH2).toContainText('FAQ');
    };

    async goToContactUsPage(): Promise<void> {
        this.goTo();
        expect(this.footerContactUs).toHaveText('Contact us');
        expect(this.footerContactUs).not.toBeDisabled();
        await this.footerContactUs.click();
        expect(this.footerPagesH2).toContainText('Contact us');
    };

    async validateHeroSection(): Promise<void> {
        this.goTo();
        await this.firstSliderImg.first().waitFor({ state: 'visible' });
        expect(this.firstSliderImg.first()).toBeVisible();
        expect(this.secondSliderImg.first()).toBeVisible();
        expect(this.firstSliderText.first()).toContainText('Coffee beans -30%');
        expect(this.firstSliderButton.first()).not.toBeDisabled();
        expect(this.firstSliderButton.first()).toContainText('BUY NOW');
        expect(this.secondSliderText.first()).toContainText('Check available ground coffee');
    };

    async validateRecommendedSection(): Promise<void> {
        this.goTo();
        expect(this.recommendedH2).toContainText('RECOMMENDED PRODUCTS');
        await expect(this.recommendedProducts).not.toBeEmpty();
        await expect(this.recommendedProduct).toHaveCount(3);

        const allRecommendedProductImgHandles = await this.recommendedProductImg.all();
        await Promise.all(allRecommendedProductImgHandles.map(async (img: any) => {
            await expect(img).toBeVisible();
        }));
              
        expect(this.recommendedProductImg).toHaveCount(3);
        expect(this.recommendedProductTitle).toHaveCount(3);
        expect(this.recommendedProductPrice).toHaveCount(3);
    };
};