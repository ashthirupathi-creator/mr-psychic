import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export const TraitChart = ({ data }) => {
  // Mapping our keys to readable labels for the chart
  const chartData = [
    { subject: 'Openness', A: data.openness.score },
    { subject: 'Conscientiousness', A: data.conscientiousness.score },
    { subject: 'Extraversion', A: data.extraversion.score },
    { subject: 'Agreeableness', A: data.agreeableness.score },
    { subject: 'Emotional Stability', A: 5 - data.neuroticism.score }, // Inverting for "Stability"
  ];

  return (
    <div className="h-72 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
          <Radar
            name="Score"
            dataKey="A"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};