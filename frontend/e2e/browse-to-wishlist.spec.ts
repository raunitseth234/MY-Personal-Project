import { test, expect } from '@playwright/test';

test('customer can browse a product, open its detail page, and wishlist it', async ({ page }) => {
  await page.goto('/products');

  const firstCard = page.locator('a[href^="/products/"]').first();
  await expect(firstCard).toBeVisible();
  const productName = await firstCard.locator('p').nth(1).textContent();
  const href = await firstCard.getAttribute('href');

  await page.goto(href!);
  await expect(page).toHaveURL(/\/products\/.+/);

  const wishlistButton = page.getByRole('button', { name: /add to wishlist/i }).first();
  await expect(wishlistButton).toBeVisible();
  await wishlistButton.click();
  await expect(page.getByRole('button', { name: /remove from wishlist/i })).toBeVisible();

  await page.goto('/wishlist');
  if (productName) {
    await expect(page.getByText(productName.trim())).toBeVisible();
  }
});
