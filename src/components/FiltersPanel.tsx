import React, { useCallback } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { Refresh, Search } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFilterStore, DataSource } from '../stores/filterStore';
import { useDataStore } from '../stores/dataStore';

export default function FiltersPanel() {
  const {
    dataSource,
    condition,
    dateRange,
    setDataSource,
    setCondition,
    setDateRange,
    resetFilters,
  } = useFilterStore();
  const { applyFilters } = useDataStore();

  const handleDataSourceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDataSource(event.target.value as DataSource);
      // Apply filters immediately when selection changes
      applyFilters();
    },
    [applyFilters, setDataSource]
  );

  const handleConditionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCondition(event.target.value);
      // Apply filters immediately when condition changes
      applyFilters();
    },
    [applyFilters, setCondition]
  );

  const handleStartDateChange = useCallback(
    (date: Date | null) => {
      setDateRange(date, dateRange.end);
      applyFilters();
    },
    [applyFilters, setDateRange, dateRange.end]
  );

  const handleEndDateChange = useCallback(
    (date: Date | null) => {
      setDateRange(dateRange.start, date);
      applyFilters();
    },
    [applyFilters, setDateRange, dateRange.start]
  );

  const handleReset = useCallback(() => {
    resetFilters();
    applyFilters();
  }, [applyFilters, resetFilters]);

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Filters
        </Typography>
        <Button
          size="small"
          startIcon={<Refresh />}
          onClick={handleReset}
          variant="outlined"
        >
          Reset
        </Button>
      </Box>

      <Stack spacing={3}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Search Conditions
          </Typography>
          <TextField
            label="Search Conditions"
            value={condition}
            onChange={handleConditionChange}
            placeholder="Enter condition name..."
            size="small"
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl component="fieldset" sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Data Source
            </Typography>
            <RadioGroup
              row
              name="dataSource"
              value={dataSource}
              onChange={handleDataSourceChange}
            >
              <FormControlLabel
                value="BOTH"
                control={<Radio />}
                label="Both (US & EU)"
              />
              <FormControlLabel
                value="US"
                control={<Radio />}
                label="US Only"
              />
              <FormControlLabel
                value="EU"
                control={<Radio />}
                label="EU Only"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Date Range (based on Start Date)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 0.5, display: 'block' }}
                >
                  Start Date
                </Typography>
                <DatePicker
                  selected={dateRange.start || undefined}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={dateRange.start || undefined}
                  endDate={dateRange.end || undefined}
                  placeholderText="Start Date"
                  className="date-picker-input"
                  dateFormat="MM/dd/yyyy"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                to
              </Typography>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 0.5, display: 'block' }}
                >
                  End Date
                </Typography>
                <DatePicker
                  selected={dateRange.end || undefined}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={dateRange.start || undefined}
                  endDate={dateRange.end || undefined}
                  minDate={dateRange.start || undefined}
                  placeholderText="End Date"
                  className="date-picker-input"
                  dateFormat="MM/dd/yyyy"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
