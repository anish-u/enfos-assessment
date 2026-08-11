import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import { Button } from './Button';
import { PageWrapper } from './PageWrapper';

export function NotFoundPage() {
  return (
    <PageWrapper title="Page not found">
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-16 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-light text-brand">
          <FileQuestion className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-6 text-5xl font-bold tabular-nums text-brand">404</p>
        <h2 className="mt-2 text-lg font-semibold text-foreground">This page does not exist</h2>
        <p className="mt-2 max-w-md text-sm text-muted">
          The URL you entered may be incorrect, or the page may have been moved. Head back to the
          reports dashboard to continue browsing.
        </p>
        <Link to="/" className="mt-8">
          <Button>Back to reports</Button>
        </Link>
      </div>
    </PageWrapper>
  );
}
