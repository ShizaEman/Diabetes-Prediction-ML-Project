'use client';

import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function DashboardTab() {
  const [simGlucose, setSimGlucose] = useState(140);
  const [simHba1c, setSimHba1c] = useState(6.2);
  const [simBmi, setSimBmi] = useState(27.5);

  const calculatedSimRisk = Math.min(100, Math.max(0, (simGlucose - 70) * 0.35 + (simHba1c - 4) * 12 + (simBmi - 18) * 1.1));

  const featureWeights = [
    { name: 'Blood Glucose', weight: 38.4 },
    { name: 'HbA1c Level', weight: 32.1 },
    { name: 'Age', weight: 13.8 },
    { name: 'BMI', weight: 9.6 },
    { name: 'Hypertension', weight: 2.5 },
    { name: 'Smoking History', weight: 1.8 },
    { name: 'Heart Disease', weight: 1.2 },
    { name: 'Gender', weight: 0.6 }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>
        📊 Executive Clinical Dashboard
      </h2>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '18px' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>BEST PERFORMING ALGORITHM</span>
          <h3 style={{ margin: '4px 0 0 0', color: '#38bdf8', fontSize: '20px' }}>Gradient Boosting</h3>
          <span style={{ fontSize: '11px', color: '#34d399' }}>97.18% Best Accuracy</span>
        </div>
        <div className="glass-card" style={{ padding: '18px' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>PRIMARY PREDICTIVE BIOMARKER</span>
          <h3 style={{ margin: '4px 0 0 0', color: '#818cf8', fontSize: '20px' }}>Blood Glucose</h3>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>38.4% Feature Importance</span>
        </div>
        <div className="glass-card" style={{ padding: '18px' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>SECONDARY BIOMARKER</span>
          <h3 style={{ margin: '4px 0 0 0', color: '#c084fc', fontSize: '20px' }}>HbA1c Level</h3>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>32.1% Feature Importance</span>
        </div>
        <div className="glass-card" style={{ padding: '18px' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>CLINICAL DATASET SIZE</span>
          <h3 style={{ margin: '4px 0 0 0', color: '#f472b6', fontSize: '20px' }}>100,000 Records</h3>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Anonymized Profiles</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
            📈 Biomarker Feature Weight Distribution
          </h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureWeights} layout="vertical" margin={{ left: 30, right: 20, top: 10, bottom: 10 }}>
                <XAxis type="number" stroke="#94a3b8" unit="%" />
                <YAxis dataKey="name" type="category" stroke="#f8fafc" width={110} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="weight" radius={[0, 8, 8, 0]}>
                  {featureWeights.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#38bdf8' : index === 1 ? '#818cf8' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>
            🎯 Interactive Risk Calculator Simulator
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
            Adjust patient sliders to simulate relative risk shifts.
          </p>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>Blood Glucose</span>
              <span style={{ fontWeight: '700', color: '#38bdf8' }}>{simGlucose} mg/dL</span>
            </div>
            <input type="range" min="70" max="300" value={simGlucose} onChange={(e) => setSimGlucose(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>HbA1c Level</span>
              <span style={{ fontWeight: '700', color: '#818cf8' }}>{simHba1c}%</span>
            </div>
            <input type="range" min="4.0" max="12.0" step="0.1" value={simHba1c} onChange={(e) => setSimHba1c(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span>BMI Index</span>
              <span style={{ fontWeight: '700', color: '#c084fc' }}>{simBmi} kg/m²</span>
            </div>
            <input type="range" min="15.0" max="50.0" step="0.1" value={simBmi} onChange={(e) => setSimBmi(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '16px', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>SIMULATED RELATIVE RISK SCORE</span>
            <div style={{ fontSize: '32px', fontWeight: '800', color: calculatedSimRisk >= 50 ? '#ef4444' : calculatedSimRisk >= 25 ? '#f59e0b' : '#34d399' }}>
              {calculatedSimRisk.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
