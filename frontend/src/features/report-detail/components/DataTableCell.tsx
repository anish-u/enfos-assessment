import type { ReactNode } from 'react';
import { Badge } from '../../../shared/components';
import { formatDate } from '../../../shared/utils/formatDate';
import type { ColumnType } from '../../../types';
import { getStatusBadgeVariant } from '../types';

function formatCellValue(value: unknown, type: ColumnType): ReactNode {
  if (value === null || value === undefined || value === '') {
    return <span className="text-muted">—</span>;
  }

  switch (type) {
    case 'number':
      return <span className="tabular-nums">{String(value)}</span>;
    case 'date':
      return formatDate(String(value));
    case 'status':
      return (
        <Badge variant={getStatusBadgeVariant(String(value))}>{String(value)}</Badge>
      );
    case 'string':
    default:
      return String(value);
  }
}

interface DataTableCellProps {
  value: unknown;
  type: ColumnType;
}

export function DataTableCell({ value, type }: DataTableCellProps) {
  return <>{formatCellValue(value, type)}</>;
}
