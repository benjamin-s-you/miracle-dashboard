import React, { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDashboardStore } from '../stores/dashboardStore';
import { useDataStore } from '../stores/dataStore';
import ChartRenderer from '../components/ChartRenderer';
import FiltersPanel from '../components/FiltersPanel';

/**
 * DashboardPage component for the application.
 *
 * This component displays a dashboard with charts and filters.
 */
export default function DashboardPage() {
  const { id } = useParams();
  const { layouts, currentLayout, setCurrentLayout, removeChartFromLayout } =
    useDashboardStore();
  const {
    filteredData: data,
    loading,
    error,
    loadData,
    applyFilters,
  } = useDataStore();

  // Set current layout based on URL parameter
  useEffect(() => {
    if (id) {
      setCurrentLayout(id);
    }
  }, [id, setCurrentLayout]);

  // Load data
  useEffect(() => {
    loadData();
  }, [loadData]);

  const currentLayoutData = useMemo(
    () => layouts.find(layout => layout.id === currentLayout),
    [layouts, currentLayout]
  );

  const handleRemoveChart = useCallback(
    (chartId: string) => {
      if (currentLayoutData && !currentLayoutData.isDefault) {
        removeChartFromLayout(currentLayout, chartId);
      }
    },
    [currentLayoutData, removeChartFromLayout, currentLayout]
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!data || !currentLayoutData) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">No data or layout available</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <FiltersPanel />
      <Box sx={{ p: 3, backgroundColor: 'grey.50' }}>
        <Typography variant="h4" gutterBottom>
          {currentLayoutData.name}
        </Typography>

        {currentLayoutData.isDefault && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This is the default layout showing all available charts.
          </Typography>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {currentLayoutData.charts.map(chart => (
            <Card key={chart.id} sx={{ position: 'relative' }}>
              <CardContent>
                {!currentLayoutData.isDefault && (
                  <IconButton
                    size="small"
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                    }}
                    onClick={() => handleRemoveChart(chart.id)}
                  >
                    <Delete />
                  </IconButton>
                )}
                <ChartRenderer type={chart.type} data={data} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
