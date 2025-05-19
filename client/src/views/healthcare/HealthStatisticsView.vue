<template>
  <div class="health-statistics-view">
    <DiseaseChart />
    <HealthShareForecast />
  </div>
</template>

<script setup>
import DiseaseChart from '@/components/DiseaseChart.vue'
import HealthShareForecast from '@/components/HealthShareForecast.vue'
</script>

<style scoped>
.health-statistics-view {
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
}
</style> 