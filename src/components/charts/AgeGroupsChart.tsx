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

interface AgeGroupsChartProps {
  trials: Array<{
    ageGroup: string[] | string;
    dataSource: DataSource;
  }>;
}

export default function AgeGroupsChart({ trials }: AgeGroupsChartProps) {
  // Helper method to categorize age groups
  const categorizeAgeGroup = (ageGroup: string[] | string): string[] => {
    if (!ageGroup) return ['Unknown'];

    const ageGroupStr = Array.isArray(ageGroup) ? ageGroup.join(' ') : ageGroup;
    const normalized = ageGroupStr.toLowerCase();

    const categories: string[] = [];

    // Check for each age category
    if (
      normalized.includes('child') ||
      normalized.includes('infant') ||
      normalized.includes('newborn')
    ) {
      categories.push('Children');
    }
    if (normalized.includes('adult')) {
      categories.push('Adults');
    }
    if (normalized.includes('elderly') || normalized.includes('older')) {
      categories.push('Elderly');
    }
    if (normalized.includes('adolescent') || normalized.includes('teen')) {
      categories.push('Adolescents');
    }
    if (normalized.includes('all') || normalized.includes('any')) {
      categories.push('All Ages');
    }

    // If no specific categories found, mark as unknown
    if (categories.length === 0) {
      categories.push('Unknown');
    }

    return categories;
  };

  // Count trials by age group
  const ageGroupCounts: { [key: string]: number } = {};

  trials.forEach(trial => {
    const categories = categorizeAgeGroup(trial.ageGroup);

    // Count each category separately
    categories.forEach(category => {
      ageGroupCounts[category] = (ageGroupCounts[category] || 0) + 1;
    });
  });

  const data = Object.entries(ageGroupCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([ageGroup, count], index) => ({
      name: ageGroup,
      value: count,
      fill: `hsl(${index * 60}, 70%, 60%)`,
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
          Trials by Age Group
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Distribution of clinical trials by target age group
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
