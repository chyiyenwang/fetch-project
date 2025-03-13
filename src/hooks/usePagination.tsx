import { useState } from 'react';

const PAGE_LIMIT = 10;

export const usePagination = (list: string[]) => {
  const [ pageIndex, setPageIndex ] = useState<number>(0);
  const [ pagination, setPagination ] = useState<string[]>([]);

  const nextPage = () => {
    const start = (pageIndex + 1) * PAGE_LIMIT;
    const end = start + 10;
    const nextPage = list.slice(start, end);

    setPageIndex(pageIndex + 1);
    setPagination(nextPage);
  }

  const previousPage = () => {
    const start = (pageIndex - 1) * PAGE_LIMIT;
    const end = start + 10;
    const previousPage = list.slice(start, end);

    setPageIndex(pageIndex - 1);
    setPagination(previousPage);
  }

  const pageLimit = 10;

  return {
    nextPage,
    previousPage,
    pagination,
    setPagination,
    pageIndex,
    setPageIndex,
    pageLimit,
  }
}