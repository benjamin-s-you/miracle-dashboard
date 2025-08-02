import { create } from 'zustand';
import { DataUtils, ProcessedData } from '../data/utils/dataUtils';
import { useFilterStore } from './filterStore';

interface DataState {
  data: ProcessedData | null;
  filteredData: ProcessedData | null;
  loading: boolean;
  error: string | null;
  loadData: () => Promise<void>;
  clearData: () => void;
  applyFilters: () => void;
}

/**
 * Zustand store for managing data from loaded CSV files.
 */
export const useDataStore = create<DataState>((set, get) => ({
  data: null,
  filteredData: null,
  loading: false,
  error: null,

  loadData: async () => {
    if (get().data) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const processedData = await DataUtils.loadAndProcessData();
      set({ data: processedData, filteredData: processedData, loading: false });
      setTimeout(() => get().applyFilters(), 0);
    } catch (err) {
      console.error('Error loading data:', err);
      set({
        error: 'Failed to load data',
        loading: false,
      });
    }
  },

  clearData: () => {
    set({ data: null, filteredData: null, loading: false, error: null });
  },

  applyFilters: () => {
    const { data } = get();
    const { dataSource, condition, dateRange } = useFilterStore.getState();

    if (!data) return;

    let filteredTrials = [...data.trials];

    // Filter by data source
    if (dataSource === 'US') {
      filteredTrials = filteredTrials.filter(trial => trial.source === 'US');
    } else if (dataSource === 'EU') {
      filteredTrials = filteredTrials.filter(trial => trial.source === 'EU');
    }

    // Filter by condition (case-insensitive search)
    if (condition.trim()) {
      filteredTrials = filteredTrials.filter(trial =>
        trial.condition.toLowerCase().includes(condition.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange.start) {
      filteredTrials = filteredTrials.filter(
        trial => trial.startDate && trial.startDate >= dateRange.start!
      );
    }

    if (dateRange.end) {
      filteredTrials = filteredTrials.filter(
        trial => trial.startDate && trial.startDate <= dateRange.end!
      );
    }

    // Recalculate statistics for filtered data
    const usTrials = filteredTrials.filter(trial => trial.source === 'US');
    const euTrials = filteredTrials.filter(trial => trial.source === 'EU');

    const conditions: { [key: string]: number } = {};
    const sponsors: { [key: string]: number } = {};
    const statuses: { [key: string]: number } = {};

    filteredTrials.forEach(trial => {
      const condition = trial.condition || 'Unknown';
      conditions[condition] = (conditions[condition] || 0) + 1;

      const sponsor = trial.sponsor || 'Unknown';
      sponsors[sponsor] = (sponsors[sponsor] || 0) + 1;

      const status = trial.status || 'Unknown';
      statuses[status] = (statuses[status] || 0) + 1;
    });

    const filteredData: ProcessedData = {
      trials: filteredTrials,
      totalTrials: filteredTrials.length,
      usTrials: usTrials.length,
      euTrials: euTrials.length,
      conditions,
      sponsors,
      statuses,
    };

    set({ filteredData });
  },
}));
