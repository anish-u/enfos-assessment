import { REPORT_IDS, type ReportId } from '../../shared/utils/constants';

const VALID_REPORT_IDS = new Set<string>([
  REPORT_IDS.USERS,
  REPORT_IDS.DEPARTMENTS,
  REPORT_IDS.PROJECTS,
]);

export function isValidReportId(reportId: string | undefined): reportId is ReportId {
  return reportId !== undefined && VALID_REPORT_IDS.has(reportId);
}

export type StatusBadgeVariant = 'success' | 'neutral' | 'warning' | 'default';

export function getStatusBadgeVariant(status: string): StatusBadgeVariant {
  switch (status) {
    case 'Active':
    case 'Completed':
      return 'success';
    case 'Inactive':
      return 'neutral';
    case 'On Hold':
      return 'warning';
    default:
      return 'default';
  }
}
