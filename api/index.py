import os
import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

app = FastAPI(
    title="Diabetes Prediction API",
    description="Machine Learning Inference Engine for Diabetes Prediction",
    version="1.0.0"
)

# Enable CORS for Next.js frontend & local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model Loader
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "diabetes_model.pkl")

model = None
try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Warning: Could not load model at startup: {e}")

class PatientRequest(BaseModel):
    age: float = Field(..., ge=1.0, le=120.0, description="Patient age in years")
    gender: str = Field("Female", description="Female, Male, or Other")
    hypertension: int = Field(0, ge=0, le=1, description="0 for No, 1 for Yes")
    heart_disease: int = Field(0, ge=0, le=1, description="0 for No, 1 for Yes")
    smoking_history: str = Field("Never", description="Never, No Info, Former, Current, Ever, Not Current")
    bmi: float = Field(..., ge=10.0, le=80.0, description="Body Mass Index")
    hba1c_level: float = Field(..., ge=3.0, le=15.0, description="HbA1c level percentage")
    blood_glucose_level: float = Field(..., ge=50, le=500, description="Blood glucose level mg/dL")

class RiskFactor(BaseModel):
    title: str
    description: str
    severity: str  # "high", "mid", "low"

class PredictionResponse(BaseModel):
    prediction: int
    prediction_label: str
    probability: float
    confidence: str
    risk_factors: List[RiskFactor]

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "model_type": "GradientBoostingClassifier"
    }

@app.get("/api/diagnostics")
def get_diagnostics():
    models_benchmark = [
        {"name": "Gradient Boosting", "accuracy": "97.18%", "score": 0.9718, "roc_auc": 0.982},
        {"name": "AdaBoost Classifier", "accuracy": "97.16%", "score": 0.9716, "roc_auc": 0.980},
        {"name": "Random Forest", "accuracy": "96.93%", "score": 0.9693, "roc_auc": 0.976},
        {"name": "Stacking Classifier", "accuracy": "96.44%", "score": 0.9644, "roc_auc": 0.968},
        {"name": "Support Vector Machine", "accuracy": "96.20%", "score": 0.9620, "roc_auc": 0.959},
        {"name": "Logistic Regression", "accuracy": "95.96%", "score": 0.9596, "roc_auc": 0.952},
        {"name": "K-Nearest Neighbors", "accuracy": "95.92%", "score": 0.9592, "roc_auc": 0.941},
        {"name": "Decision Tree", "accuracy": "94.74%", "score": 0.9474, "roc_auc": 0.892}
    ]
    
    feature_importance = [
        {"feature": "Blood Glucose", "importance": 38.4},
        {"feature": "HbA1c Level", "importance": 32.1},
        {"feature": "Age", "importance": 13.8},
        {"feature": "BMI", "importance": 9.6},
        {"feature": "Hypertension", "importance": 2.5},
        {"feature": "Smoking History", "importance": 1.8},
        {"feature": "Heart Disease", "importance": 1.2},
        {"feature": "Gender", "importance": 0.6}
    ]
    
    return {
        "benchmark": models_benchmark,
        "feature_importance": feature_importance
    }

@app.post("/api/predict", response_model=PredictionResponse)
def predict(req: PatientRequest):
    global model
    if model is None:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
        else:
            raise HTTPException(status_code=500, detail="Model file diabetes_model.pkl not found")

    patient_dict = {
        "age": req.age,
        "hypertension": req.hypertension,
        "heart_disease": req.heart_disease,
        "bmi": req.bmi,
        "HbA1c_level": req.hba1c_level,
        "blood_glucose_level": req.blood_glucose_level,
        "gender_Male": 1 if req.gender.lower() == "male" else 0,
        "gender_Other": 1 if req.gender.lower() == "other" else 0,
        "smoking_history_current": 1 if req.smoking_history.lower() == "current" else 0,
        "smoking_history_ever": 1 if req.smoking_history.lower() == "ever" else 0,
        "smoking_history_former": 1 if req.smoking_history.lower() == "former" else 0,
        "smoking_history_never": 1 if req.smoking_history.lower() == "never" else 0,
        "smoking_history_not current": 1 if req.smoking_history.lower() in ["not current", "not_current"] else 0
    }

    input_df = pd.DataFrame([patient_dict])

    if hasattr(model, "feature_names_in_"):
        expected_features = list(model.feature_names_in_)
        for feat in expected_features:
            if feat not in input_df.columns:
                input_df[feat] = 0
        input_df = input_df[expected_features]

    try:
        prediction_val = int(model.predict(input_df)[0])
        probability_val = 0.0
        if hasattr(model, "predict_proba"):
            probability_val = float(model.predict_proba(input_df)[0][1] * 100)

        # Risk Factors
        risk_factors = []
        if req.hba1c_level >= 6.5:
            risk_factors.append(RiskFactor(
                title="Elevated HbA1c Level",
                description=f"{req.hba1c_level}% (Diabetes threshold ≥ 6.5%)",
                severity="high"
            ))
        elif req.hba1c_level >= 5.7:
            risk_factors.append(RiskFactor(
                title="Prediabetic HbA1c Range",
                description=f"{req.hba1c_level}% (Prediabetes range 5.7 - 6.4%)",
                severity="mid"
            ))

        if req.blood_glucose_level >= 126:
            risk_factors.append(RiskFactor(
                title="High Blood Glucose Level",
                description=f"{req.blood_glucose_level} mg/dL (Diabetes threshold ≥ 126 mg/dL)",
                severity="high"
            ))
        elif req.blood_glucose_level >= 100:
            risk_factors.append(RiskFactor(
                title="Elevated Fasting Glucose",
                description=f"{req.blood_glucose_level} mg/dL (Elevated range)",
                severity="mid"
            ))

        if req.bmi >= 30:
            risk_factors.append(RiskFactor(
                title="High Body Mass Index (Obesity)",
                description=f"{req.bmi} kg/m² (Obesity Class ≥ 30)",
                severity="high"
            ))
        elif req.bmi >= 25:
            risk_factors.append(RiskFactor(
                title="Overweight BMI Range",
                description=f"{req.bmi} kg/m² (Overweight range 25-29.9)",
                severity="mid"
            ))

        if req.hypertension == 1:
            risk_factors.append(RiskFactor(
                title="Hypertension History",
                description="Diagnosed high blood pressure increases metabolic strain",
                severity="mid"
            ))

        if req.heart_disease == 1:
            risk_factors.append(RiskFactor(
                title="Heart Disease History",
                description="Co-occurring cardiovascular disease risk factor",
                severity="high"
            ))

        confidence_val = "High Confidence" if (probability_val >= 70 or probability_val <= 25) else "Moderate Confidence"

        return PredictionResponse(
            prediction=prediction_val,
            prediction_label="Diabetes Positive" if prediction_val == 1 else "Diabetes Negative",
            probability=round(probability_val, 2),
            confidence=confidence_val,
            risk_factors=risk_factors
        )

    except Exception as ex:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(ex)}")

# For local direct running
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
