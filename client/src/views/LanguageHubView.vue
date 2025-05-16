<template>
  <div>
    <!-- Page title for pronunciation correction feature -->
    <h2>Pronunciation Correction Demo</h2>

    <!-- Component where users can practice speaking and receive feedback -->
    <SpeakingView />

    <!-- Component where users can upload images and get OCR results -->
    <UploadOCR />

    <!-- Component that displays a list of reading sentences for practice -->
    <ReadList />
  </div>
</template>

<script>
// Import the speaking practice component (may include microphone input, feedback, etc.)
import SpeakingView from '@/components/SpeakingView.vue'
import UploadOCR from '@/components/UploadOCR.vue'
// Import the reading material list component for users to read aloud
import ReadList from '@/components/ReadList.vue'

// Register both components to be used in this page
export default {
  components: {
    SpeakingView,
    ReadList,
    UploadOCR,
  },
}
</script>
