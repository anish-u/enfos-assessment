import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState, ErrorState, PageWrapper } from '../../shared/components';
import { formatDate, getErrorMessage } from '../../shared/utils';
import {
  DataTable,
  ReportBreadcrumb,
  ReportDetailSkeleton,
} from './components';
import { useReportDetail } from './hooks';
import { isValidReportId } from './types';

export function ReportDetailPage() {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: string }>();
  const isValidId = isValidReportId(reportId);
  const { data, isLoading, isError, error, refetch } = useReportDetail(reportId);

  const subtitle =
    data?.meta !== undefined
      ? `${data.meta.rowCount} rows · Updated ${formatDate(data.meta.lastUpdated)}`
      : undefined;

  const handleBackToReports = () => {
    void navigate('/');
  };

  return (
    <PageWrapper
      title={data?.meta.name ?? 'Report'}
      description={data?.meta.description}
      breadcrumb={
        data?.meta ? <ReportBreadcrumb reportName={data.meta.name} /> : undefined
      }
    >
      {data?.meta && subtitle ? (
        <p className="mb-6 text-sm text-muted">{subtitle}</p>
      ) : null}

      {!isValidId ? (
        <ErrorState
          title="Report not found"
          message={`No report exists with id "${reportId ?? ''}".`}
          retryLabel="Back to reports"
          onRetry={handleBackToReports}
        />
      ) : null}

      {isValidId && isLoading ? <ReportDetailSkeleton /> : null}

      {isValidId && !isLoading && isError ? (
        <ErrorState
          message={getErrorMessage(error, 'Failed to load report. Please try again.')}
          onRetry={() => void refetch()}
        />
      ) : null}

      {isValidId && !isLoading && !isError && data && data.rows.length === 0 ? (
        <EmptyState
          title="No rows to display"
          description="This report has no data rows yet."
        />
      ) : null}

      {isValidId && !isLoading && !isError && data && data.rows.length > 0 ? (
        <DataTable columns={data.columns} rows={data.rows} />
      ) : null}
    </PageWrapper>
  );
}
