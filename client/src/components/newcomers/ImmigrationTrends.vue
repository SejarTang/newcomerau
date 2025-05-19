<template>
  <section class="section" data-aos="fade-up">
    <h2>Immigration Trends in Victoria</h2>
    <p class="lead">
      Now, let's take a closer look at how immigration has shaped the demographic landscape of
      Victoria over the past two decades. The following chart illustrates the distribution of
      newcomers to Victoria from the top 10 countries by immigration numbers between 2020 and 2023.
      Select a year to view the specific trends and patterns.
    </p>
    <div class="chart-container">
      <ImmigrationChart />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ImmigrationChart from '@/components/ImmigrationChart.vue'

onMounted(() => {
  AOS.init({ duration: 600, easing: 'ease-in-out', once: true })
})
</script>

<style scoped>
.section {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 40px;
  margin-bottom: 40px;
}

.section h2 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.section .lead {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
  text-align: center;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}
</style> 