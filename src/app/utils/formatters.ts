/**
 * Formats a number as Vietnamese Dong (VND)
 * @param value The number to format
 * @returns Formatted string with 'đ' suffix
 */
export const formatVND = (value: number): string => {
  if (isNaN(value) || value === null) return '0đ';
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
};

/**
 * Formats a date string to a more readable Vietnamese format
 * @param dateStr ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  } catch (e) {
    return dateStr;
  }
};
