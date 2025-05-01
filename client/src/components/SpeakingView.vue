<template>
  <!-- Main container for the speaking page -->
  <div class="speaking-page">
    <!-- Part 1: Phonics Intro Section (Text on left, Image on right) -->
    <div class="section-card intro-text-combo">
      <!-- Intro text box: contains title, subtitle, and explanatory text -->
      <div class="intro-text-box">
        <!-- Section title -->
        <h2 class="section-title">Your Fast Track to Learning English!</h2>
        <!-- Subtitle to motivate learners -->
        <p class="section-subtitle">
          Let's explore how Phonics can help you master English faster and more confidently!
        </p>
        <!-- Additional context for immigrant learners -->
        <p class="section-subtext">
          By mastering the fundamental sound–letter relationships, you can decode new vocabulary with ease.
          Phonics offers a reliable roadmap to pronunciation, helping learners break down complex words into simple,
          memorable parts. This solid foundation not only accelerates listening and speaking skills but also builds
          confidence when navigating everyday conversations and services in Melbourne.
        </p>
      </div>
      <!-- Intro image box: displays illustrative graphic -->
      <div class="intro-image-box">
        <!-- Responsive image with enlarged class for styling -->
        <img
          :src="phonicsIntro"
          alt="Phonics Introduction"
          class="intro-image enlarged"
        />
      </div>
    </div>

    <!-- Part 2: Phonics Video and Description Section -->
    <div class="section-card video-text-combo">
      <!-- Video container with fixed aspect ratio -->
      <div class="video-box-small custom-height">
        <iframe
          :src="youtubeEmbedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <!-- Text description next to video -->
      <div class="text-box enlarged-text">
        <!-- Subsection title -->
        <h3 class="description-title">What is Phonics?</h3>
        <!-- Explanation paragraphs -->
        <p class="description-paragraph">
          Phonics is a method that helps you connect the sounds of spoken English with letters and groups of letters.
          It makes reading and speaking easier by teaching you how to decode and pronounce words correctly.
          For newcomers learning English, phonics offers a clear and structured way to build speaking confidence
          and improve pronunciation quickly.
        </p>
        <p class="description-paragraph">
          In this video, you'll get more information about phonics!
        </p>
        <!-- Immigrant-specific benefits explanation -->
        <p class="description-paragraph">
          For you and newcomers, phonics goes beyond reading—it's a bridge to clearer communication.
          By internalizing sound patterns, learners can tackle unfamiliar words, reduce misunderstandings,
          and feel more at ease when speaking with friends, colleagues, or service providers.
          This practical skill helps break down language barriers and fosters smoother integration into
          everyday life.
        </p>
      </div>
    </div>

    <!-- Part 3: Phonics Cards Interactive Section -->
    <div class="section-card">
      <!-- Section header -->
      <h2 class="section-title">Practice Sounds with Those Fun Cards!</h2>
      <!-- Grid of interactive phonics cards -->
      <div class="phonics-grid">
        <!-- Loop through phonicsList to render each card -->
        <div
          v-for="(item, idx) in phonicsList"
          :key="idx"
          class="phonics-card"
          @click="playAudio(item.audio)"
        >
          <!-- Display the phonics symbol on the card -->
          <span class="phonics-symbol">{{ item.symbol }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import Vue's reactive references
import { ref } from 'vue';
// Import the intro image asset
import phonicsIntro from '@/assets/phonics/phonicsIntro.jpg';

// YouTube embed URL for the phonics explanation video
const youtubeEmbedUrl = 'https://www.youtube.com/embed/hGur6GGv35Q?start=94';

// Reactive list of phonics symbols and their corresponding audio URLs
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

/**
 * playAudio: Play the provided audio file when a phonics card is clicked
 * @param {string} audioPath - URL of the audio file
 */
function playAudio(audioPath) {
  const audio = new Audio(audioPath);
  audio.play();
}
</script>

<style scoped>
/* Container padding for the page */
.speaking-page {
  padding: 40px 20px 80px 20px;
}

/* Layout: text left and image right for intro section */
.intro-text-combo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
}

/* Text area sizing */
.intro-text-box {
  flex: 1 1 30%; /* 30% width to emphasize image */
  text-align: left;
}

/* Image container sizing */
.intro-image-box {
  flex: 1 1 70%; /* 70% width for large image */
  display: flex;
  justify-content: center;
}

/* Intro image styling */
.intro-image.enlarged {
  width: 100%;        /* fill container width */
  max-width: 900px;   /* cap to avoid overflow */
  border-radius: 12px;
}

/* Common section card styling */
.section-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 30px 20px;
}

/* Section titles */
.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

/* Section subtitles */
.section-subtitle {
  font-size: 20px;
  color: #555;
  margin-bottom: 20px;
}

/* Layout for video and text combo */
.video-text-combo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  text-align: left;
}

/* Video container styling */
.video-box-small {
  flex: 1 1 40%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}
.video-box-small.custom-height {
  aspect-ratio: 16 / 10;
}
.video-box-small iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Text description next to video */
.text-box.enlarged-text {
  flex: 1 1 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Subsection title styling */
.description-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Description paragraphs */
.description-paragraph {
  font-size: 20px;
  margin-bottom: 10px;
  line-height: 1.8;
}

/* Grid layout for phonics cards */
.phonics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  justify-content: center;
  margin-top: 20px;
}

/* Individual phonics card styling and hover effect */
.phonics-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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

/* Text style for phonics symbols */
.phonics-symbol {
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
  font-family: 'Segoe UI', 'Arial', sans-serif;
}
</style>
