<!-- ImmigrationChart.vue -->
<template>
  <div class="chart-box-wrapper">
    <label for="year-select">Select Year:</label>
    <select id="year-select" v-model="selectedYear" @change="updateChart">
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>

    <div ref="chartRef" class="chart-box"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const rawData = [
  {
    year: 2020,
    Vietnam: 740,
    Philippines: 720,
    USA: 660,
    Pakistan: 630,
    Afghanistan: 560,
    'Hong Kong': 540,
    Malaysia: 480,
    'Sri Lanka': 470,
    Iran: 410,
    'South Africa': 390,
  },
  {
    year: 2021,
    Colombia: 850,
    Samoa: 730,
    Ireland: 720,
    'Saudi Arabia': 720,
    Canada: 670,
    Myanmar: 640,
    France: 630,
    Kenya: 630,
    Brazil: 570,
    Germany: 540,
  },
  {
    year: 2022,
    Samoa: 930,
    Germany: 930,
    'Saudi Arabia': 920,
    Canada: 840,
    Argentina: 830,
    Myanmar: 810,
    Syria: 630,
    Russia: 590,
    Zimbabwe: 580,
    'Unit Arab Emir': 570,
  },
  {
    year: 2023,
    Myanmar: 930,
    Germany: 920,
    Canada: 890,
    Samoa: 860,
    Iraq: 820,
    Lebanon: 770,
    'Unit Arab Emir': 750,
    Argentina: 700,
    Zimbabwe: 700,
    Syria: 670,
  },
]

const chartRef = ref(null)
let chartInstance = null

const selectedYear = ref(2020)
const years = rawData.map((d) => d.year)

const getChartDataByYear = (year) => {
  const yearData = rawData.find((item) => item.year === year)
  if (!yearData) return { countries: [], values: [] }

  const { year: _/* eslint-disable-line no-unused-vars */, ...countries } = yearData
  const entries = Object.entries(countries)
  const sorted = entries.sort((a, b) => b[1] - a[1])
  const countriesList = sorted.map(([k]) => k)
  const valuesList = sorted.map(([_, v]) => v)// eslint-disable-line no-unused-vars

  return { countries: countriesList, values: valuesList }
}

const renderChart = () => {
  const { countries, values } = getChartDataByYear(selectedYear.value)

  const option = {
    title: {
      text: `Top Immigration Countries in ${selectedYear.value}`,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: countries,
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: values,
        type: 'bar',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  }

  chartInstance?.setOption(option)
}

const updateChart = () => {
  renderChart()
}

onMounted(() => {
  chartInstance = echarts.init(chartRef.value)
  renderChart()
})

watch(selectedYear, renderChart)
</script>

<style>
.chart-box-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-box {
  width: 100%;
  max-width: 900px;
  height: 500px;
  margin-top: 20px;
}
</style>
