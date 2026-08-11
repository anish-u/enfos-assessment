import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { apiClient } from '../../../services/apiClient';
import { useDashboard } from './useDashboard';

jest.mock('../../../services/apiClient', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

const mockedGet = apiClient.get as jest.Mock;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useDashboard', () => {
  it('fetches dashboard data from /dashboard', async () => {
    const dashboard = {
      summary: {
        totalRecords: 29,
        activeUsers: 11,
        inactiveUsers: 3,
        totalEmployees: 131,
        activeProjects: 3,
        onHoldProjects: 2,
        completedProjects: 4,
        lastRefreshed: '2025-01-15T10:30:00',
      },
      reports: [
        {
          id: 'users',
          name: 'Users',
          description: 'People in the system',
          lastUpdated: '2025-01-15T10:30:00',
          rowCount: 14,
          category: 'People',
          highlights: [{ label: 'active', value: '11' }],
        },
      ],
    };

    mockedGet.mockResolvedValue({ data: dashboard });

    const { result } = renderHook(() => useDashboard(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedGet).toHaveBeenCalledWith('/dashboard');
    expect(result.current.data?.summary.totalRecords).toBe(29);
    expect(result.current.data?.reports).toHaveLength(1);
  });
});
