import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OrderManagement } from './OrderManagement';
import '@testing-library/jest-dom';

// Mocking usePagination to avoid timer delays in this integration test
jest.mock('../hooks/useDataFetching', () => ({
  ...jest.requireActual('../hooks/useDataFetching'),
  usePagination: (data: any[]) => ({
    currentPage: 1,
    setCurrentPage: jest.fn(),
    totalPages: 1,
    paginatedData: data,
    isLoading: false,
  }),
}));

describe('OrderManagement Page Integration', () => {
  it('renders page title and initial orders', () => {
    render(<OrderManagement />);
    expect(screen.getByText('Quản lý Đơn hàng')).toBeInTheDocument();
    // Check if some orders from mockData are visible
    expect(screen.getByText('Nguyễn Thị Lan')).toBeInTheDocument();
  });

  it('filters orders when searching by customer name', () => {
    render(<OrderManagement />);
    const searchInput = screen.getByPlaceholderText(/Tìm theo mã đơn, tên khách/i);
    
    fireEvent.change(searchInput, { target: { value: 'Lan' } });
    
    expect(screen.getByText('Nguyễn Thị Lan')).toBeInTheDocument();
    // Using queryByText for elements that SHOULD NOT be there
    expect(screen.queryByText('Trần Văn Minh')).not.toBeInTheDocument();
  });

  it('changes active tab and updates view', () => {
    render(<OrderManagement />);
    const processingTab = screen.getByText('Đang xử lý');
    
    fireEvent.click(processingTab);
    
    // Check if the tab style changed (orange background)
    expect(processingTab).toHaveStyle({ background: '#F58220' });
  });

  it('opens order details when clicking a row/card', async () => {
    render(<OrderManagement />);
    const orderItem = screen.getByText('ORD-2412001');
    
    fireEvent.click(orderItem);
    
    // Check if detail panel/modal appears
    expect(screen.getByText('Chi tiết đơn hàng')).toBeInTheDocument();
    expect(screen.getByText('Lịch sử đơn hàng')).toBeInTheDocument();
  });
});
