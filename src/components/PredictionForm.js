'use client';

import React from 'react';

export default function PredictionForm({ formData, setFormData, onSubmit, loading, onPreset }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f8fafc' }}>
          📋 Patient Clinical Profile
        </h3>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button type="button" className="btn-preset" onClick={() => onPreset('healthy')}>🟢 Low</button>
          <button type="button" className="btn-preset" onClick={() => onPreset('borderline')}>🟡 Mid</button>
          <button type="button" className="btn-preset" onClick={() => onPreset('high_risk')}>🔴 High</button>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">👤 Biological Gender</label>
            <select
              className="form-select"
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="form-label">🎂 Patient Age (Years)</label>
            <input
              type="number"
              className="form-input"
              min="1"
              max="120"
              value={formData.age}
              onChange={(e) => handleChange('age', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">❤️ Hypertension Diagnosis</label>
            <select
              className="form-select"
              value={formData.hypertension}
              onChange={(e) => handleChange('hypertension', parseInt(e.target.value))}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
          <div>
            <label className="form-label">🫀 Heart Disease History</label>
            <select
              className="form-select"
              value={formData.heart_disease}
              onChange={(e) => handleChange('heart_disease', parseInt(e.target.value))}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">🚬 Smoking History</label>
            <select
              className="form-select"
              value={formData.smoking_history}
              onChange={(e) => handleChange('smoking_history', e.target.value)}
            >
              <option value="Never">Never</option>
              <option value="No Info">No Info</option>
              <option value="Former">Former</option>
              <option value="Current">Current</option>
              <option value="Ever">Ever</option>
              <option value="Not Current">Not Current</option>
            </select>
          </div>
          <div>
            <label className="form-label">⚖️ Body Mass Index (BMI)</label>
            <input
              type="number"
              step="0.1"
              className="form-input"
              min="10"
              max="80"
              value={formData.bmi}
              onChange={(e) => handleChange('bmi', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label className="form-label">🧪 HbA1c Level (%)</label>
            <input
              type="number"
              step="0.1"
              className="form-input"
              min="3"
              max="15"
              value={formData.hba1c_level}
              onChange={(e) => handleChange('hba1c_level', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="form-label">🩸 Blood Glucose (mg/dL)</label>
            <input
              type="number"
              className="form-input"
              min="50"
              max="500"
              value={formData.blood_glucose_level}
              onChange={(e) => handleChange('blood_glucose_level', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '🧠 Computing AI Prediction...' : '🧠 Compute AI Diabetes Risk Prediction'}
        </button>
      </form>
    </div>
  );
}
