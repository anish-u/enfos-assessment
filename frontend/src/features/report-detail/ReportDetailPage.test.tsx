import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReportDetailPage } from './ReportDetailPage';

const mockNavigate = jest.fn();
const mockRefetch = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}));

jest.mock('./hooks', () => ({
  useReportDetail: jest.fn(),
}));

jest.mock('./components', () => ({
  DataTable: () => <div data-testid="data-table" />,
  ReportBreadcrumb: ({ reportName }: { reportName: string }) => <nav>{reportName}</nav>,
  ReportDetailSkeleton: () => <div aria-busy="true">Loading</div>,
}));

import { useParams } from 'react-router-dom';
import { useReportDetail } from './hooks';

describe('ReportDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows not found state for invalid report id', async () => {
    const user = userEvent.setup();
    jest.mocked(useParams).mockReturnValue({ reportId: 'invalid-id' });
    jest.mocked(useReportDetail).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as never);

    render(<ReportDetailPage />);

    expect(screen.getByText('Report not found')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Back to reports' }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows API error message from helper', () => {
    jest.mocked(useParams).mockReturnValue({ reportId: 'users' });
    jest.mocked(useReportDetail).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Request failed with status code 500'),
      refetch: mockRefetch,
    } as never);

    render(<ReportDetailPage />);

    expect(screen.getByText('Request failed with status code 500')).toBeInTheDocument();
  });

  it('renders table when report data is available', () => {
    jest.mocked(useParams).mockReturnValue({ reportId: 'users' });
    jest.mocked(useReportDetail).mockReturnValue({
      data: {
        meta: {
          id: 'users',
          name: 'Users',
          description: 'People in the system',
          lastUpdated: '2025-01-15T10:30:00',
          rowCount: 1,
        },
        columns: [{ key: 'name', label: 'Name', type: 'string' }],
        rows: [{ name: 'Sarah Chen' }],
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as never);

    render(<ReportDetailPage />);

    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });
});
