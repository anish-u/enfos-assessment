import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useDataTable } from '../../../shared/hooks/useDataTable';
import { cn } from '../../../shared/utils/cn';
import type { ColumnDefinition } from '../../../types';
import { DataTableCell } from './DataTableCell';
import { TablePagination } from './TablePagination';
import { TableToolbar } from './TableToolbar';

interface DataTableProps {
  columns: ColumnDefinition[];
  rows: Record<string, unknown>[];
}

const alignmentByType: Record<ColumnDefinition['type'], string> = {
  string: 'text-left',
  number: 'text-right',
  date: 'text-left',
  status: 'text-left',
};

export function DataTable({ columns, rows }: DataTableProps) {
  const {
    searchTerm,
    sortKey,
    sortDir,
    page,
    pageSize,
    filteredCount,
    totalCount,
    totalPages,
    paginatedRows,
    setSearch,
    toggleSort,
    setPage,
    setPageSize,
  } = useDataTable({ rows, columns });

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      <TableToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearch}
        filteredCount={filteredCount}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="sticky top-0 bg-surface-muted">
            <tr>
              {columns.map((column) => {
                const isSorted = sortKey === column.key;
                const SortIcon = isSorted
                  ? sortDir === 'asc'
                    ? ArrowUp
                    : ArrowDown
                  : ArrowUpDown;

                return (
                  <th
                    key={column.key}
                    scope="col"
                    className={cn(
                      'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted',
                      alignmentByType[column.type],
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      className={cn(
                        'inline-flex items-center gap-1 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                        isSorted && 'text-brand',
                      )}
                    >
                      {column.label}
                      <SortIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-muted"
                >
                  No rows match your filter.
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-brand-light/30">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'whitespace-nowrap px-4 py-3 text-sm text-foreground',
                        alignmentByType[column.type],
                      )}
                    >
                      <DataTableCell value={row[column.key]} type={column.type} />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
