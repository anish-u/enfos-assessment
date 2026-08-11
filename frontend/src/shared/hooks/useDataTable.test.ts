import { renderHook, act } from '@testing-library/react';
import type { ColumnDefinition } from '../../types';
import { useDataTable } from './useDataTable';

const columns: ColumnDefinition[] = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'score', label: 'Score', type: 'number' },
  { key: 'createdDate', label: 'Created', type: 'date' },
];

const rows = [
  { name: 'Charlie', score: 30, createdDate: '2023-03-01' },
  { name: 'Alice', score: 90, createdDate: '2023-01-01' },
  { name: 'Bob', score: 60, createdDate: '2023-02-01' },
  { name: 'Delta', score: 10, createdDate: '2023-04-01' },
  { name: 'Echo', score: 50, createdDate: '2023-05-01' },
  { name: 'Foxtrot', score: 70, createdDate: '2023-06-01' },
  { name: 'Golf', score: 40, createdDate: '2023-07-01' },
  { name: 'Hotel', score: 80, createdDate: '2023-08-01' },
  { name: 'India', score: 20, createdDate: '2023-09-01' },
  { name: 'Juliet', score: 55, createdDate: '2023-10-01' },
  { name: 'Kilo', score: 35, createdDate: '2023-11-01' },
];

describe('useDataTable', () => {
  it('filters rows by search term', () => {
    const { result } = renderHook(() => useDataTable({ rows, columns, defaultPageSize: 5 }));

    act(() => {
      result.current.setSearch('alice');
    });

    expect(result.current.filteredCount).toBe(1);
    expect(result.current.paginatedRows[0]?.name).toBe('Alice');
  });

  it('sorts rows ascending by column', () => {
    const { result } = renderHook(() => useDataTable({ rows, columns, defaultPageSize: 20 }));

    act(() => {
      result.current.toggleSort('name');
    });

    expect(result.current.paginatedRows[0]?.name).toBe('Alice');
    expect(result.current.paginatedRows[1]?.name).toBe('Bob');
  });

  it('paginates sorted rows', () => {
    const { result } = renderHook(() => useDataTable({ rows, columns, defaultPageSize: 5 }));

    act(() => {
      result.current.toggleSort('score');
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.paginatedRows).toHaveLength(5);
    expect(result.current.paginatedRows[0]?.name).toBe('Echo');
  });

  it('sorts descending when toggled twice', () => {
    const { result } = renderHook(() => useDataTable({ rows, columns, defaultPageSize: 20 }));

    act(() => {
      result.current.toggleSort('name');
    });
    act(() => {
      result.current.toggleSort('name');
    });

    expect(result.current.sortDir).toBe('desc');
    expect(result.current.paginatedRows[0]?.name).toBe('Kilo');
  });

  it('keeps null and invalid values last when sorting ascending', () => {
    const mixedRows = [
      { name: 'Valid', score: 10, createdDate: '2023-01-01' },
      { name: 'Missing score', score: null, createdDate: '2023-02-01' },
      { name: 'Bad score', score: 'n/a', createdDate: '2023-03-01' },
      { name: 'Bad date', score: 5, createdDate: 'not-a-date' },
    ];

    const { result } = renderHook(() =>
      useDataTable({ rows: mixedRows, columns, defaultPageSize: 10 }),
    );

    act(() => {
      result.current.toggleSort('score');
    });

    expect(result.current.paginatedRows[0]?.name).toBe('Bad date');
    expect(result.current.paginatedRows[1]?.name).toBe('Valid');
    expect(result.current.paginatedRows[2]?.name).toBe('Missing score');
    expect(result.current.paginatedRows[3]?.name).toBe('Bad score');
  });

  it('clamps page when filter reduces total pages', () => {
    const { result } = renderHook(() => useDataTable({ rows, columns, defaultPageSize: 5 }));

    act(() => {
      result.current.setPage(3);
      result.current.setSearch('alice');
    });

    expect(result.current.page).toBe(1);
    expect(result.current.filteredCount).toBe(1);
  });
});
