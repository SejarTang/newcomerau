<template>
  <div id="app">
    <AllHeader />
    <router-view />
    <AllFooter />
  </div>
</template>

<script setup>
import AllHeader from './components/AllHeader.vue'
import AllFooter from './components/AllFooter.vue'
</script>