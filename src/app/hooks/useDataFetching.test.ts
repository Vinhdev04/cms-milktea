import { renderHook, act } from '@testing-library/react';
import { usePagination } from './useDataFetching';

// Mocking setTimeout to speed up tests
jest.useFakeTimers();

describe('usePagination hook', () => {
  const mockData = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

  it('calculates total pages correctly', () => {
    const { result } = renderHook(() => usePagination(mockData, 5));
    expect(result.current.totalPages).toBe(3);
  });

  it('returns the correct slice of data for the first page', async () => {
    const { result } = renderHook(() => usePagination(mockData, 5));
    
    // Fast-forward the mock timer
    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.paginatedData).toHaveLength(5);
    expect(result.current.paginatedData[0].id).toBe(1);
    expect(result.current.isLoading).toBe(false);
  });

  it('updates data when page changes', async () => {
    const { result } = renderHook(() => usePagination(mockData, 5));

    act(() => {
      result.current.setCurrentPage(2);
      jest.advanceTimersByTime(600);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData[0].id).toBe(6);
  });

  it('resets to page 1 when source data changes', () => {
    const { result, rerender } = renderHook(({ data }) => usePagination(data, 5), {
      initialProps: { data: mockData }
    });

    act(() => {
      result.current.setCurrentPage(2);
    });
    expect(result.current.currentPage).toBe(2);

    // Filtered data (changing props)
    const filteredData = mockData.slice(0, 3);
    rerender({ data: filteredData });

    expect(result.current.currentPage).toBe(1);
  });
});
