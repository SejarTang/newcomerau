<template>
  <div class="chart-section">
    <h2 class="chart-title">Language Backgrounds of Immigrants in Victoria (2021)</h2>
    <v-chart class="chart" :option="chartOptions" autoresize />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
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

const languageData = [
  { language: 'Mandarin', country: 'China', immigrants: 21393 },
  { language: 'Cantonese', country: 'China', immigrants: 5146 },
  { language: 'Spanish', country: 'Spain', immigrants: 3998 },
  { language: 'Hindi', country: 'India', immigrants: 3585 },
  { language: 'Vietnamese', country: 'Vietnam', immigrants: 3172 },
  { language: 'Indonesian', country: 'Indonesia', immigrants: 2715 },
  { language: 'Korean', country: 'Korea', immigrants: 2314 },
  { language: 'Thai', country: 'Thailand', immigrants: 1916 },
  { language: 'Arabic', country: 'Arab', immigrants: 1740 },
  { language: 'Filipino/Tagalog', country: 'Philippines', immigrants: 1603 },
]

const chartOptions = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: (params) => {
      const data = params[0]
      return `
        <b>${data.name}</b><br/>
        Country: ${languageData[data.dataIndex].country}<br/>
        Immigrants: ${data.value.toLocaleString()}
      `
    }
  },
  grid: {
    left: '6%',
    right: '5%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    name: 'Number of Immigrants',
    nameGap: 35
  },
  yAxis: {
    type: 'category',
    data: languageData.map(item => item.language),
    axisLabel: {
      fontSize: 13
    }
  },
  series: [
    {
      type: 'bar',
      data: languageData.map(item => item.immigrants),
      itemStyle: {
        color: '#4CAF50'
      },
      barWidth: '60%'
    }
  ]
})
</script>

<style scoped>
.chart-section {
  width: 100%;
  max-width: 1400px;
  padding: 60px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.chart {
  width: 100%;
  height: 600px;

.chart-title {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}
}
</style>
