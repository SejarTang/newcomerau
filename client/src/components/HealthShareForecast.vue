<template>
  <div class="forecast-container">
    <!-- Historical chart wrapper -->
    <div class="chart-wrapper">
      <h2 class="chart-title">Historical Medical Expenditure Share (1984–2025)</h2>
      <!-- Canvas element where the historical Chart.js instance will mount -->
      <canvas ref="histCanvas"></canvas>
    </div>

    <!-- Forecast chart wrapper -->
    <div class="chart-wrapper">
      <h2 class="chart-title">12-Month Medical Expenditure Share Forecast</h2>
      <!-- Canvas element where the forecast Chart.js instance will mount -->
      <canvas ref="forecastCanvas"></canvas>
    </div>

    <!-- Section 1: text on right, image on left -->
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

        <!-- Trend explanation -->
        <h4>Ongoing Upward Trend</h4>
        <p>The historical line shows a gradual climb in medical-share through the 2000s, accelerating sharply in recent years.</p>
        <p>The forecast (yhat) continues this upward trajectory, indicating that healthcare costs will take an increasing slice of your budget over the next year.</p>

        <!-- Inflection points -->
        <h4>Growth-Rate Inflection Points</h4>
        <p>The forecast curve exhibits several points where its slope steepens markedly—these are likely to coincide with policy shifts, demographic changes, or significant fee increases.</p>
        <p>Newcomers should pay special attention around these inflection windows to adjust their budget or payment methods in time.</p>

        <!-- Uncertainty band -->
        <h4>Uncertainty Band</h4>
        <p>The 95% confidence interval (yhat_lower–yhat_upper) is shaded around the forecast line, with its width reflecting model confidence.</p>
        <p>Narrow bands denote periods of higher certainty; wider bands flag greater risk and the need to set aside a larger safety buffer.</p>

        <!-- Threshold alerts -->
        <h4>Critical Threshold Alerts</h4>
        <p>If the upper bound of the forecast crosses key thresholds (e.g. 8% or 10%), it signals that your household medical burden may reach or exceed historical highs.</p>
        <p>In such months, consider activating cost-containment measures or applying for government/community subsidies.</p>

        <!-- Planning reference -->
        <h4>Long-Term Planning Reference</h4>
        <p>The first 3–6 months of the forecast often represent a “short-term surge” phase, with steeper increases; months 6–12 generally show a more gradual rise.</p>
        <p>By allocating funds and adjusting insurance or payment plans (e.g., installment options, health vouchers) in alignment with these phases, you can smooth out cash-flow pressures.</p>
      </div>

      <!-- Illustration for trends -->
      <div class="section__image">
        <img src="@/assets/trends.png" alt="Rising trend illustration" />
      </div>
    </div>

    <!-- Section 2: Your Personalized Action Plan -->
    <div class="section">
      <!-- Illustration for action plan -->
      <div class="section__image">
        <img src="@/assets/action.png" alt="Action plan illustration" />
      </div>
      <div class="section__text">
        <h3>Your Personalized Action Plan</h3>

        <!-- Summary actions -->
        <h4>Summary Actions</h4>
        <p><strong>See the Trend:</strong> Understand the long-term upward direction.</p>
        <p><strong>Know the Pace:</strong> Identify when growth accelerates.</p>
        <p><strong>Manage Risk:</strong> Watch the confidence band for uncertainty.</p>
        <p><strong>Seize Critical Points:</strong> Respond when thresholds are approached.</p>

        <!-- Budgeting & Alerts -->
        <h4>1. Budgeting & Alerts</h4>
        <p><strong>Pre-Allocate Extra Funds</strong><br>
          If the forecast line is climbing, you should set aside at least 2–3 percentage points more than your current
          medical-share in your monthly budget.
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

        <!-- Insurance & Payment Strategies -->
        <h4>2. Insurance & Payment Strategies</h4>
        <p><strong>Review Private Health Cover</strong><br>
          If your medical-share is already above the historical median (~5%), consider boosting your policy limits or
          adding specialist/chronic-care riders. If it’s below, avoid over-insuring for services you seldom need.
        </p>

        <p><strong>Time Your Coverage to Peaks</strong><br>
          During the forecasted high-cost months, make sure your plan covers chronic disease management, pediatric care,
          or elder services to smooth out potentially large bills.
        </p>

        <p><strong>Use Flexible Payment Tools</strong><br>
          Explore medical payment plans, 0%-interest credit-card installments, or government health vouchers in months
          when costs spike, so you don’t drain your cash reserves all at once.
        </p>

        <!-- Prevention & Community Resources -->
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
// Vue Composition API imports for reactive refs and life-cycle hook
import { ref, onMounted } from 'vue'
// Chart.js core and required chart types/components
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

