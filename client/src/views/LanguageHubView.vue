<template>
  <div>
    <h2>Pronunciation Correction Demo</h2>
    <SpeakingView />
    <ReadList />
    <OCR />
  </div>
</template>

<script>
import SpeakingView from '@/components/SpeakingView.vue';
import ReadList from '@/components/ReadList.vue';
import OCR from '@/components/UploadOCR.vue';

export default {
components: {
  ReadList,
  SpeakingView,
  OCR
},
};


</script>
