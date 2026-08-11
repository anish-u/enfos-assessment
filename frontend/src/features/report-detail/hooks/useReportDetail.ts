import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../services/apiClient';
import type { ReportDetail } from '../../../types';
import { isValidReportId } from '../types';

export function useReportDetail(reportId: string | undefined) {
  const enabled = isValidReportId(reportId);

  return useQuery({
    queryKey: ['reports', reportId],
    queryFn: async () => {
      const response = await apiClient.get<ReportDetail>(`/reports/${reportId}`);
      return response.data;
    },
    enabled,
  });
}
