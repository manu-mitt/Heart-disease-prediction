const form = document.getElementById('risk-form');
const scoreEl = document.getElementById('risk-score');
const bandEl = document.getElementById('risk-band');
const meterFill = document.getElementById('meter-fill');
const summaryEl = document.getElementById('risk-summary');
const factorsEl = document.getElementById('risk-factors');
let riskChart;

function initChart() {
  const ctx = document.getElementById('riskChart');
  if (!ctx) return;

  riskChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['BP', 'Chol', 'Glucose', 'Smoking'],
      datasets: [
        {
          label: 'Current profile',
          data: [70, 85, 60, 50],
          backgroundColor: '#2563eb',
          borderRadius: 8,
        },
        {
          label: 'Typical healthy range',
          data: [45, 50, 40, 20],
          backgroundColor: '#94a3b8',
          borderRadius: 8,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom' },
        tooltip: { enabled: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: { display: true, text: 'Risk score index' }
        },
        x: {
          title: { display: true, text: 'Risk factors' }
        }
      }
    }
  });
}

function updateChart(values) {
  if (!riskChart) return;
  const bp = Math.min(100, Math.round(values.bloodPressure / 2.2));
  const chol = Math.min(100, Math.round(values.cholesterol / 4));
  const glucose = values.diabetes === 'yes' ? 85 : 55;
  const smoking = values.smoking === 'yes' ? 90 : 35;

  riskChart.data.datasets[0].data = [bp, chol, glucose, smoking];
  riskChart.update();
}

function calculateRisk(values) {
  let score = 20;
  const factors = [];

  if (values.age >= 55) {
    score += 18;
    factors.push('Age is above 55');
  }
  if (values.bloodPressure >= 140) {
    score += 20;
    factors.push('High systolic blood pressure');
  } else if (values.bloodPressure >= 120) {
    score += 8;
    factors.push('Blood pressure is elevated');
  }
  if (values.cholesterol >= 240) {
    score += 22;
    factors.push('Cholesterol is high');
  } else if (values.cholesterol >= 200) {
    score += 10;
    factors.push('Cholesterol is moderately high');
  }
  if (values.diabetes === 'yes') {
    score += 15;
    factors.push('Diabetes increases cardiovascular risk');
  }
  if (values.smoking === 'yes') {
    score += 15;
    factors.push('Smoking is a major risk factor');
  }

  score = Math.min(score, 95);
  const rounded = Math.round(score);

  let band = 'Low Risk';
  let summary = 'Your profile appears relatively healthy. Continue routine monitoring.';

  if (rounded >= 70) {
    band = 'High Risk';
    summary = 'Your profile suggests a higher likelihood of heart disease risk. Follow up with a clinician.';
  } else if (rounded >= 45) {
    band = 'Moderate Risk';
    summary = 'Your profile suggests a moderate likelihood of cardiovascular risk. Lifestyle and medical review are recommended.';
  }

  if (factors.length === 0) {
    factors.push('No major risk factors were detected');
  }

  return { score: rounded, band, summary, factors };
}

function renderResult(result) {
  scoreEl.textContent = `${result.score}%`;
  bandEl.textContent = result.band;
  summaryEl.textContent = result.summary;
  meterFill.style.width = `${result.score}%`;
  factorsEl.innerHTML = '';
  result.factors.forEach((factor) => {
    const li = document.createElement('li');
    li.textContent = factor;
    factorsEl.appendChild(li);
  });
}

function getFormValues() {
  return {
    age: Number(document.getElementById('age').value),
    bloodPressure: Number(document.getElementById('bloodPressure').value),
    cholesterol: Number(document.getElementById('cholesterol').value),
    diabetes: document.getElementById('diabetes').value,
    smoking: document.getElementById('smoking').value,
  };
}

function updateDashboard() {
  const values = getFormValues();
  const result = calculateRisk(values);
  renderResult(result);
  updateChart(values);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateDashboard();
});

['age', 'bloodPressure', 'cholesterol', 'diabetes', 'smoking'].forEach((fieldId) => {
  const input = document.getElementById(fieldId);
  if (input) {
    input.addEventListener('input', updateDashboard);
    input.addEventListener('change', updateDashboard);
  }
});

initChart();
const initialValues = {
  age: 55,
  bloodPressure: 135,
  cholesterol: 210,
  diabetes: 'no',
  smoking: 'no',
};
renderResult(calculateRisk(initialValues));
updateChart(initialValues);

function generateReport(values, result) {
  return `Heart Disease Prediction Report\n\n` +
    `Age: ${values.age}\n` +
    `Systolic BP: ${values.bloodPressure} mmHg\n` +
    `Cholesterol: ${values.cholesterol} mg/dL\n` +
    `Diabetes: ${values.diabetes}\n` +
    `Smoking: ${values.smoking}\n\n` +
    `Risk score: ${result.score}%\n` +
    `Risk level: ${result.band}\n\n` +
    `Key factors:\n` +
    result.factors.map((factor) => `- ${factor}`).join('\n') +
    `\n\nDisclaimer: This report is for demonstration only and not medical advice.`;
}

const reportButton = document.getElementById('download-report');
reportButton.addEventListener('click', () => {
  const values = getFormValues();
  const result = calculateRisk(values);
  const report = generateReport(values, result);
  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'heart-risk-report.txt';
  anchor.click();
  URL.revokeObjectURL(url);
});
