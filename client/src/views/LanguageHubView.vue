<template>
  <div>
    <h2>Pronunciation Correction Demo</h2>
    <SpeakingView />
    <ReadList />
  </div>
</template>

<script>
import SpeakingView from '@/components/SpeakingView.vue';
import ReadList from '@/components/ReadList.vue';

export default {
components: {
  ReadList,
  SpeakingView,
},
};


</script>
