import type { ReportMeta } from '../../../types';
import { ReportCard } from './ReportCard';

interface ReportGridProps {
  reports: ReportMeta[];
}

export function ReportGrid({ reports }: ReportGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
