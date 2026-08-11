import { Skeleton } from '../../../shared/components';

const COLUMN_COUNT = 5;
const ROW_COUNT = 6;

export function ReportDetailSkeleton() {
  return (
    <div
      className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm"
      aria-label="Loading report data"
      aria-busy="true"
    >
      <div className="border-b border-border bg-surface-muted px-4 py-3">
        <Skeleton variant="text" className="h-9 w-full max-w-xs" />
      </div>
      <div className="border-b border-border bg-surface-muted px-4 py-3">
        <div className="flex gap-4">
          {Array.from({ length: COLUMN_COUNT }).map((_, index) => (
            <Skeleton key={index} variant="text" className="h-4 w-24" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: ROW_COUNT }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 px-4 py-3">
            {Array.from({ length: COLUMN_COUNT }).map((_, colIndex) => (
              <Skeleton key={colIndex} variant="text" className="h-4 w-20" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
