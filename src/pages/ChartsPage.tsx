import React, { useEffect } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useDataStore } from '../stores/dataStore';
import TotalTrialsChart from '../components/charts/TotalTrialsChart';
import AgeGroupsChart from '../components/charts/AgeGroupsChart';
import GenderChart from '../components/charts/GenderChart';
import ConditionsChart from '../components/charts/ConditionsChart';
import SponsorsChart from '../components/charts/SponsorsChart';
import StartYearChart from '../components/charts/StartYearChart';
import CompletionYearChart from '../components/charts/CompletionYearChart';
import StudyStatusChart from '../components/charts/StudyStatusChart';

/**
 * ChartsPage component for the application.
 *
 * This component displays a page with charts and filters.
 */
export default function ChartsPage() {
  const { filteredData: data, loading, error, loadData } = useDataStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">No data available</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'grey.50' }}>
      <Typography variant="h4" gutterBottom>
        Clinical Trials Analytics
      </Typography>

      {/* Summary Statistics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Dataset Summary
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Trials
            </Typography>
            <Typography variant="h4">{data.totalTrials}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              ClinicalTrials.gov Trials
            </Typography>
            <Typography variant="h4">{data.usTrials}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              EndraCT Trials
            </Typography>
            <Typography variant="h4">{data.euTrials}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Charts Grid */}
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
        <TotalTrialsChart
          clinicalTrialsGovTrials={data.usTrials}
          eudraCTTrials={data.euTrials}
        />
        <AgeGroupsChart trials={data.trials} />
        <GenderChart trials={data.trials} />
        <ConditionsChart conditions={data.conditions} />
        <SponsorsChart sponsors={data.sponsors} />
        <StartYearChart trials={data.trials} />
        <CompletionYearChart trials={data.trials} />
        <StudyStatusChart status={data.statuses} />
      </Box>
    </Box>
  );
}
