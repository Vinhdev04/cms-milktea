import { formatVND, formatDate } from './formatters';

describe('formatters utility', () => {
  describe('formatVND', () => {
    it('formats numbers correctly with Vietnamese currency symbol', () => {
      // Using \u00a0 for non-breaking space if Intl.NumberFormat uses it
      // Let's test the result matches the pattern
      const result = formatVND(50000);
      expect(result).toMatch(/50\.000.*đ/);
    });

    it('handles zero correctly', () => {
      expect(formatVND(0)).toBe('0đ');
    });

    it('handles large numbers', () => {
      const result = formatVND(1250000);
      expect(result).toMatch(/1\.250\.000.*đ/);
    });

    it('handles NaN or null values gracefully', () => {
      expect(formatVND(NaN)).toBe('0đ');
      // @ts-ignore
      expect(formatVND(null)).toBe('0đ');
    });
  });

  describe('formatDate', () => {
    it('formats ISO dates to Vietnamese dd/mm/yyyy format', () => {
      const result = formatDate('2024-04-21T10:30:00Z');
      expect(result).toBe('21/04/2024');
    });

    it('handles invalid dates gracefully', () => {
      const invalidDate = 'not-a-date';
      expect(formatDate(invalidDate)).toBe(invalidDate);
    });
  });
});
