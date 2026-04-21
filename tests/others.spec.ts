import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Other CMS Modules', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@smyou.vn');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Đăng nhập")');
  });

  test('Voucher: Should view list and creation button', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/vouchers`);
    await expect(page.locator('h1')).toContainText('Quản lý Voucher');
    await expect(page.locator('button:has-text("Tạo Voucher")')).toBeVisible();
  });

  test('Branches: Should show branch list', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/branches`);
    await expect(page.locator('body')).toContainText('Quận 1');
    await expect(page.locator('body')).toContainText('Quận 3');
  });

  test('Reviews: Should see customer feedback', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/reviews`);
    await expect(page.locator('body')).toContainText('Đánh giá & Phản hồi');
  });

  test('Audit Log: Should see activity history', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/audit-log`);
    await expect(page.locator('h1')).toContainText('Nhật ký hệ thống');
  });
});
