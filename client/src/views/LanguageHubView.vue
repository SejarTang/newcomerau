<template>
  <div>
    <h2>Pronunciation Correction Demo</h2>
    <PronunciationChecker />
    <UploadOCR />
    <ReadList />
  </div>
</template>

<script>
import UploadOCR from '../components/UploadOCR.vue';
import PronunciationChecker from '../components/PronunciationCheckerComponent.vue';
import ReadList from '@/components/ReadList.vue';

export default {
components: {
  PronunciationChecker,
  UploadOCR,
  ReadList,
},
};


</script>
