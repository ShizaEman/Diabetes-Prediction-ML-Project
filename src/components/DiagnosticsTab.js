'use client';

import React from 'react';

export default function DiagnosticsTab() {
  const models = [
    { name: "Gradient Boosting", accuracy: "97.18%", precision: "94.8%", recall: "72.4%", roc_auc: "0.982" },
    { name: "AdaBoost Classifier", accuracy: "97.16%", precision: "94.5%", recall: "72.1%", roc_auc: "0.980" },
    { name: "Random Forest", accuracy: "96.93%", precision: "93.8%", recall: "71.0%", roc_auc: "0.976" },
    { name: "Stacking Classifier", accuracy: "96.44%", precision: "92.1%", recall: "69.5%", roc_auc: "0.968" },
    { name: "Support Vector Machine", accuracy: "96.20%", precision: "91.5%", recall: "68.2%", roc_auc: "0.959" },
    { name: "Logistic Regression", accuracy: "95.96%", precision: "89.4%", recall: "64.1%", roc_auc: "0.952" },
    { name: "K-Nearest Neighbors", accuracy: "95.92%", precision: "88.2%", recall: "62.8%", roc_auc: "0.941" },
    { name: "Decision Tree", accuracy: "94.74%", precision: "85.1%", recall: "61.5%", roc_auc: "0.892" }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>
        📈 Machine Learning Model Performance Diagnostics
      </h2>

      <div className="glass-card">
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
          🏆 Benchmark Evaluation Matrix Across 8 Algorithms
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                <th style={{ padding: '12px 16px' }}>Algorithm</th>
                <th style={{ padding: '12px 16px' }}>Accuracy Score</th>
                <th style={{ padding: '12px 16px' }}>Precision</th>
                <th style={{ padding: '12px 16px' }}>Recall</th>
                <th style={{ padding: '12px 16px' }}>ROC-AUC Score</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: idx === 0 ? 'rgba(56, 189, 248, 0.08)' : 'transparent' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: idx === 0 ? '#38bdf8' : '#f8fafc' }}>
                    {idx === 0 && '🏆 '} {m.name}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: '#34d399' }}>{m.accuracy}</td>
                  <td style={{ padding: '14px 16px' }}>{m.precision}</td>
                  <td style={{ padding: '14px 16px' }}>{m.recall}</td>
                  <td style={{ padding: '14px 16px', color: '#818cf8', fontWeight: '600' }}>{m.roc_auc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