// References to our two <canvas> elements
const histCanvas     = ref(null)
const forecastCanvas = ref(null)

// Helper: extract only the year portion "YYYY" from a full date string
function yearOnly(ds) {
  return ds.slice(0, 4)
}

// Render our historical data chart
async function renderHistorical() {
  // Fetch JSON from our backend `/api/share` endpoint
  const raw    = await fetch('/api/share').then(r => r.json())
  // Prepare labels (years) and values (shares)
  const labels = raw.map(x => yearOnly(x.ds))
  const vals   = raw.map(x => x.share)

  // Initialize Chart.js line chart
  new Chart(histCanvas.value.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: vals,
        borderColor: '#333',
        borderWidth: 2,
        fill: false,
        spanGaps: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,  // width:height ratio
      scales: {
        x: { title: { display: true, text: 'Year' } },
        y: {
          title: { display: true, text: 'Share (%)' },
          suggestedMin: 0
        }
      },
      plugins: { legend: { display: false } }
    }
  })
}

// Render our forecast data chart
async function renderForecast() {
  // Fetch JSON from `/api/forecast`
  const data   = await fetch('/api/forecast').then(r => r.json())
  // Prepare labels as "YYYY-MM", and yhat, lower, upper arrays
  const labels = data.map(x => x.ds.slice(0,7))
  const yhat   = data.map(x => x.yhat)
  const lo     = data.map(x => x.yhat_lower)
  const hi     = data.map(x => x.yhat_upper)

  // Initialize Chart.js line chart with confidence band
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
          spanGaps: true,
          fill: false
        },
        {
          label: 'Lower Bound',
          data: lo,
          borderColor: '#FF7300',
          borderDash: [5,5],
          borderWidth: 1,
          spanGaps: true,
          fill: false
        },
        {
          label: 'Upper Bound',
          data: hi,
          borderColor: '#FF7300',
          borderDash: [5,5],
          borderWidth: 1,
          spanGaps: true,
          // fill area between this dataset and the previous one
          fill: {
            target: ctx => ctx.datasetIndex - 1,
            above: 'rgba(255,115,0,0.15)'
          }
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      scales: {
        x: {
          title: { display: true, text: 'Month' },
          ticks: { maxRotation: 0, autoSkip: false }
        },
        y: {
          title: { display: true, text: 'Share (%)' },
          min: 8,
          max: 10,
          ticks: { stepSize: 0.5 }
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

// When component mounts, render both charts
onMounted(() => {
  renderHistorical()
  renderForecast()
})
</script>

<style scoped>
/* Container holds everything; full width with side padding */
.forecast-container {
  width: 100%;
  padding: 24px 48px;
  box-sizing: border-box;
}

/* Each chart gets its own centered wrapper with a fixed aspect ratio */
.chart-wrapper {
  max-width: 1000px;
  margin: 0 auto 40px;
  aspect-ratio: 2 / 1;
}
.chart-wrapper canvas {
  width: 100% !important;
  height: 100% !important;
}

/* Chart titles styling */
.chart-title {
  margin-bottom: 16px;
  font-size: 1.4rem;
  text-align: center;
  color: #2c3e50;
}

/* Sections (text + image) as flex rows; reversed for the first one */
.section {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 64px;
}
.section--reverse {
  flex-direction: row-reverse;
}

/* Image box inside each section */
.section__image img {
  max-width: 300px;
  width: 100%;
  border-radius: 8px;
}

/* Text block inside each section */
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
