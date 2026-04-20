import { useState, useEffect } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number = 5) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  const dataString = JSON.stringify(data);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const parsedData = JSON.parse(dataString);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedData(parsedData.slice(startIndex, endIndex));
      setIsLoading(false);
    }, 600); // Simulate network delay
    return () => clearTimeout(timer);
  }, [currentPage, dataString, itemsPerPage]);

  // Reset to page 1 if data changes significantly (like filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [dataString]);

  return { currentPage, setCurrentPage, totalPages, paginatedData, isLoading };
}

export function useInfiniteScroll<T>(data: T[], itemsPerLoad: number = 8) {
  const [visibleCount, setVisibleCount] = useState(itemsPerLoad);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [visibleData, setVisibleData] = useState<T[]>([]);
  const dataString = JSON.stringify(data);

  useEffect(() => {
    // Initial load or data filter change
    setIsLoading(true);
    setVisibleCount(itemsPerLoad);
    const timer = setTimeout(() => {
      const parsedData = JSON.parse(dataString);
      setVisibleData(parsedData.slice(0, itemsPerLoad));
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [dataString, itemsPerLoad]);

  const loadMore = () => {
    if (visibleCount >= data.length) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextCount = visibleCount + itemsPerLoad;
      setVisibleData(data.slice(0, nextCount));
      setVisibleCount(nextCount);
      setIsLoadingMore(false);
    }, 600);
  };

  const hasMore = visibleCount < data.length;

  return { visibleData, isLoading, isLoadingMore, loadMore, hasMore };
}
