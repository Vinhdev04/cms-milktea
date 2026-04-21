import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Dashboard & Mobile UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@smyou.vn');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Đăng nhập")');
  });

  test('Should show correct stats grid', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin`);
    const statsValue = page.locator('.compact-stat-card >> div').first();
    await expect(statsValue).not.toContainText('NaN');
  });

  test('Should show mobile bottom nav on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/admin`);
    const bottomNav = page.locator('nav.fixed.bottom-0');
    await expect(bottomNav).toBeVisible();
  });
});
