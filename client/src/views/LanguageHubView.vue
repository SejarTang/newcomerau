<template>
  <div>
    <h2>Pronunciation Correction Demo</h2>
    <SpeakingView />
    <OCR />
    <ReadList />
  </div>
</template>

<script>
import SpeakingView from '@/components/SpeakingView.vue';
import ReadList from '@/components/ReadList.vue';
import OCR from '@/components/UploadOCR.vue';

export default {
components: {
  SpeakingView,
  OCR,
  ReadList,
},
};


</script>
