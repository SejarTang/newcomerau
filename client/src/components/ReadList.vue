<template>
  <div class="reading-page">
    <!-- Intro Section -->
    <section class="intro-section">
      <div class="intro-text">
        <h1>Ready for More?</h1>
        <p>
          Language is the bridge to a new life.<br />
          After exploring the basics of communication, why not dive deeper?<br />
          <strong>Reading</strong> is one of the best ways to improve your English, understand
          Australian culture, and feel more connected!
        </p>
      </div>
      <div class="intro-image">
        <img :src="readingImage" alt="Reading Image" />
      </div>
    </section>

    <!-- Book Recommendations -->
    <section v-for="(level, index) in bookLevels" :key="index" class="level-section">
      <div :class="['level-header', level.colorClass]">
        <h2>{{ level.title }}</h2>
      </div>
      <div class="books-grid">
        <div v-for="(book, idx) in level.books" :key="idx" class="book-block">
          <img :src="book.cover" :alt="book.title" class="book-cover" />
          <div class="book-info">
            <h3 class="book-title">{{ book.title.toUpperCase() }}</h3>
            <p class="book-author"><strong>Author:</strong> {{ book.author }}</p>
            <p class="book-year"><strong>Published:</strong> {{ book.year }}</p>
            <p class="book-intro">{{ book.introduction }}</p>
            <p class="recommend-title">Why we recommend:</p>
            <p class="recommend-text">{{ book.recommendation }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import local images
import readingImage from '@/assets/read.png'

// Beginner level
import possumMagic from '@/assets/possumMagic.jpg'
import diaryOfAWombat from '@/assets/diaryOfAWombat.jpg'
import areWeThereYet from '@/assets/areWeThereYet.jpg'

// Intermediate level
import theRosieProject from '@/assets/theRosieProject.jpg'
import breath from '@/assets/breath.jpg'
import bigLittleLies from '@/assets/bigLittleLies.jpg'

// Advanced level
import theSecretRiver from '@/assets/theSecretRiver.jpg'
import trueHistoryKellyGang from '@/assets/trueHistoryKellyGang.jpg'
import darkEmu from '@/assets/darkEmu.jpg'

const bookLevels = ref([
  {
    title: 'For Beginner English Learners',
    colorClass: 'beginner',
    books: [
      {
        title: 'Possum Magic',
        author: 'Mem Fox',
        year: 1983,
        cover: possumMagic,
        introduction:
          "A beloved children's book introducing iconic Australian animals through simple storytelling.",
        recommendation:
          'Perfect for new immigrants with basic English — builds vocabulary while exploring Australian identity.',
      },
      {
        title: 'Diary of a Wombat',
        author: 'Jackie French',
        year: 2002,
        cover: diaryOfAWombat,
        introduction:
          "A humorous diary of a wombat's daily life with charming illustrations and simple sentences.",
        recommendation:
          "Easy language makes it ideal for beginners and showcases Australia's nature affection.",
      },
      {
        title: 'Are We There Yet?',
        author: 'Alison Lester',
        year: 2004,
        cover: areWeThereYet,
        introduction:
          "A family's journey across Australia, visiting famous landmarks with vivid, simple descriptions.",
        recommendation:
          "Great for learning place names and understanding Australia's diverse landscapes.",
      },
    ],
  },
  {
    title: 'For Intermediate English Learners',
    colorClass: 'intermediate',
    books: [
      {
        title: 'The Rosie Project',
        author: 'Graeme Simsion',
        year: 2013,
        cover: theRosieProject,
        introduction: 'A romantic comedy about a socially awkward professor searching for love.',
        recommendation:
          'Light-hearted story introduces Australian humour and modern culture in accessible English.',
      },
      {
        title: 'Breath',
        author: 'Tim Winton',
        year: 2008,
        cover: breath,
        introduction: "A coming-of-age story set along Australia's wild coastal landscapes.",
        recommendation:
          "Rich storytelling to develop reading skills and connect with Australia's beach culture.",
      },
      {
        title: 'Big Little Lies',
        author: 'Liane Moriarty',
        year: 2014,
        cover: bigLittleLies,
        introduction:
          'A drama set in suburban Sydney, filled with secrets, friendship, and humour.',
        recommendation:
          'Teaches conversational English through engaging characters and realistic scenarios.',
      },
    ],
  },
  {
    title: 'For Advanced English Learners',
    colorClass: 'advanced',
    books: [
      {
        title: 'The Secret River',
        author: 'Kate Grenville',
        year: 2005,
        cover: theSecretRiver,
        introduction:
          'A powerful historical novel about early British settlers and Indigenous Australians.',
        recommendation:
          "Deeply enriches understanding of Australia's colonial history and social tensions.",
      },
      {
        title: 'True History of the Kelly Gang',
        author: 'Peter Carey',
        year: 2000,
        cover: trueHistoryKellyGang,
        introduction: "A fictionalized biography of Ned Kelly, Australia's legendary outlaw hero.",
        recommendation:
          'Advanced narrative style builds high-level reading skills and explores folklore.',
      },
      {
        title: 'Dark Emu',
        author: 'Bruce Pascoe',
        year: 2014,
        cover: darkEmu,
        introduction:
          'Challenges myths about Aboriginal Australians and reveals their sophisticated agriculture.',
        recommendation:
          "Essential reading for critical thinkers interested in Australia's true Indigenous history.",
      },
    ],
  },
])
</script>

<style scoped>
/* Whole page container */
.reading-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* Intro horizontal layout */
.intro-section {
  display: flex;
  width: 80vw;
  height: 50vh;
}

/* Left side text */
.intro-text {
  flex: 0 0 35%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Intro title */
.intro-text h1 {
  font-size: 3rem;
  color: #1a2b49;
  margin-bottom: 2rem;
}

/* Intro paragraph */
.intro-text p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
}

/* Right side image */
.intro-image {
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Image styles */
.intro-image img {
  width: 100%;
  height: auto;
  max-width: 550px;
  border-radius: 10px;
}

/* Book level section title */
.level-header {
  padding: 0.5rem 1rem;
  text-align: center;
  border-radius: 8px;
  margin: 3.5rem 0 2rem;
  font-size: 2.2rem;
  font-weight: 1000;
}

/* Beginner level color */
.beginner {
  background: #e0f7fa;
  color: #00796b;
}

/* Intermediate level color */
.intermediate {
  background: #fff3e0;
  color: #ef6c00;
}

/* Advanced level color */
.advanced {
  background: #f3e5f5;
  color: #6a1b9a;
}

/* Books display area */
.books-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Single book block */
.book-block {
  width: 300px;
  margin-bottom: 1rem;
}

/* Book cover */
.book-cover {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
}

/* Book information */
.book-info {
  text-align: left;
}

/* Book title */
.book-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

/* Author and published year */
.book-author,
.book-year {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #555;
}

/* Introduction */
.book-intro {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: #666;
}

/* Recommendation title */
.recommend-title {
  font-weight: bold;
  margin-top: 1rem;
  color: #1a2b49;
}

/* Recommendation text */
.recommend-text {
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
