import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SponsorsChartProps {
  sponsors: { [key: string]: number };
}

export default function SponsorsChart({ sponsors }: SponsorsChartProps) {
  // Get top 10 sponsors
  const topSponsors = Object.entries(sponsors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([sponsor, count]) => ({
      name: sponsor
        .trim()
        .split(/\s+/)
        .map(word => word[0]?.toUpperCase() || '')
        .join(''),
      value: count,
      fullName: sponsor,
    }));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h6" gutterBottom>
          Top Sponsors
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Clinical trials by sponsor (top 10)
        </Typography>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topSponsors} layout="horizontal">
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
                  return payload[0].payload.fullName;
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
