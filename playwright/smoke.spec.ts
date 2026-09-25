import { test, expect } from '@playwright/test';

test('home renders nav and heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('contact page has mailto and GitHub links', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  await expect(page.locator('a[href*="github.com"]')).toBeVisible();
});
