import { Briefcase, Building2, Database, Users } from 'lucide-react';
import type { PortalSummary } from '../../../types';

interface StatsGridProps {
  summary: PortalSummary;
}

const stats = [
  {
    key: 'totalRecords' as const,
    label: 'Total Records',
    icon: Database,
    getValue: (summary: PortalSummary) => summary.totalRecords,
  },
  {
    key: 'activeUsers' as const,
    label: 'Active Users',
    icon: Users,
    getValue: (summary: PortalSummary) => summary.activeUsers,
  },
  {
    key: 'totalEmployees' as const,
    label: 'Total Employees',
    icon: Building2,
    getValue: (summary: PortalSummary) => summary.totalEmployees,
  },
  {
    key: 'activeProjects' as const,
    label: 'Active Projects',
    icon: Briefcase,
    getValue: (summary: PortalSummary) => summary.activeProjects,
  },
];

export function StatsGrid({ summary }: StatsGridProps) {
  return (
    <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key metrics">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.key}
            className="rounded-lg border border-border bg-surface p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-2xl font-bold tabular-nums text-foreground">
                  {stat.getValue(summary).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
