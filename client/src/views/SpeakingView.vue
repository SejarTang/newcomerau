<template>
  <div class="speaking-page">
    <!-- Part 1: Phonics Intro -->
    <div class="section-card">
      <h2 class="section-title">Your Fast Track to Learning English!</h2>
      <p class="section-subtitle">Let's explore how Phonics can help you master English faster and more confidently!</p>
      <img :src="phonicsIntro" alt="Phonics Introduction" class="intro-image" />
    </div>

    <!-- Part 2: Phonics Video and Description -->
    <div class="section-card video-text-combo">
      <div class="video-box-small custom-height">
        <iframe
          :src="youtubeEmbedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="text-box">
        <h3 class="description-title">What is Phonics?</h3>
        <p class="description-paragraph">
          Phonics is a method that helps you connect the sounds of spoken English with letters and groups of letters. It makes reading and speaking easier by teaching you how to decode and pronounce words correctly.
          For newcomers learning English, phonics offers a clear and structured way to build speaking confidence and improve pronunciation quickly.
        </p>
        <p class="description-paragraph">
          In this video, you'll get more information about phonics!
        </p>
      </div>
    </div>

    <!-- Part 3: Phonics Cards -->
    <div class="section-card">
      <h2 class="section-title">Practice Sounds with Those Fun Cards!</h2>
      <div class="phonics-grid">
        <div
          v-for="(item, idx) in phonicsList"
          :key="idx"
          class="phonics-card"
          @click="playAudio(item.audio)"
        >
          <span class="phonics-symbol">{{ item.symbol }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import phonicsIntro from '@/assets/phonics/phonicsIntro.jpg';

const youtubeEmbedUrl = 'https://www.youtube.com/embed/hGur6GGv35Q?start=94';

const phonicsList = ref([
{ symbol: 'i:', audio: new URL('@/assets/phonics/audio_1.mp3', import.meta.url).href },
  { symbol: 'ɪ', audio: new URL('@/assets/phonics/audio_2.mp3', import.meta.url).href },
  { symbol: 'e', audio: new URL('@/assets/phonics/audio_3.mp3', import.meta.url).href },
  { symbol: 'æ', audio: new URL('@/assets/phonics/audio_4.mp3', import.meta.url).href },
  { symbol: 'ɜː', audio: new URL('@/assets/phonics/audio_5.mp3', import.meta.url).href },
  { symbol: 'ə', audio: new URL('@/assets/phonics/audio_6.mp3', import.meta.url).href },
  { symbol: 'ʌ', audio: new URL('@/assets/phonics/audio_7.mp3', import.meta.url).href },
  { symbol: 'u:', audio: new URL('@/assets/phonics/audio_8.mp3', import.meta.url).href },
  { symbol: 'ʊ', audio: new URL('@/assets/phonics/audio_9.mp3', import.meta.url).href },
  { symbol: 'ɔː', audio: new URL('@/assets/phonics/audio_10.mp3', import.meta.url).href },
  { symbol: 'ɒ', audio: new URL('@/assets/phonics/audio_11.mp3', import.meta.url).href },
  { symbol: 'ɑ:', audio: new URL('@/assets/phonics/audio_12.mp3', import.meta.url).href },
  { symbol: 'eɪ', audio: new URL('@/assets/phonics/audio_13.mp3', import.meta.url).href },
  { symbol: 'aɪ', audio: new URL('@/assets/phonics/audio_14.mp3', import.meta.url).href },
  { symbol: 'ɔɪ', audio: new URL('@/assets/phonics/audio_15.mp3', import.meta.url).href },
  { symbol: 'aʊ', audio: new URL('@/assets/phonics/audio_16.mp3', import.meta.url).href },
  { symbol: 'əʊ', audio: new URL('@/assets/phonics/audio_17.mp3', import.meta.url).href },
  { symbol: 'ɪə', audio: new URL('@/assets/phonics/audio_18.mp3', import.meta.url).href },
  { symbol: 'eə', audio: new URL('@/assets/phonics/audio_19.mp3', import.meta.url).href },
  { symbol: 'ʊə', audio: new URL('@/assets/phonics/audio_20.mp3', import.meta.url).href },
  { symbol: 'p', audio: new URL('@/assets/phonics/audio_21.mp3', import.meta.url).href },
  { symbol: 't', audio: new URL('@/assets/phonics/audio_22.mp3', import.meta.url).href },
  { symbol: 'k', audio: new URL('@/assets/phonics/audio_23.mp3', import.meta.url).href },
  { symbol: 'f', audio: new URL('@/assets/phonics/audio_24.mp3', import.meta.url).href },
  { symbol: 's', audio: new URL('@/assets/phonics/audio_25.mp3', import.meta.url).href },
  { symbol: 'ʃ', audio: new URL('@/assets/phonics/audio_26.mp3', import.meta.url).href },
  { symbol: 'θ', audio: new URL('@/assets/phonics/audio_27.mp3', import.meta.url).href },
  { symbol: 'h', audio: new URL('@/assets/phonics/audio_28.mp3', import.meta.url).href },
  { symbol: 'tʃ', audio: new URL('@/assets/phonics/audio_29.mp3', import.meta.url).href },
  { symbol: 'tr', audio: new URL('@/assets/phonics/audio_30.mp3', import.meta.url).href },
  { symbol: 'ts', audio: new URL('@/assets/phonics/audio_31.mp3', import.meta.url).href },
  { symbol: 'b', audio: new URL('@/assets/phonics/audio_32.mp3', import.meta.url).href },
  { symbol: 'd', audio: new URL('@/assets/phonics/audio_33.mp3', import.meta.url).href },
  { symbol: 'g', audio: new URL('@/assets/phonics/audio_34.mp3', import.meta.url).href },
  { symbol: 'v', audio: new URL('@/assets/phonics/audio_35.mp3', import.meta.url).href },
  { symbol: 'z', audio: new URL('@/assets/phonics/audio_36.mp3', import.meta.url).href },
  { symbol: 'ʒ', audio: new URL('@/assets/phonics/audio_37.mp3', import.meta.url).href },
  { symbol: 'ð', audio: new URL('@/assets/phonics/audio_38.mp3', import.meta.url).href },
  { symbol: 'r', audio: new URL('@/assets/phonics/audio_39.mp3', import.meta.url).href },
  { symbol: 'dʒ', audio: new URL('@/assets/phonics/audio_40.mp3', import.meta.url).href },
  { symbol: 'dr', audio: new URL('@/assets/phonics/audio_41.mp3', import.meta.url).href },
  { symbol: 'dz', audio: new URL('@/assets/phonics/audio_42.mp3', import.meta.url).href },
  { symbol: 'm', audio: new URL('@/assets/phonics/audio_43.mp3', import.meta.url).href },
  { symbol: 'n', audio: new URL('@/assets/phonics/audio_44.mp3', import.meta.url).href },
  { symbol: 'ŋ', audio: new URL('@/assets/phonics/audio_45.mp3', import.meta.url).href },
  { symbol: 'ǀ', audio: new URL('@/assets/phonics/audio_46.mp3', import.meta.url).href },
  { symbol: 'j', audio: new URL('@/assets/phonics/audio_47.mp3', import.meta.url).href },
  { symbol: 'w', audio: new URL('@/assets/phonics/audio_48.mp3', import.meta.url).href }
]);

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

.video-text-combo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  text-align: left;
}

.video-box-small {
  flex: 1 1 40%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.video-box-small.custom-height {
  aspect-ratio: 16 / 10;
  height: auto;
}

.video-box-small iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.text-box {
  flex: 1 1 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.description-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.description-paragraph {
  font-size: 15px;
  margin-bottom: 10px;
  line-height: 1.5;
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

.phonics-symbol {
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
  font-family: 'Segoe UI', 'Arial', sans-serif;
}
</style>
