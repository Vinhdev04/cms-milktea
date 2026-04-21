import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Order Management', () => {
  test.beforeEach(async ({ page }) => {
    // Tự động đăng nhập trước mỗi test
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@smyou.vn');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Đăng nhập")');
  });

  test('Should search for an order', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/orders`);
    const searchInput = page.locator('input[placeholder*="Tìm theo mã đơn"]');
    await searchInput.fill('Lan');
    await expect(page.locator('body')).toContainText('Nguyễn Thị Lan');
  });

  test('Should show invoice overlay on print click', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/orders`);
    await page.click('text=ORD-2412001');
    const printBtn = page.locator('button:has-text("In hóa đơn")');
    await printBtn.click();
    await expect(page.locator('.invoice-overlay')).toBeVisible();
    await expect(page.locator('.invoice-overlay')).toContainText('HÓA ĐƠN');
  });
});
