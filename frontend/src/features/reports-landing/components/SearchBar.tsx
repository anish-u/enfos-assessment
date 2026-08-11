import { Search } from 'lucide-react';
import { useUiStore } from '../../../store';

export function SearchBar() {
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);

  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search reports..."
        aria-label="Search reports"
        className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-base text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:text-sm"
      />
    </div>
  );
}
