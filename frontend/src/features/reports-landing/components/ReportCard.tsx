import { Link } from 'react-router-dom';
import { Badge } from '../../../shared/components';
import { formatDate } from '../../../shared/utils';
import type { ReportMeta } from '../../../types';
import { getReportIcon } from '../types';

interface ReportCardProps {
  report: ReportMeta;
}

export function ReportCard({ report }: ReportCardProps) {
  const Icon = getReportIcon(report.icon ?? report.id);

  return (
    <Link
      to={`/reports/${report.id}`}
      className="group flex flex-col rounded-lg border border-border bg-surface p-6 shadow-sm transition-shadow hover:border-brand/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <Badge variant="neutral">{report.rowCount} rows</Badge>
      </div>
      {report.category ? (
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-brand">{report.category}</p>
      ) : null}
      <h2 className="mt-1 line-clamp-2 break-words text-lg font-semibold text-foreground group-hover:text-brand">
        {report.name}
      </h2>
      <p className="mt-2 line-clamp-3 flex-1 break-words text-sm text-muted">
        {report.description}
      </p>
      {report.highlights && report.highlights.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {report.highlights.map((highlight) => (
            <Badge key={highlight.label} variant="default">
              {highlight.value} {highlight.label}
            </Badge>
          ))}
        </div>
      ) : null}
      <p className="mt-4 text-xs text-muted">Updated {formatDate(report.lastUpdated)}</p>
    </Link>
  );
}
