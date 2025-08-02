import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  ResponsiveContainer,
  Tooltip,
  YAxis,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from 'recharts';
import { DataSource } from '../../data/utils/dataUtils';

interface CompletionYearChartProps {
  trials: Array<{
    completionDate: Date | null;
    dataSource: DataSource;
  }>;
}

export default function CompletionYearChart({
  trials,
}: CompletionYearChartProps) {
  const completionYearCounts: { [key: string]: number } = {};

  trials.forEach(trial => {
    const category = trial.completionDate
      ? trial.completionDate.getFullYear().toString()
      : 'N/A';
    completionYearCounts[category] = (completionYearCounts[category] || 0) + 1;
  });

  const COLORS = [
    '#8b6bc7',
    '#d4a5ff',
    '#b08dd8',
    '#e6c7ff',
    '#6a4c9a',
    '#b07ad8',
    '#9c7bb8',
    '#c4a3e8',
    '#8a6bc7',
    '#d3a5ff',
    '#af8dd8',
    '#e5c7ff',
  ];

  const data = Object.entries(completionYearCounts)
    .sort(([yearA], [yearB]) => {
      // Handle 'N/A' values - put them at the end
      if (yearA === 'N/A' && yearB === 'N/A') return 0;
      if (yearA === 'N/A') return 1;
      if (yearB === 'N/A') return -1;

      // Sort years numerically (ascending order)
      return parseInt(yearA) - parseInt(yearB);
    })
    .map(([completionYear, count], index) => ({
      name: completionYear,
      value: count,
      fill: COLORS[index % COLORS.length],
    }));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h6" gutterBottom>
          Trials by Completion Year (Completion Date)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Distribution of clinical trials by what year they will be completed
          (not primary completion year)
        </Typography>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="category"
              dataKey="name"
              width={100}
              angle={-90}
              tick={{ dy: 20 }}
              height={50}
            />
            <YAxis type="number" />
            <Tooltip
              formatter={(value, name) => [value, 'Trials']}
              labelFormatter={(label, payload) => {
                if (payload && payload[0] && payload[0].payload) {
                  return payload[0].payload.name;
                }
                return label;
              }}
            />
            <Bar dataKey="value" fill="#8b6bc7" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
