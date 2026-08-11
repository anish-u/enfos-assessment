import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('NotFoundPage', () => {
  it('renders 404 message and link back to reports', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('This page does not exist')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to reports' })).toHaveAttribute('href', '/');
  });
});
