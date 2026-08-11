import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReportsLandingPage } from './ReportsLandingPage';

const mockRefetch = jest.fn();

jest.mock('./hooks', () => ({
  useDashboard: jest.fn(),
}));

jest.mock('./components', () => ({
  DashboardHero: () => <div>Organization insights at a glance</div>,
  StatsGrid: () => <div data-testid="stats-grid" />,
  SearchBar: () => <input aria-label="Search reports" />,
  ReportGrid: ({ reports }: { reports: Array<{ id: string; name: string }> }) => (
    <div>
      {reports.map((report) => (
        <div key={report.id}>{report.name}</div>
      ))}
    </div>
  ),
  ReportsLandingSkeleton: () => <div aria-busy="true">Loading</div>,
}));

jest.mock('../../shared/hooks', () => ({
  useDebounce: (value: string) => value,
}));

jest.mock('../../store', () => ({
  useUiStore: jest.fn(),
}));

import { useDashboard } from './hooks';
import { useUiStore } from '../../store';

const mockDashboard = {
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
    {
      id: 'departments',
      name: 'Departments',
      description: 'Org structure',
      lastUpdated: '2025-01-15T10:30:00',
      rowCount: 6,
      category: 'Organization',
    },
  ],
};

describe('ReportsLandingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useUiStore).mockImplementation((selector) =>
      selector({ searchTerm: '', setSearchTerm: jest.fn() }),
    );
  });

  it('renders dashboard content on success', () => {
    jest.mocked(useDashboard).mockReturnValue({
      data: mockDashboard,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as never);

    render(<ReportsLandingPage />);

    expect(screen.getByText('Organization insights at a glance')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Departments')).toBeInTheDocument();
  });

  it('renders error state with retry', async () => {
    const user = userEvent.setup();
    jest.mocked(useDashboard).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Dashboard unavailable'),
      refetch: mockRefetch,
    } as never);

    render(<ReportsLandingPage />);

    expect(screen.getByText('Dashboard unavailable')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('shows empty search state when no reports match', () => {
    jest.mocked(useUiStore).mockImplementation((selector) =>
      selector({ searchTerm: 'zzz', setSearchTerm: jest.fn() }),
    );
    jest.mocked(useDashboard).mockReturnValue({
      data: mockDashboard,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as never);

    render(<ReportsLandingPage />);

    expect(screen.getByText('No matching reports')).toBeInTheDocument();
  });
});
