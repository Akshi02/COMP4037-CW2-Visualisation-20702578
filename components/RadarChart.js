import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const impactVars = ['mean_ghgs', 'mean_land', 'mean_watscar', 'mean_bio', 'mean_eut'];
const impactLabels = ['GHG emissions', 'Land use', 'Water use', 'Biodiversity loss', 'Eutrophication'];

const dietColorMap = {
  meat100: '#008000',
  meat50: '#4b0082',
  meat: '#EE4B2B',
  fish: '#00FEFC',
  veggie: '#FF69B4',
  vegan: '#FFE900',
};

const dietOrder = ['meat100', 'meat50', 'meat', 'fish', 'veggie', 'vegan'];

export default function RadarChart({ data, gender, ageGroup, selectedImpact, onImpactClick }) {
  const [traces, setTraces] = useState([]);

  useEffect(() => {
    if (!Array.isArray(data) || !gender || !ageGroup) return;

    const filtered = data.filter(row => row.age_group === ageGroup && row.sex === gender);

    const grouped = {};
    filtered.forEach(row => {
      const diet = row.diet_group?.trim().toLowerCase();
      if (!grouped[diet]) grouped[diet] = [];
      grouped[diet].push(row);
    });

    const maxVals = {};
    impactVars.forEach(v => {
      maxVals[v] = Math.max(...filtered.map(r => r[v] || 0));
    });

    const chartTraces = dietOrder
      .filter(diet => grouped[diet])
      .map(diet => {
        const rows = grouped[diet];
        const means = impactVars.map(v =>
          rows.reduce((sum, r) => sum + (r[v] || 0), 0) / rows.length
        );
        const normalized = means.map((val, i) => val / maxVals[impactVars[i]]);
        const color = dietColorMap[diet] || '#ccc';

        const markerSizes = normalized.map((_, i) =>
          impactVars[i] === selectedImpact ? 10 : 5
        );

        return {
          type: 'scatterpolar',
          r: normalized,
          theta: impactLabels.map((label, i) =>
            impactVars[i] === selectedImpact ? `<b>${label}</b>` : label
          ),
          fill: 'toself',
          name: diet.charAt(0).toUpperCase() + diet.slice(1),
          hovertext: means.map((val, i) => `${impactLabels[i]}: ${val.toFixed(2)}`),
          hoverinfo: 'text',
          line: {
            color,
            width: 2,
          },
          marker: {
            color,
            size: markerSizes,
            symbol: 'circle',
          },
          fillcolor: color + '33',
        };
      });

    setTraces(chartTraces);
  }, [data, gender, ageGroup, selectedImpact]);

  return (
    <div>
      <h3>🌍 Relative Environmental Impact by Diet (Age: {ageGroup}, Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)})</h3>
      <Plot
        data={traces}
        layout={{
            polar: { radialaxis: { visible: true, range: [0, 1] } },
            showlegend: true,
            height: 420,
            margin: {
              t: 50,
              b: 20,
              l: 40,
              r: 40
            }
          }}           
        config={{ responsive: true }}
        onClick={(e) => {
          if (e?.points?.[0]?.theta) {
            onImpactClick?.(e.points[0].theta);
          }
        }}
        transition={{
          duration: 500,
          easing: 'cubic-in-out',
        }}
      />
    </div>
  );
}
