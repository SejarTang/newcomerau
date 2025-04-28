<template>
  <div class="speaking-page">
    <!-- Part 1: Phonics Intro -->
    <div class="section-card">
      <h2 class="section-title">Your Fast Track to Learning English!</h2>
      <p class="section-subtitle">Let's explore how Phonics can help you master English faster and more confidently!</p>
      <img :src="phonicsIntro" alt="Phonics Introduction" class="intro-image" />
    </div>

    <!-- Part 2: Phonics Video -->
    <div class="section-card">
      <h2 class="section-title">Learn Phonics Sounds Through Video!</h2>
      <div class="video-wrapper">
        <iframe
          :src="youtubeEmbedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <!-- Part 3: Phonics Cards -->
    <div class="section-card">
      <h2 class="section-title">Practice Sounds with These Fun Cards!</h2>
      <div class="phonics-grid">
        <div
          v-for="(item, idx) in phonicsList"
          :key="idx"
          class="phonics-card"
          @click="playAudio(item.audio)"
        >
          <img :src="item.image" alt="Phonics Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import phonicsIntro from '@/assets/phonics/phonicsIntro.jpg';

// YouTube Video address
const youtubeEmbedUrl = 'https://www.youtube.com/embed/hGur6GGv35Q?start=94';

// Generate 48 cards. For now, use one picture and one audio clip for each card.
const phonicsList = ref(
  Array.from({ length: 48 }, () => ({
    image: new URL('@/assets/phonics/A.png', import.meta.url).href,
    audio: new URL('@/assets/phonics/i_.mp3', import.meta.url).href,
  }))
);

// Click to play the audio.
function playAudio(audioPath) {
  const audio = new Audio(audioPath);
  audio.play();
}
</script>

<style scoped>
.speaking-page {
  padding: 40px 20px 80px 20px;
}


.section-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  padding: 30px 20px;
  text-align: center;
}


.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}


.section-subtitle {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}


.intro-image {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  display: block;
}


.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


.phonics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  justify-content: center;
  margin-top: 20px;
}


.phonics-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.phonics-card:hover {
  transform: scale(1.05);
}


.phonics-card img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}
</style>
