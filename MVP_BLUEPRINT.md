# Heart Disease Prediction Web App — MVP Blueprint

## 1) Objective
- Prediction task: classify a patient into low vs. moderate vs. high risk for heart disease, and show a probability score.
- Target users: clinicians, patients, and researchers.
- Primary goal: provide an understandable, interactive demo that shows how patient inputs can drive a risk estimate.

## 2) Data and inputs
Typical inputs:
- Age
- Sex
- Blood pressure
- Cholesterol
- Fasting glucose / diabetes status
- ECG findings
- Resting heart rate
- Smoking status
- Physical activity / lifestyle
- Family history

Data requirements:
- MVP can use synthetic or anonymized public data.
- For a realistic demo, use a curated dataset with clear feature definitions and labels.
- Ensure privacy and compliance if real patient data is used.

## 3) Modeling approach
Suggested models:
- Logistic regression for interpretability
- Random forest or gradient boosting as stronger baseline models
- Optional explainability with SHAP or feature importance

Evaluation metrics:
- Accuracy
- Precision / recall
- F1-score
- ROC-AUC
- Calibration curve (important for risk score output)

Ethical considerations:
- Avoid using the tool as a sole clinical decision-maker.
- Check for bias across age, sex, and ethnicity.
- Provide transparent explanations and confidence ranges.

## 4) Web page features
UI components:
- Input form with at least 3 fields (age, blood pressure, cholesterol)
- Risk score card with probability and severity label
- Basic explanation panel showing top contributing factors
- Simple chart (bar chart or gauge) for the score

Processing:
- Client-side MVP: simple rule-based scoring or pre-trained model served as a JSON/JS bundle
- Server-side production: model served via API (Flask/FastAPI) for better scalability and security

Security considerations:
- Do not collect unnecessary personal data
- Validate inputs and sanitize all model requests
- Use HTTPS in deployment
- If handling real patient data, apply access controls and audit logging

## 5) MVP scope
Minimum interactive prototype:
- 3+ input fields: age, systolic BP, cholesterol
- Output: risk score and risk band (low / medium / high)
- Explanation: e.g. “Higher age and cholesterol increase your risk”

## 6) Tech stack
Recommended stack:
- Frontend: React or plain HTML/CSS/JavaScript for a lightweight MVP
- State management: React hooks or simple local state
- Charts: Chart.js or Recharts
- Backend: FastAPI or Flask if using a real model
- Model format: scikit-learn pipeline saved as .pkl or ONNX

## 7) Accessibility and usability
Accessibility targets:
- WCAG 2.1 AA color contrast
- Keyboard-friendly forms and buttons
- Visible labels and error messages
- Screen-reader friendly charts and alerts

Responsive design notes:
- Mobile-first layout
- Clear hierarchy and concise explanations
- Large tap targets and readable typography

## 8) Deployment plan
Local run:
1. Create a virtual environment
2. Install dependencies
3. Start the frontend and backend
4. Open the app in a browser

Optional deployment:
- Frontend: Vercel / Netlify
- Backend: Render / Railway / Azure

## 9) Basic code scaffold
```text
heart-risk-app/
  frontend/
    src/
      App.jsx
      components/
        RiskForm.jsx
        RiskCard.jsx
        ExplanationPanel.jsx
        RiskChart.jsx
      styles/
        app.css
      main.jsx
  backend/
    app.py
    model/
      heart_risk_model.pkl
    requirements.txt
  data/
    synthetic_heart_data.csv
  README.md
```

## 10) Key files
- frontend/src/App.jsx: main UI shell
- frontend/src/components/RiskForm.jsx: user inputs
- frontend/src/components/RiskCard.jsx: risk score display
- frontend/src/components/ExplanationPanel.jsx: explanation text
- backend/app.py: API endpoint for prediction

## Optional enhancements
- Add ECG, smoking, family history, and exercise inputs
- Add SHAP-based feature explanations
- Support multilingual UI
- Add patient-friendly educational content and disclaimers
- Add model confidence band and recommendations
