import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Menu Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@smyou.vn');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Đăng nhập")');
  });

  test('Should create a new product', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/menu`);
    await page.click('button:has-text("Thêm mới")');
    await page.fill('input[placeholder*="VD: Trà Sữa"]', 'MilkTea Logic Test');
    await page.fill('input[type="number"]', '45000');
    await page.click('button:has-text("Thêm sản phẩm")');
    await expect(page.locator('body')).toContainText('Đã thêm sản phẩm mới');
    await expect(page.locator('body')).toContainText('MilkTea Logic Test');
  });
});
