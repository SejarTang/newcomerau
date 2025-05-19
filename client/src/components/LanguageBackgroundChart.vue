<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent
])

const chartOptions = ref({})
const yearSelected = ref('')
const yearList = ref([])
const isLoading = ref(true)
const allData = ref([])

// Predefined soft colors for bars
const barColors = [
  '#7FB3D5', '#85C1E9', '#76D7C4', '#7DCEA0', '#F8C471',
  '#F7DC6F', '#F1948A', '#BB8FCE', '#AAB7B8', '#A3E4D7'
]

// Fetch API data from backend
const fetchData = async () => {
  isLoading.value = true
  const response = await axios.get('https://newcomerau.me/api/languages')
  allData.value = response.data
  yearList.value = [...new Set(allData.value.map(d => d.year))]
  yearSelected.value = yearList.value[0]
  updateChart()
  isLoading.value = false
}

// Update chart based on selected year
const updateChart = () => {
  const yearData = allData.value.filter(d => d.year == yearSelected.value)
  yearData.sort((a, b) => b.number_of_non_english_speaker - a.number_of_non_english_speaker)

  chartOptions.value = {
  // title: {
  //   text: `Language Distribution in ${yearSelected.value}`
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  grid: {
    left: '8%',
    right: '5%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    name: 'Speakers',
    nameLocation: 'middle',
    nameGap: 30,
    axisLabel: {
      formatter: function(value) {
        return value.toLocaleString();
      }
    }
  },
  yAxis: {
    type: 'category',
    data: yearData.map(d => d.language)
  },
  series: [
    {
      type: 'bar',
      data: yearData.map((d, idx) => ({
        value: d.number_of_non_english_speaker,
        itemStyle: { color: barColors[idx % barColors.length] }
      })),
      barWidth: '60%',
      animationDelay: (idx) => idx * 100,           // First load animation
      animationDelayUpdate: (idx) => idx * 100      // Update animation
    }
  ],
  animationEasing: 'cubicOut',
  animationDuration: 1000,
  animationDurationUpdate: 1000
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="chart-section">
    <h2 class="chart-title">
      Language Distribution in
      <select v-model="yearSelected" @change="updateChart" class="year-select">
        <option v-for="year in yearList" :key="year" :value="year">{{ year }}</option>
      </select>
    </h2>

    <div v-if="isLoading" class="loading-text">Loading chart data...</div>

    <v-chart v-else class="chart" :option="chartOptions" autoresize />
  </div>
</template>

<style scoped>
.chart-section {
  width: 100%;
  max-width: 1400px;
  padding: 50px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: none;
}

.chart-title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.year-select {
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
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
