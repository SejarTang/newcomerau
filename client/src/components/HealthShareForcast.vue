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
  // 1. 拉取后端预测数据
  const res = await fetch('/api/forecast-health-share?horizon_months=12')
  const data = await res.json()

  // 2. 准备 labels 和 各系列
  const labels   = data.map(r => r.ds)
  const actual   = data.map(r => r.share)
  const forecast = data.map(r => r.yhat)
  const lower    = data.map(r => r.yhat_lower)
  const upper    = data.map(r => r.yhat_upper)

  // 3. 创建图表
  new Chart(canvasRef.value.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Actual Share',
          data: actual,
          borderColor: '#333',
          borderWidth: 2,
          spanGaps: true,
        },
        {
          label: 'Forecast (yhat)',
          data: forecast,
          borderColor: '#FF7300',
          borderWidth: 2,
          spanGaps: true,
        },
        {
          label: 'Lower Bound',
          data: lower,
          borderColor: '#FF7300',
          borderDash: [5,5],
          borderWidth: 1,
          spanGaps: true,
        },
        {
          label: 'Upper Bound',
          data: upper,
          borderColor: '#FF7300',
          borderDash: [5,5],
          borderWidth: 1,
          fill: {
            target: (ctx) => ctx.datasetIndex - 1,
            above: 'rgba(255,115,0,0.15)'
          },
          spanGaps: true,
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y?.toFixed(2)}%`
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Date' },
          ticks: { maxRotation: 45, minRotation: 0 }
        },
        y: {
          title: { display: true, text: 'Share (%)' },
          suggestedMin: 0
        }
      }
    }
  })
})
</script>

<style scoped>
.forecast-chart {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>
