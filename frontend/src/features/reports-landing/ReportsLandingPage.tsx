import { useMemo } from 'react';
import { EmptyState, ErrorState } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { getErrorMessage } from '../../shared/utils';
import { useUiStore } from '../../store';
import type { ReportMeta } from '../../types';
import {
  DashboardHero,
  ReportGrid,
  ReportsLandingSkeleton,
  SearchBar,
  StatsGrid,
} from './components';
import { useDashboard } from './hooks';

function filterReports(reports: ReportMeta[], searchTerm: string): ReportMeta[] {
  const normalized = searchTerm.trim().toLowerCase();
  if (!normalized) {
    return reports;
  }

  return reports.filter(
    (report) =>
      report.name.toLowerCase().includes(normalized) ||
      report.description.toLowerCase().includes(normalized) ||
      (report.category?.toLowerCase().includes(normalized) ?? false),
  );
}

export function ReportsLandingPage() {
  const { data, isLoading, isError, error, refetch } = useDashboard();
  const searchTerm = useUiStore((state) => state.searchTerm);
  const debouncedSearch = useDebounce(searchTerm);

  const filteredReports = useMemo<ReportMeta[]>(
    () => (data ? filterReports(data.reports, debouncedSearch) : []),
    [data, debouncedSearch],
  );

  const hasSearch = debouncedSearch.trim().length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {isLoading ? <ReportsLandingSkeleton /> : null}

      {!isLoading && isError ? (
        <ErrorState
          message={getErrorMessage(error, 'Failed to load dashboard. Please try again.')}
          onRetry={() => void refetch()}
        />
      ) : null}

      {!isLoading && !isError && data ? (
        <>
          <DashboardHero summary={data.summary} />
          <StatsGrid summary={data.summary} />

          <section className="mt-10">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Available Reports</h2>
                <p className="mt-1 text-sm text-muted">
                  Select a report to explore detailed data with sorting and filtering.
                </p>
              </div>
              <div className="w-full sm:max-w-md">
                <SearchBar />
              </div>
            </div>

            {filteredReports.length === 0 ? (
              <EmptyState
                title={hasSearch ? 'No matching reports' : 'No reports available'}
                description={
                  hasSearch
                    ? `No reports match "${debouncedSearch}". Try a different search term.`
                    : 'There are no reports to display right now.'
                }
              />
            ) : (
              <ReportGrid reports={filteredReports} />
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
