import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats valid ISO dates', () => {
    expect(formatDate('2023-01-15T09:00:00')).toBe('Jan 15, 2023');
  });

  it('returns Unknown for missing values', () => {
    expect(formatDate()).toBe('Unknown');
    expect(formatDate(null)).toBe('Unknown');
    expect(formatDate('')).toBe('Unknown');
  });

  it('returns Unknown for invalid dates', () => {
    expect(formatDate('not-a-date')).toBe('Unknown');
  });
});
