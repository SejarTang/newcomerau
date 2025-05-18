<template>
  <div class="forecast-container">
    <!-- Historical Chart -->
    <div class="chart-wrapper">
      <canvas ref="histCanvas"></canvas>
    </div>
    <!-- Forecast Chart -->
    <div class="chart-wrapper">
      <canvas ref="forecastCanvas"></canvas>
    </div>

    <!-- Information Card (unchanged) -->
    <div class="info-card">
      <h3>What This Chart Shows You</h3>
      <p>
        This graph tracks the share of your household’s final consumption spent on medical care and health (HFCE) from 1984 through today— and projects it twelve months into the future.
      </p>
      <p>
        <strong>Method:</strong> We reconstructed monthly percentages by interpolating official ABS figures for “Medical care and health expenses” versus “Total goods and services expenditure,” then validated with real data through 2025.
      </p>

      <h4>Ongoing Upward Trend</h4>
      <p>
        The historical line shows a gradual climb in medical-share through the 2000s, accelerating sharply in recent years.
      </p>
      <p>
        The forecast (yhat) continues this upward trajectory, indicating that healthcare costs will take an increasing slice of your budget over the next year.
      </p>

      <h4>Growth-Rate Inflection Points</h4>
      <p>
        The forecast curve exhibits several points where its slope steepens markedly—these are likely to coincide with policy shifts, demographic changes, or significant fee increases.
      </p>
      <p>
        Newcomers should pay special attention around these inflection windows to adjust their budget or payment methods in time.
      </p>

      <h4>Uncertainty Band</h4>
      <p>
        The 95% confidence interval (yhat_lower–yhat_upper) is shaded around the forecast line, with its width reflecting model confidence.
      </p>
      <p>
        Narrow bands denote periods of higher certainty; wider bands flag greater risk and the need to set aside a larger safety buffer.
      </p>

      <h4>Critical Threshold Alerts</h4>
      <p>
        If the upper bound of the forecast crosses key thresholds (e.g., 8% or 10%), it signals that your household medical burden may reach or exceed historical highs.
      </p>
      <p>
        In such months, consider activating cost-containment measures or applying for government/community subsidies.
      </p>

      <h4>Long-Term Planning Reference</h4>
      <p>
        The first 3–6 months of the forecast often represent a “short-term surge” phase, with steeper increases; months 6–12 generally show a more gradual rise.
      </p>
      <p>
        By allocating funds and adjusting insurance or payment plans (e.g., installment options, health vouchers) in alignment with these phases, you can smooth out cash-flow pressures.
      </p>

      <h4>Summary Actions</h4>
      <ul>
        <li><strong>See the Trend:</strong> Understand the long-term upward direction.</li>
        <li><strong>Know the Pace:</strong> Identify when growth accelerates.</li>
        <li><strong>Manage Risk:</strong> Watch the confidence band for uncertainty.</li>
        <li><strong>Seize Critical Points:</strong> Respond when thresholds are approached.</li>
        <li>Use these insights to craft a healthcare budget that is both provisioned and flexible.</li>
      </ul>

      <h4>Your Personalized Action Plan</h4>
      <ol>
        <li><strong>Budgeting & Alerts</strong>
          <ul>
            <li><em>Pre-Allocate Extra Funds:</em> Set aside at least 2–3 percentage points above your current medical-share in your monthly budget.</li>
            <li><em>Automate Your Alerts:</em> Configure your finance app or calendar to notify you when actual spending approaches the upper forecast bound (e.g., 8%).</li>
            <li><em>Check Twice a Year:</em> Revisit forecasts every six months to compare against real spending and adjust plans accordingly.</li>
          </ul>
        </li>
        <li><strong>Insurance & Payment Strategies</strong>
          <ul>
            <li><em>Review Private Health Cover:</em> Boost policy limits or add chronic-care riders if above historical median (~5%); if below, avoid over-insuring.</li>
            <li><em>Time Your Coverage to Peaks:</em> Ensure coverage for chronic disease management, pediatric care, or elder services during high-cost months.</li>
            <li><em>Use Flexible Payment Tools:</em> Explore medical payment plans, 0%-interest installments, or government health vouchers.</li>
          </ul>
        </li>
        <li><strong>Prevention & Community Resources</strong>
          <ul>
            <li><em>Invest in Preventive Care:</em> Prioritize check-ups, vaccinations, and chronic-disease programs to lower total costs.</li>
            <li><em>Tap Local Support:</em> Seek free or low-cost clinics, screening events, and nonprofit services in Melbourne.</li>
            <li><em>Maximize Government Subsidies:</em> Enroll in Medicare Safety Net, PHN initiatives, and state rebates.</li>
          </ul>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const histCanvas     = ref(null)
const forecastCanvas = ref(null)

async function renderHistorical() {
  const res  = await fetch('/api/share')
  const data = await res.json()
  const labels = data.map(d => d.ds)
  const values = data.map(d => d.share)

  new Chart(histCanvas.value.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Historical Share',
        data: values,
        borderColor: '#333',
        borderWidth: 2,
        fill: false,
        spanGaps: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'Share (%)' }, suggestedMin: 0 }
      },
      plugins: { legend: { position: 'top' } }
    }
  })
}

async function renderForecast() {
  const res  = await fetch('/api/forecast')
  const data = await res.json()
  const labels = data.map(d => d.ds)
  const yhat   = data.map(d => d.yhat)
  const lower  = data.map(d => d.yhat_lower)
  const upper  = data.map(d => d.yhat_upper)

  new Chart(forecastCanvas.value.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Forecast',
          data: yhat,
          borderColor: '#FF7300',
          borderWidth: 2,
          spanGaps: true
        },
        {
          label: 'Lower Bound',
          data: lower,
          borderColor: '#FF7300',
          borderDash: [5,5],
          borderWidth: 1,
          spanGaps: true
        },
        {
          label: 'Upper Bound',
          data: upper,
          borderColor: '#FF7300',
          borderDash: [5,5],
          borderWidth: 1,
          fill: {
            target: ctx => ctx.datasetIndex - 1,
            above: 'rgba(255,115,0,0.15)'
          },
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'Share (%)' }, suggestedMin: 0 }
      },
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y?.toFixed(2)}%` }
        }
      }
    }
  })
}

onMounted(() => {
  renderHistorical()
  renderForecast()
})
</script>

<style scoped>
.forecast-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.chart-wrapper {
  width: 100%;
  height: 400px;
  margin-bottom: 32px;
}

.chart-wrapper canvas {
  width: 100% !important;
  height: 100% !important;
}

/* info-card styles remain unchanged */
</style>
