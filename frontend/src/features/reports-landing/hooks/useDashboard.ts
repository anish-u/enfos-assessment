import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../services/apiClient';
import type { DashboardResponse } from '../../../types';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await apiClient.get<DashboardResponse>('/dashboard');
      return response.data;
    },
  });
}
