import { create } from 'zustand';

export interface ChartConfig {
  id: string;
  type: string;
  title: string;
}

export interface DashboardLayout {
  id: string;
  name: string;
  charts: ChartConfig[];
  isDefault?: boolean;
}

interface DashboardStore {
  layouts: DashboardLayout[];
  currentLayout: string;
  addLayout: (layout: DashboardLayout) => void;
  createNewLayout: (name: string) => string; // Returns the new layout ID
  setCurrentLayout: (id: string) => void;
  removeChartFromLayout: (layoutId: string, chartId: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  layouts: [
    {
      id: 'default',
      name: 'Default Layout',
      isDefault: true,
      charts: [
        {
          id: 'total-trials',
          type: 'TotalTrialsChart',
          title: 'Total Clinical Trials Comparison',
        },
        {
          id: 'age-groups',
          type: 'AgeGroupsChart',
          title: 'Trials by Age Group',
        },
        {
          id: 'gender',
          type: 'GenderChart',
          title: 'Trials by Gender',
        },
        {
          id: 'conditions',
          type: 'ConditionsChart',
          title: 'Trials by Condition',
        },
        {
          id: 'sponsors',
          type: 'SponsorsChart',
          title: 'Top Sponsors',
        },
        {
          id: 'start-year',
          type: 'StartYearChart',
          title: 'Trials by Start Year',
        },
        {
          id: 'completion-year',
          type: 'CompletionYearChart',
          title: 'Trials by Completion Year',
        },
        {
          id: 'study-status',
          type: 'StudyStatusChart',
          title: 'Trial Status Distribution',
        },
      ],
    },
  ],
  currentLayout: 'default',

  addLayout: layout =>
    set(state => ({
      layouts: [...state.layouts, layout],
    })),

  createNewLayout: (name: string) => {
    const newLayout: DashboardLayout = {
      id: `${Date.now()}`,
      name: name,
      charts: [],
    };
    set(state => {
      // Find the default layout to copy its charts
      const defaultLayout = state.layouts.find(layout => layout.isDefault);
      if (defaultLayout) {
        newLayout.charts = [...defaultLayout.charts];
      }
      return {
        layouts: [...state.layouts, newLayout],
      };
    });
    return newLayout.id;
  },

  setCurrentLayout: id => set({ currentLayout: id }),

  removeChartFromLayout: (layoutId, chartId) =>
    set(state => ({
      layouts: state.layouts.map(layout =>
        layout.id === layoutId
          ? {
              ...layout,
              charts: layout.charts.filter(chart => chart.id !== chartId),
            }
          : layout
      ),
    })),
}));
