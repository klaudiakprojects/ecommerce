import { test, expect } from '@playwright/test';
import { Mainpage } from '../Pages/mainpage';

test('Go to Ground Category', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.goTo();
  await mainpage.goToGroundCategory();
});

test('Go to Beans Category', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.goTo();
  await mainpage.goToBeansCategory();
});

test('Go to Promotions Category', async ({ page }) => {
  const mainpage = new Mainpage(page);

  await mainpage.goTo();
  await mainpage.goToPromotionsCategory();
});
