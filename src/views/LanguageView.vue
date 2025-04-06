<template>
  <div class="chart-container">
    <div ref="pieChart" class="chart"></div>
  </div>
  <div>
    <SlangGame />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import SlangGame from '../components/SlangGameComponent.vue';

const pieChart = ref(null);
const total = 685274 + 367159 + 320758 + 295281 + 239033;

const getPercentage = (value) => ((value / total) * 100).toFixed(1);

const options = {
  title: {
    text: 'Top 5 most common languages other than English',
    left: 'center',
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: params => `
      ${params.name}<br/>
      Count: ${params.value.toLocaleString()}<br/>
      Percentage: ${getPercentage(params.value)}%
    `
  },
  color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'],
  series: [{
    type: 'pie',
    radius: '65%',
    center: ['50%', '55%'],
    data: [
      { value: 685274, name: 'Mandarin' },
      { value: 367159, name: 'Arabic' },
      { value: 320758, name: 'Vietnamese' },
      { value: 295281, name: 'Cantonese' },
      { value: 239033, name: 'Punjabi' }
    ],
    label: {
      formatter: '{b|{b}}\n{per|{d}%}',
      rich: {
        b: {
          fontSize: 14,
          lineHeight: 26
        },
        per: {
          color: '#666',
          fontSize: 12,
          lineHeight: 20
        }
      }
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};

onMounted(() => {
  const chart = echarts.init(pieChart.value);
  chart.setOption(options);

  window.addEventListener('resize', () => {
    chart.resize();
  });
});
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.chart {
  width: 600px;
  height: 500px;
  margin: auto;
}
</style>
