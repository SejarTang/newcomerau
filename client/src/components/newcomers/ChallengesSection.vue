<template>
  <section class="section challenges" data-aos="fade-up">
    <h2>Challenges Faced by New Immigrants</h2>
    <p class="lead">
      While Melbourne offers numerous opportunities, newcomers may encounter a range of challenges
      as they adapt to their new environment. Below are some of the most common challenges faced
      by immigrants:
    </p>
    <div class="card-grid">
      <div
        class="card"
        v-for="(challenge, index) in challenges"
        :key="index"
        @mouseenter="flipCard(index)"
        @mouseleave="resetCard(index)"
        :class="{ flipped: flippedIndex === index }"
      >
        <div class="card-inner">
          <div class="card-front">
            <img :src="challenge.frontImage" :alt="challenge.title" class="card-image" />
            <h3 class="card-title">{{ challenge.title }}</h3>
          </div>
          <div class="card-back">
            <div v-if="flippedIndex === index">
              <p class="card-description">{{ challenge.description }}</p>
              <button class="quiz-button" @click="openQuizCard(index)">Quick Quiz</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showQuizCardModal" class="quiz-card-overlay">
      <div class="quiz-card">
        <button class="close-button" @click="closeQuizCard">X</button>
        <h3 v-if="currentQuiz">{{ currentQuiz.title }}</h3>
        <div v-if="currentQuestion && !quizFinished" class="quiz-question">
          <p>{{ currentQuestion.question }}</p>
          <div class="quiz-options">
            <button
              v-for="(option, i) in currentQuestion.options"
              :key="i"
              @click="answerQuestion(option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div v-if="quizFinished" class="quiz-results">
          <p>{{ quizResultText }}</p>
          <button @click="closeQuizCard">Close</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

import languageBarrier from '@/assets/languageBarrier.jpg'
import culturalAdjustment from '@/assets/culturalAdjustment.jpg'
import healthcare from '@/assets/healthcare.jpg'
import education from '@/assets/education.jpg'
import transportation from '@/assets/transportation.jpg'
import social from '@/assets/social.jpg'

const challenges = [
  {
    title: 'Language Barriers',
    description: 'Many immigrants face difficulties in communicating effectively...',
    frontImage: languageBarrier,
    backImage: languageBarrier,
    quiz: {
      questions: [
        {
          question: 'Do you often find it hard to understand local conversations?',
          options: ['Yes', 'No'],
        },
        {
          question: 'Have you ever avoided social situations due to language concerns?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
  {
    title: 'Cultural Adjustment',
    description: 'Adapting to a new culture can lead to feelings of isolation...',
    frontImage: culturalAdjustment,
    backImage: culturalAdjustment,
    quiz: {
      questions: [
        {
          question: 'Do you feel overwhelmed by cultural differences?',
          options: ['Yes', 'No'],
        },
        {
          question: 'Is it hard to connect with people due to unfamiliar customs?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
  {
    title: 'Healthcare Access',
    description: 'Immigrants may struggle to understand the healthcare system...',
    frontImage: healthcare,
    backImage: healthcare,
    quiz: {
      questions: [
        { question: 'Do you know how to access medical services?', options: ['Yes', 'No'] },
        {
          question: 'Have you had trouble using health insurance or understanding benefits?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
  {
    title: 'Education System',
    description: 'The education system may differ significantly...',
    frontImage: education,
    backImage: education,
    quiz: {
      questions: [
        {
          question: 'Are you or your children struggling to adapt to the education system?',
          options: ['Yes', 'No'],
        },
        {
          question: 'Do you feel lost when dealing with school-related matters?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
  {
    title: 'Transportation',
    description: 'New immigrants might find it difficult to navigate public transport...',
    frontImage: transportation,
    backImage: transportation,
    quiz: {
      questions: [
        { question: 'Do you find public transport hard to navigate?', options: ['Yes', 'No'] },
        { question: 'Do you often get lost when commuting?', options: ['Yes', 'No'] },
      ],
    },
  },
  {
    title: 'Social Integration',
    description: 'Building connections and a sense of belonging in a new society...',
    frontImage: social,
    backImage: social,
    quiz: {
      questions: [
        { question: 'Do you feel isolated in your community?', options: ['Yes', 'No'] },
        { question: 'Is it difficult to make friends or feel included?', options: ['Yes', 'No'] },
      ],
    },
  },
]

const flippedIndex = ref(null)
const showQuizCardModal = ref(false)
const currentQuizIndex = ref(null)
const currentQuestionIndex = ref(0)
const userAnswers = ref([])
const quizFinished = ref(false)
const quizResultText = ref('')

const currentQuiz = computed(() => {
  if (currentQuizIndex.value !== null) {
    return challenges[currentQuizIndex.value]
  }
  return null
})

const currentQuestion = computed(() => {
  if (currentQuiz.value && currentQuiz.value.quiz && currentQuiz.value.quiz.questions) {
    return currentQuiz.value.quiz.questions[currentQuestionIndex.value]
  }
  return null
})

const flipCard = (index) => {
  flippedIndex.value = index
}

const resetCard = (index) => {
  if (flippedIndex.value === index) {
    flippedIndex.value = null
  }
}

const openQuizCard = (index) => {
  currentQuizIndex.value = index
  currentQuestionIndex.value = 0
  userAnswers.value = []
  quizFinished.value = false
  quizResultText.value = ''
  showQuizCardModal.value = true
}

const answerQuestion = (option) => {
  if (currentQuestion.value) {
    userAnswers.value.push(option)
    if (currentQuestionIndex.value < currentQuiz.value.quiz.questions.length - 1) {
      currentQuestionIndex.value++
    } else {
      const hasChallenge = userAnswers.value.includes('Yes')
      quizResultText.value = hasChallenge
        ? 'You might be facing this challenge.'
        : 'You seem to be managing this well!'
      quizFinished.value = true
    }
  }
}

const closeQuizCard = () => {
  showQuizCardModal.value = false
  currentQuizIndex.value = null
}

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

.section h2 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.section .lead {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
  text-align: center;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.card {
  height: 320px;
  perspective: 1000px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}

.card-front {
  border: 1px solid #eee;
}

.card-front .card-image {
  width: 210px;
  height: 200px;
  object-fit: cover;
  border-radius: 60%;
  margin-bottom: 15px;
}

.card-front .card-title {
  font-size: 1.3rem;
  color: #333;
  font-weight: 500;
}

.card-back {
  transform: rotateY(180deg);
  background-color: #f8f8f8;
  border: 1px solid #eee;
}

.card-back .card-description {
  font-size: 1.05rem;
  line-height: 1.5;
  color: #444;
  margin-bottom: 15px;
}

.quiz-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
}

.quiz-button:hover {
  background-color: #0056b3;
}

.quiz-card-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.quiz-card {
  background: white;
  border-radius: 15px;
  padding: 40px;
  max-width: 700px;
  width: 100%;
  text-align: center;
  position: relative;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #555;
}

.close-button:hover {
  color: #333;
}

.quiz-question {
  margin-top: 30px;
  margin-bottom: 30px;
}

.quiz-question p {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.quiz-options button {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.quiz-options button:hover {
  background-color: #0056b3;
}

.quiz-results {
  margin-top: 30px;
}

.quiz-results p {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 20px;
}

.quiz-results button {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.quiz-results button:hover {
  background-color: #1e7e34;
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  .card {
    height: auto;
  }

  .card-front,
  .card-back {
    position: relative;
  }

  .card.flipped .card-inner {
    transform: rotateY(0deg);
  }

  .card-back {
    margin-top: 20px;
  }
}
</style> 