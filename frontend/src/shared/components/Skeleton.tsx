import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type SkeletonVariant = 'text' | 'circular' | 'rectangular';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  circular: 'h-10 w-10 rounded-full',
  rectangular: 'h-24 w-full rounded-lg',
};

export function Skeleton({ variant = 'rectangular', className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-brand-light/80', variantClasses[variant], className)}
      aria-hidden="true"
      {...props}
    />
  );
}
