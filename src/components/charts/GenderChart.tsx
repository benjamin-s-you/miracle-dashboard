import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { DataSource } from '../../data/utils/dataUtils';

interface GenderChartProps {
  trials: Array<{
    gender: string;
    dataSource: DataSource;
  }>;
}

export default function GenderChart({ trials }: GenderChartProps) {
  const genderCounts: { [key: string]: number } = {};

  trials.forEach(trial => {
    const category = trial.gender;
    genderCounts[category] = (genderCounts[category] || 0) + 1;
  });

  const data = Object.entries(genderCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([gender, count], index) => ({
      name: gender,
      value: count,
      fill: `hsl(${index * 120}, 70%, 60%)`,
    }));

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

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h6" gutterBottom>
          Trials by Gender
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Distribution of clinical trials by target gender
        </Typography>

        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${((percent || 0) * 100).toFixed(3)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
