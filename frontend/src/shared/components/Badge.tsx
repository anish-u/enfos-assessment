import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

type BadgeVariant = 'default' | 'success' | 'neutral' | 'warning';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-brand-light text-brand-dark',
  success: 'bg-green-50 text-green-700',
  neutral: 'bg-brand-light/60 text-muted',
  warning: 'bg-amber-50 text-amber-700',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
