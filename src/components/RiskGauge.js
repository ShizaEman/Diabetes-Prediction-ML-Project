'use client';

import React from 'react';

export default function RiskGauge({ probability = 0 }) {
  const prob = Math.max(0, Math.min(100, probability));
  
  // Calculate SVG arc parameters
  const radius = 80;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // Half circle
  const strokeDashoffset = circumference - (prob / 100) * circumference;

  let gaugeColor = "#10b981"; // Safe Green
  if (prob >= 50) {
    gaugeColor = "#ef4444"; // High Risk Red
  } else if (prob >= 25) {
    gaugeColor = "#f59e0b"; // Warning Orange
  }

  return (
    <div style={{ position: 'relative', width: '220px', margin: '0 auto', textAlign: 'center' }}>
      <svg width="220" height="130" viewBox="0 0 200 120">
        {/* Background Track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="rgba(15, 23, 42, 0.8)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Animated Progress Arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={gaugeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0' }}>
        <div style={{ fontSize: '36px', fontWeight: '800', color: '#ffffff' }}>
          {prob.toFixed(1)}%
        </div>
        <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '-4px' }}>
          Calculated Risk Score
        </div>
      </div>
    </div>
  );
}
