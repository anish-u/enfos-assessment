export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:px-6 lg:px-8">
        <p>&copy; {year} Enfos Reporting Portal</p>
        <p className="text-xs">Internal reporting and analytics</p>
      </div>
    </footer>
  );
}
