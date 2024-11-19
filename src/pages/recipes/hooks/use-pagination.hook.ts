import { useCallback, useMemo, useState } from "react";
import { Meal } from "../../../types/meal.type";

interface UsePagination {
  paginatedItems: Meal[] | undefined;
  totalPages: number;
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
  visiblePages: (number | string)[];
}

const usePagination = (
  items: Meal[] | undefined,
  itemsPerPage: number
): UsePagination => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = items ? Math.ceil(items.length / itemsPerPage) : 0;

  const paginatedItems = useMemo(
    () =>
      items?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [items, currentPage, itemsPerPage]
  );

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const visiblePages = useMemo(() => {
    if (!items || totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 5) {
      return [...Array.from({ length: 7 }, (_, i) => i + 1), "...", totalPages];
    }
    if (currentPage > totalPages - 5) {
      return [
        1,
        "...",
        ...Array.from({ length: 7 }, (_, i) => totalPages - 6 + i)
      ];
    }
    return [
      1,
      "...",
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      "...",
      totalPages
    ];
  }, [items, totalPages, currentPage]);

  return {
    paginatedItems,
    totalPages,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    visiblePages
  };
};

export { usePagination };
