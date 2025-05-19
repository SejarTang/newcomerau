<template>
  <div class="guidance-view">
    <HealthcareGuidance />
    <ChatbotView />
  </div>
</template>

<script setup>
import HealthcareGuidance from '@/components/HealthcareGuidance.vue'
import ChatbotView from '@/components/ChatbotView.vue'
</script>

<style scoped>
.guidance-view {
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
}
</style> 