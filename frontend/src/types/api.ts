export interface ReportHighlight {
  label: string;
  value: string;
}

export interface ReportMeta {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  rowCount: number;
  icon?: string;
  category?: string;
  highlights?: ReportHighlight[];
}

export type ColumnType = 'string' | 'number' | 'date' | 'status';

export interface ColumnDefinition {
  key: string;
  label: string;
  type: ColumnType;
}

export interface ReportDetail {
  meta: ReportMeta;
  columns: ColumnDefinition[];
  rows: Record<string, unknown>[];
}

export interface PortalSummary {
  totalRecords: number;
  activeUsers: number;
  inactiveUsers: number;
  totalEmployees: number;
  activeProjects: number;
  onHoldProjects: number;
  completedProjects: number;
  lastRefreshed: string;
}

export interface DashboardResponse {
  summary: PortalSummary;
  reports: ReportMeta[];
}

export interface ApiError {
  status: number;
  error: string;
  message: string;
  timestamp: string;
}
