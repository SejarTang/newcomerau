<template>
  <div class="healthcare-page">
    <HealthcareGuidance />
    <DiseaseChart />
    <MedicalMap />
    <ChatbotView />
  </div>
</template>

<script setup>

import HealthcareGuidance from '@/components/HealthcareGuidance.vue'
import MedicalMap from '@/components/MedicalMap.vue'
import ChatbotView from '@/components/ChatbotView.vue'
import DiseaseChart from '@/components/DiseaseChart.vue'
</script>

<style scoped>
</style>