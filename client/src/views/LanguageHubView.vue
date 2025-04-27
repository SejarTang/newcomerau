<template>
    <div>
      <h2>Pronunciation Correction Demo</h2>
      <PronunciationChecker />
      <UploadOCR />
    </div>
  </template>
  
<script>
import UploadOCR from '../components/UploadOCR.vue';
import PronunciationChecker from '../components/PronunciationCheckerComponent.vue';
  
export default {
  components: {
    PronunciationChecker,
    UploadOCR,
  },
};
</script>
  