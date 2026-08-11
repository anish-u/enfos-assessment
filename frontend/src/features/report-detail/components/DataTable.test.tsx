import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ColumnDefinition } from '../../../types';
import { DataTable } from './DataTable';

const columns: ColumnDefinition[] = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'createdDate', label: 'Created Date', type: 'date' },
  { key: 'status', label: 'Status', type: 'status' },
];

const rows = [
  {
    name: 'Sarah Chen',
    createdDate: '2023-01-15T09:00:00',
    status: 'Active',
  },
  {
    name: 'James Wilson',
    createdDate: '2023-02-20T09:00:00',
    status: 'Inactive',
  },
];

describe('DataTable', () => {
  it('renders column headers from API definitions', () => {
    render(<DataTable columns={columns} rows={rows} />);

    expect(screen.getByRole('columnheader', { name: /Name/ })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Created Date/ })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Status/ })).toBeInTheDocument();
  });

  it('formats date cells', () => {
    render(<DataTable columns={columns} rows={rows} />);

    expect(screen.getByText('Jan 15, 2023')).toBeInTheDocument();
  });

  it('renders status badge for Active', () => {
    render(<DataTable columns={columns} rows={rows} />);

    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });

  it('filters rows via toolbar search', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} rows={rows} />);

    await user.type(screen.getByLabelText('Filter table rows'), 'james');

    expect(screen.queryByText('Sarah Chen')).not.toBeInTheDocument();
    expect(screen.getByText('James Wilson')).toBeInTheDocument();
  });

  it('sorts rows when header is clicked', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} rows={rows} />);

    await user.click(screen.getByRole('button', { name: /Name/ }));

    const names = screen.getAllByRole('cell').filter((cell) => {
      return cell.textContent === 'James Wilson' || cell.textContent === 'Sarah Chen';
    });

    expect(names[0]).toHaveTextContent('James Wilson');
  });
});
