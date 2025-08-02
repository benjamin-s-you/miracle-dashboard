import { create } from 'zustand';

export type DataSource = 'US' | 'EU' | 'BOTH';

export interface FilterState {
  dataSource: DataSource;
  condition: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  setDataSource: (source: DataSource) => void;
  setCondition: (condition: string) => void;
  setDateRange: (start: Date | null, end: Date | null) => void;
  resetFilters: () => void;
}

/**
 * Zustand store for managing filter preferences.
 **/
export const useFilterStore = create<FilterState>(set => ({
  dataSource: 'BOTH',
  condition: '',
  dateRange: {
    start: null,
    end: null,
  },

  setDataSource: (source: DataSource) =>
    set({
      dataSource: source,
    }),

  setCondition: (condition: string) =>
    set({
      condition: condition,
    }),

  setDateRange: (start: Date | null, end: Date | null) =>
    set({
      dateRange: { start, end },
    }),

  resetFilters: () =>
    set({
      dataSource: 'BOTH',
      condition: '',
      dateRange: {
        start: null,
        end: null,
      },
    }),
}));
