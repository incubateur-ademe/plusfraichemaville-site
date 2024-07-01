import { useState, useMemo } from "react";

export const usePagination = <T,>(data?: T[], itemsPerPage: number = 12) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => Math.ceil((data?.length ?? 0) / itemsPerPage), [data, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { paginatedResults, currentPage, totalPages, handlePageChange, itemsPerPage };
};
