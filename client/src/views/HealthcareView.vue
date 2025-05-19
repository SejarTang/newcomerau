<template>
  <!-- Main wrapper for the Healthcare page -->
  <div class="healthcare-page">
    <router-view></router-view>
  </div>
</template>

<script setup>
// Import component that guides users through Australia's healthcare steps
import HealthcareGuidance from '@/components/HealthcareGuidance.vue'

// Import Symptom Checker component
import SymptomChecker from '@/components/SymptomChecker.vue'

// Import data visualization of common diseases using ECharts
import DiseaseChart from '@/components/DiseaseChart.vue'

// Import map that displays locations of medical facilities
import MedicalMap from '@/components/MedicalMap.vue'

// Import chatbot component for user interaction and help
import ChatbotView from '@/components/ChatbotView.vue'

import Predict2 from '@/components/HealthShareForecast.vue'
</script>

<style scoped>
.healthcare-page {
  padding-top: 80px;
}
</style>
