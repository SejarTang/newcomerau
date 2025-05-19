<template>
  <div class="forecast-container">
    <!-- Charts (unchanged) -->
    <div class="chart-wrapper">
      <h2 class="chart-title">Historical Medical Expenditure Share (1984–2025)</h2>
      <canvas ref="histCanvas"></canvas>
    </div>
    <div class="chart-wrapper">
      <h2 class="chart-title">12-Month Medical Expenditure Share Forecast</h2>
      <canvas ref="forecastCanvas"></canvas>
    </div>

    <!-- Section 1: What This Chart Shows You -->
    <div class="section section--reverse">
      <div class="section__text">
        <h3>What This Chart Shows You</h3>
        <p>
          This graph tracks the share of your household’s final consumption spent on medical care and health (HFCE)
          from 1984 through today—and projects it twelve months into the future.
        </p>

        <p><strong>Method:</strong> We reconstructed monthly percentages by interpolating official ABS figures for
          “Medical care and health expenses” versus “Total goods and services expenditure,” then validated with
          real data through 2025.</p>

        <h4>Ongoing Upward Trend</h4>
        <p>The historical line shows a gradual climb in medical-share through the 2000s, accelerating sharply in recent years.</p>
        <p>The forecast (yhat) continues this upward trajectory, indicating that healthcare costs will take an increasing slice of your budget over the next year.</p>

        <h4>Growth-Rate Inflection Points</h4>
        <p>The forecast curve exhibits several points where its slope steepens markedly—these are likely to coincide with policy shifts, demographic changes, or significant fee increases.</p>
        <p>Newcomers should pay special attention around these inflection windows to adjust their budget or payment methods in time.</p>

        <h4>Uncertainty Band</h4>
        <p>The 95% confidence interval (yhat_lower–yhat_upper) is shaded around the forecast line, with its width reflecting model confidence.</p>
        <p>Narrow bands denote periods of higher certainty; wider bands flag greater risk and the need to set aside a larger safety buffer.</p>

        <h4>Critical Threshold Alerts</h4>
        <p>If the upper bound of the forecast crosses key thresholds (e.g. 8% or 10%), it signals that your household medical burden may reach or exceed historical highs.</p>
        <p>In such months, consider activating cost-containment measures or applying for government/community subsidies.</p>

        <h4>Long-Term Planning Reference</h4>
        <p>The first 3–6 months of the forecast often represent a “short-term surge” phase, with steeper increases; months 6–12 generally show a more gradual rise.</p>
        <p>By allocating funds and adjusting insurance or payment plans (e.g., installment options, health vouchers) in alignment with these phases, you can smooth out cash-flow pressures.</p>
      </div>
      <div class="section__image">
        <img src="@/assets/trends.png" alt="Rising trend illustration" />
      </div>
    </div>

    <!-- Section 2: Your Personalized Action Plan -->
    <div class="section">
      <div class="section__image">
        <img src="@/assets/action.png" alt="Action plan illustration" />
      </div>
      <div class="section__text">
        <h3>Your Personalized Action Plan</h3>

        <h4>Summary Actions</h4>
        <p><strong>See the Trend:</strong> Understand the long-term upward direction.</p>
        <p><strong>Know the Pace:</strong> Identify when growth accelerates.</p>
        <p><strong>Manage Risk:</strong> Watch the confidence band for uncertainty.</p>
        <p><strong>Seize Critical Points:</strong> Respond when thresholds are approached.</p>

        <h4>1. Budgeting & Alerts</h4>
        <p><strong>Pre-Allocate Extra Funds</strong><br>
          If the forecast line is climbing, you should set aside at least 2–3 percentage points more than your current
          medical‐share in your monthly budget.
        </p>

        <p><strong>Automate Your Alerts</strong><br>
          Keep an eye on when your actual spending approaches the upper forecast band (yhat_upper). You can configure
          your personal finance app or calendar to notify you—say at 8%—so you can tighten spending or seek subsidies
          before costs spiral.
        </p>

        <p><strong>Check Twice a Year</strong><br>
          Every six months, come back to this page for fresh projections (we run the model on our end). Compare the
          updated forecast against your real spending, then tweak your budget, insurance coverage, or payment plans
          accordingly.
        </p>

        <h4>2. Insurance & Payment Strategies</h4>
        <p><strong>Review Private Health Cover</strong><br>
          If your medical‐share is already above the historical median (~5%), consider boosting your policy limits or
          adding specialist/chronic‐care riders. If it’s below, avoid over-insuring for services you seldom need.
        </p>

        <p><strong>Time Your Coverage to Peaks</strong><br>
          During the forecasted high-cost months, make sure your plan covers chronic disease management, pediatric care,
          or elder services to smooth out potentially large bills.
        </p>

        <p><strong>Use Flexible Payment Tools</strong><br>
          Explore medical payment plans, 0%-interest credit-card installments, or government health vouchers in months
          when costs spike, so you don’t drain your cash reserves all at once.
        </p>

        <h4>3. Prevention & Community Resources</h4>
        <p><strong>Invest in Preventive Care</strong><br>
          In the steepest forecasted rise, prioritize annual check-ups, vaccinations, dental cleanings, and
          chronic-disease programs (e.g. diabetes management). Early intervention often brings down total costs.
        </p>

        <p><strong>Tap Local Support</strong><br>
          Watch for free or low-cost clinics, screening events, and nonprofit health services in Melbourne. Join
          newcomer groups to share tips on navigating Medicare Safety Net and PHN community grants.
        </p>

        <p><strong>Maximize Government Subsidies</strong><br>
          Enroll in Medicare Safety Net, Primary Health Network initiatives, and any state-level health rebates to
          offset your out-of-pocket clinic and prescription costs.
        </p>
      </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const histCanvas     = ref(null)
