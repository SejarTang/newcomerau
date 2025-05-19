<template>
  <section class="section hero" data-aos="fade-down">
    <div class="hero-content">
      <h2>Welcome Newcomers to Melbourne</h2>
      <p class="lead">
        Melbourne is consistently ranked as one of the world's most liveable cities, often topping
        lists for its quality of life, infrastructure, and cultural scene. Moving to Melbourne has
        changed the lives of many people and helped create what is considered one of the greatest
        cities in the world. Immigrating to Melbourne may be one of the best decisions of your
        life.
      </p>
    </div>
    <div class="hero-image-container">
      <img src="@/assets/flinder.jpg" alt="Newcomers to Victoria" class="hero-image" />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({ duration: 600, easing: 'ease-in-out', once: true })
})
</script>

<style scoped>
.section {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 40px;
  margin-bottom: 40px;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 50px;
  background-color: #f9f9f9;
}

.hero-content {
  flex: 1;
  text-align: left;
}

.hero-content h2 {
  font-size: 2.8rem;
  margin-bottom: 15px;
  text-align: left;
  color: #2c3e50;
}

.hero-content .lead {
  font-size: 1.2rem;
  text-align: left;
  line-height: 1.6;
  color: #555;
}

.hero-image-container {
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.hero-image {
  display: block;
  max-width: 100%;
  height: auto;
}

@media (max-width: 960px) {
  .hero {
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    text-align: center;
    margin-bottom: 30px;
  }

  .hero-content h2 {
    text-align: center;
  }

  .hero-content .lead {
    text-align: center;
  }
}
</style> 