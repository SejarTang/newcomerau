<template>
  <div class="forecast-chart">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const canvasRef = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/forecast-health-share?horizon_months=12')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    const labels   = data.map(item => item.ds)
    const actual   = data.map(item => item.share)
    const forecast = data.map(item => item.yhat)
    const lower    = data.map(item => item.yhat_lower)
    const upper    = data.map(item => item.yhat_upper)

    new Chart(canvasRef.value.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Actual Share',
            data: actual,
            borderColor: '#333333',
            borderWidth: 2,
            spanGaps: true
          },
          {
            label: 'Forecast',
            data: forecast,
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
          x: {
            title: { display: true, text: 'Date' },
            ticks: { maxRotation: 45, minRotation: 0 }
          },
          y: {
            title: { display: true, text: 'Share (%)' },
            suggestedMin: 0
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
  } catch (err) {
    console.error('Failed to load forecast data:', err)
  }
})
</script>

<style scoped>
.forecast-chart {
  width: 100%;
  height: 400px;
}
</style>
