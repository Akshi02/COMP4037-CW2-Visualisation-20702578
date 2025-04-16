import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import RadarChart from '../components/RadarChart';
import BarChart from '../components/BarChart';

export default function Home() {
  const [data, setData] = useState([]);
  const [ageGroup, setAgeGroup] = useState('');
  const [gender, setGender] = useState('female');
  const [selectedImpact, setSelectedImpact] = useState('mean_ghgs');

  const impactVars = ['mean_ghgs', 'mean_land', 'mean_watscar', 'mean_bio', 'mean_eut'];
  const impactLabels = ['GHG emissions', 'Land use', 'Water use', 'Biodiversity loss', 'Eutrophication'];
  const impactMap = Object.fromEntries(impactLabels.map((l, i) => [l, impactVars[i]]));
  const reverseImpactMap = Object.fromEntries(impactVars.map((v, i) => [v, impactLabels[i]]));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/Results_21Mar2022.csv');
      const text = await response.text();
      const result = Papa.parse(text, { header: true, dynamicTyping: true });
      setData(result.data);
      setAgeGroup(result.data[0]?.age_group || '');
    };
    fetchData();
  }, []);

  const ageOptions = [...new Set(data.map(row => row.age_group))].filter(Boolean);
  const currentIndex = ageOptions.indexOf(ageGroup);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Akshita Bhatia's COMP4037 CW2 Data Visualisations</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%' }}>
          <RadarChart
            data={data}
            gender={gender}
            ageGroup={ageGroup}
            selectedImpact={selectedImpact}
            onImpactClick={(label) => setSelectedImpact(impactMap[label])}
          />

          {/* Gender toggle below radar */}
          <div style={{ marginTop: '20px', textAlign: 'center', marginRight: '60px' }}>
            <label style={{ marginRight: '10px' }}>Gender: </label>
            <button
              onClick={() => setGender('female')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #aaa',
                marginRight: '20px',
                backgroundColor: gender === 'female' ? '#e0f7fa' : 'white',
                fontWeight: gender === 'female' ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
            >
              Female
            </button>
            <button
              onClick={() => setGender('male')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #aaa',
                marginRight: '40px',
                backgroundColor: gender === 'male' ? '#e0f7fa' : 'white',
                fontWeight: gender === 'male' ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
            >
              Male
            </button>
          </div>
        </div>

        <div style={{ width: '48%'}}>
          <BarChart
            data={data}
            ageGroup={ageGroup}
            selectedImpact={selectedImpact}
          />

          {/* Slider below bar chart */}
          {ageOptions.length > 0 && (
            <div style={{ marginTop: '40px', textAlign: 'center', marginRight: '90px' }}>
              <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Age Group:</label>
              <input
                type="range"
                min={0}
                max={ageOptions.length - 1}
                value={currentIndex}
                onChange={(e) => setAgeGroup(ageOptions[parseInt(e.target.value)])}
                style={{ width: '80%' }}
              />
              <div style={{ marginTop: '10px', marginRight: '-70px' }}>
                {ageOptions.map((ag, idx) => (
                  <span
                    key={ag}
                    onClick={() => setAgeGroup(ag)}
                    style={{
                      margin: '0 20px',
                      marginRight: '20px',
                      cursor: 'pointer',
                      fontWeight: ag === ageGroup ? 'bold' : 'normal',
                      textDecoration: ag === ageGroup ? 'underline' : 'none'
                    }}
                  >
                    {ag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
