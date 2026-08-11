import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ReportBreadcrumbProps {
  reportName: string;
}

export function ReportBreadcrumb({ reportName }: ReportBreadcrumbProps) {
  return (
    <ol className="flex flex-wrap items-center gap-1.5">
      <li>
        <Link
          to="/"
          className="font-medium text-brand transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Reports
        </Link>
      </li>
      <li aria-hidden="true">
        <ChevronRight className="h-4 w-4 text-muted" />
      </li>
      <li className="font-medium text-foreground" aria-current="page">
        {reportName}
      </li>
    </ol>
  );
}
