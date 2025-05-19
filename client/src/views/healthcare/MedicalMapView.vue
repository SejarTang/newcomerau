<template>
  <div class="medical-map-view">
    <MedicalMap />
  </div>


      <!-- Explore More Button -->
<div class="explore-more-wrapper">
  <button class="explore-more-button" @click="goToHolidayCulture">Explore More</button>
</div>

</template>

<script setup>
import MedicalMap from '@/components/MedicalMap.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHolidayCulture() {
  router.push('/healthcare/health-statistics')
}
</script>

<style scoped>
.medical-map-view {
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
}

.explore-more-wrapper {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.explore-more-button {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #3a91e7;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.explore-more-button:hover {
  background-color: #2c6ecf;
  transform: scale(1.05);
}
</style>
