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

interface TotalTrialsChartProps {
  clinicalTrialsGovTrials: number;
  eudraCTTrials: number;
}

export default function TotalTrialsChart({
  clinicalTrialsGovTrials,
  eudraCTTrials,
}: TotalTrialsChartProps) {
  const data = [
    {
      name: 'Clinical Trials Gov',
      value: clinicalTrialsGovTrials,
      fill: '#8b6bc7',
    },
    { name: 'Eudra CT', value: eudraCTTrials, fill: '#d4a5ff' },
  ];

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h6" gutterBottom>
          Total Clinical Trials Comparison
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Number of trials in ClinicalTrials.gov vs EudraCT
        </Typography>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8b6bc7" />
          </BarChart>
        </ResponsiveContainer>

        <Typography
          variant="h4"
          sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}
        >
          {clinicalTrialsGovTrials + eudraCTTrials}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          Total Trials
        </Typography>
      </CardContent>
    </Card>
  );
}
