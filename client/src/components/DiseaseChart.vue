<template>
    <div class="chart-section">
      <!-- Description section -->
      <p class="description-text">
        Overweight is the most common health issue in Australia, affecting 69% of people.
        Depression and arthritis are also widespread. While serious diseases like diabetes
        and cancer are less common, they still pose major health risks.
      </p>

      <!-- Chart section -->
      <h2 class="chart-title">Prevalence of Health Conditions in Australia</h2>

      <div v-if="isLoading" class="loading-text">Loading chart data...</div>

      <v-chart v-else class="chart" :option="chartOptions" autoresize />
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import VChart from 'vue-echarts'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart } from 'echarts/charts'
  import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, LegendComponent } from 'echarts/components'

  use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, LegendComponent])

  const chartOptions = ref({})
  const isLoading = ref(true)
  const barColors = [
    '#76D7C4', '#F7DC6F', '#BB8FCE', '#F1948A',
    '#85C1E9', '#AAB7B8', '#A3E4D7', '#F8C471'
  ]

  // Fetch disease data from backend API
  const fetchData = async () => {
    try {
      const response = await axios.get('https://newcomerau.me/api/disease')
      const data = response.data

      // Sort diseases by percentage in descending order
      data.sort((a, b) => b.percent - a.percent)

      // Configure chart options
      chartOptions.value = {
        title: {
          text: 'Prevalence of Health Conditions in Australia',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          left: '10%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: '% of Population',
          max: 100
        },
        yAxis: {
          type: 'category',
          data: data.map(d => d.disease)
        },
        series: [
          {
            type: 'bar',
            data: data.map((d, idx) => ({
              value: parseFloat(d.percent.toFixed(1)),
              itemStyle: { color: barColors[idx % barColors.length] }
            })),
            barWidth: '60%',
            animationDelay: idx => idx * 150,
            animationDelayUpdate: idx => idx * 150
          }
        ],
        animationEasing: 'cubicOut',
        animationDuration: 1000,
        animationDurationUpdate: 1000
      }
    } catch (error) {
      console.error('Failed to load disease data:', error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchData)
  </script>

  <style scoped>
  .chart-section {
    width: 100%;
    max-width: 1400px;
    padding: 50px;
    margin: 0 auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }

  .description-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #444;
    margin-bottom: 30px;
    text-align: center;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .chart-title {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 30px;
    text-align: center;
  }

  .chart {
    width: 100%;
    height: 600px;
  }

  .loading-text {
    text-align: center;
    font-size: 1.3rem;
    padding: 50px 0;
    color: #888;
  }
  </style>
