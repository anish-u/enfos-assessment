import { formatDate } from '../../../shared/utils';
import type { PortalSummary } from '../../../types';

interface DashboardHeroProps {
  summary: PortalSummary;
}

export function DashboardHero({ summary }: DashboardHeroProps) {
  return (
    <section className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand">Reporting Portal</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Organization insights at a glance
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Browse people, departments, and project reports. Each dataset is refreshed from the
            latest organizational records.
          </p>
        </div>
        <div className="shrink-0 rounded-lg bg-brand-light px-4 py-2 text-sm">
          <span className="text-muted">Last refreshed </span>
          <span className="font-medium text-brand-dark">
            {formatDate(summary.lastRefreshed)}
          </span>
        </div>
      </div>
    </section>
  );
}
