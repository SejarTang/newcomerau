<template>
  <div class="holiday-detail">
    <h1>Boxing Day</h1>

    <!-- Image section: origin and celebration side-by-side -->
    <div class="row">
      <div class="column">
        <img
          class="image"
          :src="originImg"
          alt="Origin of Boxing Day"
          @click="openPreview(originImg)"
        />
      </div>
      <div class="column">
        <img
          class="image"
          :src="celebrationImg"
          alt="Celebrations in Australia"
          @click="openPreview(celebrationImg)"
        />
      </div>
    </div>

    <!-- Text content section: origin and local celebration details -->
    <div class="row">
      <div class="column">
        <h2>Origin</h2>
        <p>
          Boxing Day, observed on December 26th, originated in 19th-century Britain.
          Traditionally, it was the day when the wealthy would give “boxes” of gifts, food,
          or money to their servants and the poor—hence the name. As a legacy of the British Empire, the tradition was brought to Australia,
          where it has since evolved into a major public holiday focused on post-Christmas relaxation, shopping, and sport.
          In Victoria, Boxing Day is widely embraced as a day of generosity, leisure, and festivity.
        </p>
      </div>
      <div class="column">
        <h2>Celebrations in Victoria</h2>
        <ol>
          <li>
            <strong>Boxing Day Sales:</strong>
          Major retailers and online stores across Victoria launch huge sales on this day.
          Shoppers line up early to grab deals on electronics, fashion, and home goods—making it Australia’s biggest retail event of the year.
          </li>
          <li>
            <strong>Watching the Boxing Day Test Match:</strong>
           The iconic Boxing Day Test, held at the Melbourne Cricket Ground (MCG), is a major sporting tradition.
           Fans gather in person or tune in from home to enjoy world-class cricket in a festive atmosphere.
          </li>
          <li>
            <strong>Family Outings and Outdoor Relaxation:</strong>
          Many families continue the holiday spirit with beach trips, barbecues, and picnics—using the day to unwind,
          enjoy the summer weather, and spend time together.
          </li>
        </ol>
      </div>
    </div>

    <!-- Fullscreen image preview modal -->
    <div v-if="previewImage" class="preview-overlay" @click="previewImage = null">
      <img class="preview-image" :src="previewImage" alt="Preview" />
    </div>
  </div>

  <!-- Back button to navigate to Holiday Culture overview -->
  <div class="back-button-wrapper">
    <router-link to="/integration/history" class="back-button">
      <span class="back-button-text">← Back to Holiday Culture</span>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const originImg = new URL('@/assets/holidaysInfo/l1.jpg', import.meta.url).href
const celebrationImg = new URL('@/assets/holidaysInfo/l2.jpg', import.meta.url).href

const previewImage = ref(null)
const openPreview = (src) => {
  previewImage.value = src
}
</script>

<style scoped>
.holiday-detail {
  max-width: 2000px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 100px;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  font-size: 1.2rem;
  line-height: 1.8;
}

h1 {
  text-align: center;
  font-size: 4rem;
  margin-bottom: 2.5rem;
  font-weight: 700;
}

h2 {
  font-size: 3rem;
  margin-bottom: 3rem;
  color: #1f2937;
  font-weight: 600;
}

p {
  font-size: 2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 2rem;
}

.column {
  flex: 1;
  max-width: 60%;
}

.image {
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 12px;
  cursor: zoom-in;
  transition: transform 0.2s ease;
}

.image:hover {
  transform: scale(1.02);
}

.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
}

.preview-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

ol {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  line-height: 1.8;
}

.back-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  padding-bottom: 4rem;
  background-color: transparent;
}

.back-button {
  width: 530px;
  height: 530px;
  border-radius: 50%;
  background-color: #3a91e7;
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2c6ecf;
}

.back-button-text {
  animation: breathe 2s ease-in-out infinite;
}

@keyframes breathe {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

