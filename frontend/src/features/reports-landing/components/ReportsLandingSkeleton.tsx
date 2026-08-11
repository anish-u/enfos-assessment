import { Skeleton } from '../../../shared/components';

function ReportCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <Skeleton variant="circular" />
        <Skeleton variant="text" className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton variant="text" className="mt-3 h-3 w-20" />
      <Skeleton variant="text" className="mt-2 h-6 w-2/3" />
      <Skeleton variant="text" className="mt-2 h-4 w-full" />
      <Skeleton variant="text" className="mt-1 h-4 w-4/5" />
      <div className="mt-3 flex gap-2">
        <Skeleton variant="text" className="h-5 w-16 rounded-full" />
        <Skeleton variant="text" className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton variant="text" className="mt-4 h-3 w-24" />
    </div>
  );
}

export function ReportsLandingSkeleton() {
  return (
    <div aria-label="Loading dashboard" aria-busy="true">
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <Skeleton variant="text" className="h-4 w-32" />
        <Skeleton variant="text" className="mt-3 h-8 w-2/3" />
        <Skeleton variant="text" className="mt-2 h-4 w-full max-w-xl" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-lg border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" />
              <div className="flex-1">
                <Skeleton variant="text" className="h-4 w-24" />
                <Skeleton variant="text" className="mt-2 h-7 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Skeleton variant="text" className="mt-10 h-6 w-40" />
      <Skeleton variant="rectangular" className="mt-4 h-11 w-full max-w-md" />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ReportCardSkeleton />
        <ReportCardSkeleton />
        <ReportCardSkeleton />
      </div>
    </div>
  );
}
