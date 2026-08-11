import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { apiClient } from '../../../services/apiClient';
import type { ReportDetail } from '../../../types';
import { useReportDetail } from './useReportDetail';

jest.mock('../../../services/apiClient', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

const mockReportDetail: ReportDetail = {
  meta: {
    id: 'users',
    name: 'Users',
    description: 'People in the system',
    lastUpdated: '2025-01-15T10:30:00',
    rowCount: 1,
  },
  columns: [{ key: 'name', label: 'Name', type: 'string' }],
  rows: [{ name: 'Sarah Chen' }],
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useReportDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches report detail for a valid report id', async () => {
    jest.mocked(apiClient.get).mockResolvedValue({ data: mockReportDetail });

    const { result } = renderHook(() => useReportDetail('users'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockReportDetail);
    expect(apiClient.get).toHaveBeenCalledWith('/reports/users');
  });

  it('does not fetch when report id is invalid', async () => {
    const { result } = renderHook(() => useReportDetail('invalid-id'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.fetchStatus).toBe('idle'));

    expect(apiClient.get).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });
});
