<template>
  <div class="section" data-aos="fade-up">
    <h2>Welcome Newcomers to Melbourne</h2>
    <p>
      Moving to Melbourne has changed the lives of many people and helped create what is considered one of the greatest cities in the world. Immigrating to Melbourne may be one of the best decisions of your life.
    </p>
    <div class="image-container">
      <img src="../assets/welcome.jpg" alt="Newcomers to Victoria" class="image" />
    </div>
  </div>

  <div class="section" data-aos="fade-up">
    <h5>The following chart shows the distribution of newcomers from different countries arriving in Victoria.</h5>
    <div class="chart-container">
      <div ref="pieChart" class="chart"></div>
    </div>
  </div>

  <div class="section" data-aos="fade-up">
    <div class="image-container">
      <img src="../assets/support-services.jpg" alt="To place a imagine" class="image" />
    </div>
    <h2>2</h2>
    <ul>
      <li>1.</li>
      <li>2. </li>
      <li>3. </li>
      <li>4. </li>
    </ul>
  </div>

  <div class="section" data-aos="fade-up">
    <h2>3</h2>
    <ul>
      <li>1. </li>
      <li>2. </li>
      <li>3. </li>
      <li>4.</li>
    </ul>
  </div>

  <div class="section" data-aos="zoom-in-up">
    <h2>4</h2>
    <p>4</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import AOS from 'aos';

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const pieChart = ref(null);

const chartData = ref([
  { value: 50000, name: "India" },
  { value: 40000, name: "China" },
  { value: 30000, name: "Vietnam" },
  { value: 25000, name: "Philippines" },
  { value: 20000, name: "Sri Lanka" },
  { value: 15000, name: "Afghanistan" },
  { value: 10000, name: "Pakistan" },
  { value: 8000, name: "Iran" },
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
    name: 'Newcomer Distribution',
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
