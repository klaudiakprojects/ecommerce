import { test, expect } from '@playwright/test';
import { Mainpage } from './Pages/mainpage';

test('Go to Ground Category', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.goToGroundCategory();
});

test('Go to Beans Category', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.goToBeansCategory();
});

test('Go to Promotions Category', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.goToPromotionsCategory();
});

test('Go to About Page', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.goToAboutPage();
});

test('Go to FAQ Page', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.goToFAQPage();
});

test('Go to Contact Us Page', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.goToContactUsPage();
});

test('Validate Hero Section', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.validateHeroSection();
});

test('Validate Recommended Section', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.validateRecommendedSection();
});