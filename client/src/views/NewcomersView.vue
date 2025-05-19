<template>
  <div class="container">
    <NewcomersHero />
    <ImmigrationTrends />
    <ChallengesSection />
  </div>
</template>

<script setup>
import NewcomersHero from '@/components/newcomers/NewcomersHero.vue'
import ImmigrationTrends from '@/components/newcomers/ImmigrationTrends.vue'
import ChallengesSection from '@/components/newcomers/ChallengesSection.vue'
</script>

<style scoped>
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
}
</style>
