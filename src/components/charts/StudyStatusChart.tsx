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

interface StudyStatusChartProps {
  status: { [key: string]: number };
}

export default function StudyStatusChart({ status }: StudyStatusChartProps) {
  const sortedStatuses = Object.entries(status).sort(([, a], [, b]) => b - a);

  const data = sortedStatuses.map(([condition, count], index) => ({
    name: condition,
    value: count,
    fill: `hsl(${index * 45}, 70%, 60%)`,
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
  ];

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h6" gutterBottom>
          Trials by Study Status
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Breakdown of clinical trials by Study Status (Study Status/
          Trial_Protocol)
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
              outerRadius={60}
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
