<template>
  <div class="section" data-aos="fade-up">
    <h2>Language is the Key to Belonging</h2>
    <p>
      Language is more than a tool for communication — it's the foundation of cultural identity and community connection.
      For new migrants arriving in Victoria, language may be the first gateway to a new life.
    </p>
    <div class="image-container">
      <img src="../assets/key.png" alt="Language and Belonging" class="image" />
    </div>
  </div>

  <div class="section" data-aos="fade-up">
    <h5>The following chart shows the distribution of common non-English native languages in Victoria.</h5>
    <div class="chart-container">
      <div ref="pieChart" class="chart"></div>
    </div>
  </div>

  <div class="section" data-aos="fade-up">
    <div class="image-container">
      <img src="../assets/wall.jpeg" alt="Language Barrier" class="image" />
    </div>
    <h2>Challenges from Limited Language Proficiency</h2>
    <ul>
      <li>1.</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>

  <div class="section" data-aos="fade-up">
    <h2>Language Assistance in Victoria State</h2>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>

  <div class="section" data-aos="zoom-in-up">
    <h2>Australian Slang Matching Game</h2>
    <p>Learn authentic Aussie slang the fun way!</p>
    <SlangGameComponent></SlangGameComponent>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import AOS from 'aos';
import SlangGameComponent from '@/components/SlangGameComponent.vue';

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const pieChart = ref(null);

const chartData = ref([
  { value: 200000, name: "Mandarin" },
  { value: 120000, name: "Vietnamese" },
  { value: 95000, name: "Arabic" },
  { value: 80000, name: "Italian" },
  { value: 75000, name: "Greek" },
  { value: 68000, name: "Punjabi" },
  { value: 60000, name: "Hindi" },
  { value: 58000, name: "Tagalog" },
].sort((a, b) => b.value - a.value));

const total = computed(() => chartData.value.reduce((sum, item) => sum + item.value, 0));

const getPercentage = (val) => {
  const currentTotal = total.value;
  if (currentTotal === 0) return '0.0';
  return ((val / currentTotal) * 100).toFixed(1);
};

const options = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: params => `
      ${params.name}<br/>
      Population: ${params.value.toLocaleString()}<br/>
      Percentage: ${getPercentage(params.value)}%
    `
  },
  legend: {
    orient: 'vertical',
    left: 10,
    top: 'middle',
    data: chartData.value.map(item => item.name)
  },
  series: [{
    name: 'Native Language Distribution',
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['60%', '50%'],
    data: chartData.value,
    label: {
      position: 'outer',
      formatter: '{b}',
      fontSize: 12
    },
    labelLine: {
      show: true
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.3)'
      }
    }
  }]
}));

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true
  });

  if (pieChart.value) {
    const chart = echarts.init(pieChart.value);
    chart.setOption(options.value);

    const resizeChart = () => {
      chart.resize();
    };
    window.addEventListener('resize', resizeChart);

    onUnmounted(() => {
      window.removeEventListener('resize', resizeChart);
      chart.dispose();
    });
  } else {
    console.error("Chart container ref is not available.");
  }
});

import { onUnmounted } from 'vue';
</script>

<style scoped>
.section {
  max-width: 1000px;
  margin: 60px auto;
  padding: 50px 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  color: #333;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.section h2 {
  font-size: 2rem;
  margin-bottom: 25px;
  color: #2c3e50;
  font-weight: 600;
}

.section p, .section ul {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
}

.section ul {
  display: inline-block;
  text-align: left;
  margin-top: 20px;
  list-style: none;
  padding-left: 0;
}

.section li {
  margin-bottom: 10px;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 15px;
}

.chart {
  width: 100%;
  max-width: 750px;
  height: 450px;
}

.section h2 + p {
  margin-bottom: 30px;
}
</style>
