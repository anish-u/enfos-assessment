import { useMemo, useState } from 'react';
import type { ColumnDefinition } from '../../types';

export type SortDirection = 'asc' | 'desc';

export interface UseDataTableOptions {
  rows: Record<string, unknown>[];
  columns: ColumnDefinition[];
  defaultPageSize?: number;
}

function isEmptyValue(value: unknown): boolean {
  return value === null || value === undefined || value === '';
}

function isComparableNumber(value: unknown): value is number {
  const num = Number(value);
  return !Number.isNaN(num);
}

function isComparableDate(value: unknown): boolean {
  const time = new Date(String(value)).getTime();
  return !Number.isNaN(time);
}

function compareValues(
  a: unknown,
  b: unknown,
  type: ColumnDefinition['type'],
  direction: SortDirection,
): number {
  const aEmpty = isEmptyValue(a) || (type === 'number' && !isComparableNumber(a)) || (type === 'date' && !isComparableDate(a));
  const bEmpty = isEmptyValue(b) || (type === 'number' && !isComparableNumber(b)) || (type === 'date' && !isComparableDate(b));
  if (aEmpty && bEmpty) {
    return 0;
  }
  if (aEmpty) {
    return 1;
  }
  if (bEmpty) {
    return -1;
  }

  const multiplier = direction === 'asc' ? 1 : -1;

  switch (type) {
    case 'number': {
      const numA = Number(a);
      const numB = Number(b);
      return (numA - numB) * multiplier;
    }
    case 'date': {
      const dateA = new Date(String(a)).getTime();
      const dateB = new Date(String(b)).getTime();
      return (dateA - dateB) * multiplier;
    }
    case 'status':
    case 'string':
    default:
      return String(a).localeCompare(String(b)) * multiplier;
  }
}

function rowMatchesSearch(
  row: Record<string, unknown>,
  columns: ColumnDefinition[],
  searchTerm: string,
): boolean {
  const normalized = searchTerm.trim().toLowerCase();
  if (!normalized) {
    return true;
  }

  return columns.some((column) => {
    const value = row[column.key];
    if (value === null || value === undefined) {
      return false;
    }
    return String(value).toLowerCase().includes(normalized);
  });
}

export function useDataTable({ rows, columns, defaultPageSize = 10 }: UseDataTableOptions) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => rowMatchesSearch(row, columns, searchTerm));
  }, [rows, columns, searchTerm]);

  const sortedRows = useMemo(() => {
    if (!sortKey) {
      return filteredRows;
    }

    const column = columns.find((col) => col.key === sortKey);
    if (!column) {
      return filteredRows;
    }

    return [...filteredRows].sort((a, b) =>
      compareValues(a[sortKey], b[sortKey], column.type, sortDir),
    );
  }, [filteredRows, sortKey, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, currentPage, pageSize]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  const setSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const updatePageSize = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return {
    searchTerm,
    sortKey,
    sortDir,
    page: currentPage,
    pageSize,
    filteredCount: filteredRows.length,
    totalCount: rows.length,
    totalPages,
    paginatedRows,
    setSearch,
    toggleSort,
    setPage,
    setPageSize: updatePageSize,
  };
}
