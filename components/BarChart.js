import dynamic from 'next/dynamic';
import React from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function BarChart({ data, ageGroup, selectedImpact }) {
  if (!data || data.length === 0) return null;

  const filtered = data.filter(row => row.age_group === ageGroup && row.diet_group && row.sex);

  const grouped = {};
  filtered.forEach(row => {
    const group = row.diet_group.trim().toLowerCase();
    const gender = row.sex.toLowerCase();

    if (!grouped[group]) grouped[group] = { female: [], male: [] };
    grouped[group][gender].push(row[selectedImpact]);
  });

  const dietGroups = Object.keys(grouped);
  const femaleValues = dietGroups.map(group =>
    grouped[group].female.length
      ? grouped[group].female.reduce((a, b) => a + b, 0) / grouped[group].female.length
      : 0
  );
  const maleValues = dietGroups.map(group =>
    grouped[group].male.length
      ? grouped[group].male.reduce((a, b) => a + b, 0) / grouped[group].male.length
      : 0
  );

  return (
    <div>
      <h3>📊 {selectedImpact.replace('mean_', '').toUpperCase()} by Diet and Gender (Age: {ageGroup})</h3>
      <Plot
        data={[
          {
            x: dietGroups.map(d => d.charAt(0).toUpperCase() + d.slice(1)),
            y: femaleValues,
            name: 'Female',
            type: 'bar',
            marker: { color: 'pink' },
          },
          {
            x: dietGroups.map(d => d.charAt(0).toUpperCase() + d.slice(1)),
            y: maleValues,
            name: 'Male',
            type: 'bar',
            marker: { color: 'lightblue' },
          }
        ]}
        layout={{
          barmode: 'group',
          legend: { orientation: 'v', x: 1.05, y: 1 },
          margin: { t: 50, b:15, r: 120 },
          xaxis: { title: 'Diet Group' },
          yaxis: { title: 'Impact Value' },
          height: 500
        }}
        config={{ responsive: true }}
        transition={{
          duration: 500,
          easing: 'cubic-in-out',
        }}
      />
    </div>
  );
}
