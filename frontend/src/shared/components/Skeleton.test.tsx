import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with rectangular variant by default', () => {
    render(<Skeleton data-testid="skeleton" className="h-8" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('animate-pulse', 'bg-brand-light/80', 'rounded-lg', 'h-8');
  });

  it('renders text variant classes', () => {
    render(<Skeleton variant="text" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('h-4', 'rounded');
  });

  it('renders circular variant classes', () => {
    render(<Skeleton variant="circular" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
  });
});
