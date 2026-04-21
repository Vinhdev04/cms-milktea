import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Authentication', () => {
  test('Should login successfully with admin credentials', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@smyou.vn');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Đăng nhập")');
    await expect(page).toHaveURL(`${BASE_URL}/admin`);
  });
});
