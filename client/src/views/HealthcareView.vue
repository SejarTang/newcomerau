<template>
  <!-- Main wrapper for the Healthcare page -->
  <div class="healthcare-page">
    <!-- Step-by-step healthcare system guidance (interactive Q&A) -->
    <HealthcareGuidance />

    <!-- Bar chart showing health condition prevalence -->
    <DiseaseChart />

    <!-- Map showing clinics, public and private hospitals -->
    <MedicalMap />

    <!-- Chatbot interface to help users find medical resources or ask health questions -->
    <ChatbotView />
  </div>
</template>

<script setup>
// Import component that guides users through Australia's healthcare steps
import HealthcareGuidance from '@/components/HealthcareGuidance.vue'

// Import data visualization of common diseases using ECharts
import DiseaseChart from '@/components/DiseaseChart.vue'

// Import map that displays locations of medical facilities
import MedicalMap from '@/components/MedicalMap.vue'

// Import chatbot component for user interaction and help
import ChatbotView from '@/components/ChatbotView.vue'
</script>
