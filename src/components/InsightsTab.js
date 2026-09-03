'use client';

import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

export default function InsightsTab() {
  const scatterData = [
    { glucose: 85, hba1c: 4.8, status: 'Negative' },
    { glucose: 95, hba1c: 5.2, status: 'Negative' },
    { glucose: 105, hba1c: 5.4, status: 'Negative' },
    { glucose: 110, hba1c: 5.6, status: 'Negative' },
    { glucose: 125, hba1c: 5.9, status: 'Negative' },
    { glucose: 145, hba1c: 6.4, status: 'Positive' },
    { glucose: 165, hba1c: 7.1, status: 'Positive' },
    { glucose: 190, hba1c: 7.8, status: 'Positive' },
    { glucose: 220, hba1c: 8.5, status: 'Positive' },
    { glucose: 260, hba1c: 9.6, status: 'Positive' }
  ];

  const bmiData = [
    { category: 'Underweight (<18.5)', rate: 1.2 },
    { category: 'Normal (18.5-24.9)', rate: 3.8 },
    { category: 'Overweight (25-29.9)', rate: 9.4 },
    { category: 'Obese Class I (30-34.9)', rate: 18.2 },
    { category: 'Obese Class II+ (≥35)', rate: 28.6 }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>
        🔬 Exploratory Data Analysis & Visual Insights
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>
            🩸 Blood Glucose vs. HbA1c Cluster Separation
          </h3>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <XAxis type="number" dataKey="glucose" name="Glucose" stroke="#94a3b8" unit=" mg/dL" />
                <YAxis type="number" dataKey="hba1c" name="HbA1c" stroke="#94a3b8" unit="%" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: '#0f172a', borderRadius: '8px' }} />
                <Scatter name="Biomarkers" data={scatterData} fill="#38bdf8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>
            ⚖️ Diabetes Incidence Rate by BMI Category
          </h3>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bmiData} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <XAxis dataKey="category" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" unit="%" />
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '8px' }} />
                <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                  {bmiData.map((entry, index) => (
                    <Cell key={`cell-bmi-${index}`} fill={index >= 3 ? '#ef4444' : index === 2 ? '#f59e0b' : '#38bdf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
