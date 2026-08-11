import { Search } from 'lucide-react';

interface TableToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredCount: number;
  totalCount: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function TableToolbar({
  searchTerm,
  onSearchChange,
  filteredCount,
  totalCount,
  pageSize,
  onPageSizeChange,
}: TableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border bg-surface-muted px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Filter rows..."
          aria-label="Filter table rows"
          className="w-full rounded-lg border border-border bg-surface py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
        <span>
          Showing {filteredCount} of {totalCount} rows
        </span>
        <label className="flex items-center gap-2">
          <span>Rows per page</span>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            aria-label="Rows per page"
            className="rounded-lg border border-border bg-surface px-2 py-1.5 text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
