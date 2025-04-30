<template>
  <div>
    <h2>Pronunciation Correction Demo</h2>
    <SpeakingView />
    <OCR />
    <ReadList />
  </div>
</template>

<script setup>
import SpeakingView from '@/components/SpeakingView.vue'
import ReadList from '@/components/ReadList.vue'
import OCR from '@/components/UploadOCR.vue'
</script>
