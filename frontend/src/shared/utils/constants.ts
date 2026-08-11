export const API_BASE_URL = '/api';

export const REPORT_IDS = {
  USERS: 'users',
  DEPARTMENTS: 'departments',
  PROJECTS: 'projects',
} as const;

export type ReportId = (typeof REPORT_IDS)[keyof typeof REPORT_IDS];
