import { Link, useLocation } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { cn } from '../../utils/cn';

const navLinks = [{ to: '/', label: 'Reports' }];

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Enfos Reporting</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.to || (link.to === '/' && pathname.startsWith('/reports'));
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                      isActive
                        ? 'bg-brand-light text-brand-dark'
                        : 'text-muted hover:bg-brand-light/50 hover:text-foreground',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