const forecastCanvas = ref(null)

function yearOnly(ds) { return ds.slice(0, 4) }

async function renderHistorical() {
  const raw = await fetch('/api/share').then(r => r.json())
  const labels = raw.map(x => yearOnly(x.ds))
  const values = raw.map(x => x.share)

  new Chart(histCanvas.value.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ data: values, borderColor: '#333', borderWidth: 2, fill: false, spanGaps: true }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Year' } },
        y: { title: { display: true, text: 'Share (%)' }, suggestedMin: 0 }
      },
      plugins: { legend: { display: false } }
    }
  })
}

async function renderForecast() {
  const data = await fetch('/api/forecast').then(r => r.json())

  const labels = data.map(x => x.ds.slice(0, 7))
  const yhat   = data.map(x => x.yhat)
  const lo     = data.map(x => x.yhat_lower)
  const hi     = data.map(x => x.yhat_upper)

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
          fill: false,
          spanGaps: true
        },
        {
          label: 'Lower Bound',
          data: lo,
          borderColor: '#FF7300',
          borderDash: [5,5],
          borderWidth: 1,
          fill: false,
          spanGaps: true
        },
        {
          label: 'Upper Bound',
          data: hi,
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
        x: {
          title: { display: true, text: 'Month' },
          ticks: { maxRotation: 0, autoSkip: false }  
        },
        y: {
          title: { display: true, text: 'Share (%)' },
          min: 8,
          max: 10,
          ticks: {
            stepSize: 0.5
          }
        }
      },
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y?.toFixed(2)}%`
          }
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
  width: 100%;
  padding: 24px 48px;
  box-sizing: border-box;
}

.chart-wrapper {
  margin-bottom: 40px;
}

.chart-title {
  margin-bottom: 16px;
  font-size: 1.4rem;
  text-align: center;
  color: #2c3e50;
}

.chart-wrapper canvas {
  width: 100% !important;
  height: 500px !important;
}

/* Section layout */
.section {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 64px;
}
.section--reverse {
  flex-direction: row-reverse;
}

.section__image img {
  max-width: 300px;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.section__text {
  flex: 1;
}

.section__text h3 {
  margin-bottom: 16px;
  font-size: 1.6rem;
  color: #2c3e50;
  font-weight: 600;
}
</style>
