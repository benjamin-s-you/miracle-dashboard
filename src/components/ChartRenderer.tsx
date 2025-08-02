import React from 'react';
import { ProcessedData } from '../data/utils/dataUtils';
import TotalTrialsChart from './charts/TotalTrialsChart';
import AgeGroupsChart from './charts/AgeGroupsChart';
import GenderChart from './charts/GenderChart';
import ConditionsChart from './charts/ConditionsChart';
import SponsorsChart from './charts/SponsorsChart';
import StartYearChart from './charts/StartYearChart';
import CompletionYearChart from './charts/CompletionYearChart';
import StudyStatusChart from './charts/StudyStatusChart';

interface ChartRendererProps {
  type: string;
  data: ProcessedData;
}

export default function ChartRenderer({ type, data }: ChartRendererProps) {
  switch (type) {
    case 'TotalTrialsChart':
      return (
        <TotalTrialsChart
          clinicalTrialsGovTrials={data.usTrials}
          eudraCTTrials={data.euTrials}
        />
      );

    case 'AgeGroupsChart':
      return <AgeGroupsChart trials={data.trials} />;

    case 'GenderChart':
      return <GenderChart trials={data.trials} />;

    case 'ConditionsChart':
      return <ConditionsChart conditions={data.conditions} />;

    case 'SponsorsChart':
      return <SponsorsChart sponsors={data.sponsors} />;

    case 'StartYearChart':
      return <StartYearChart trials={data.trials} />;

    case 'CompletionYearChart':
      return <CompletionYearChart trials={data.trials} />;

    case 'StudyStatusChart':
      return <StudyStatusChart status={data.statuses} />;

    default:
      return <div>Unknown chart type: {type}</div>;
  }
}
