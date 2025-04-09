<template>
  <div class="container">
    <!-- Hero Section -->
    <section class="section hero" data-aos="fade-down">
      <div class="hero-content">
        <h2>Language is the key to belonging</h2>
        <p class="lead">
          Language is more than just a tool for communication — it is the foundation of cultural identity and community connection.
          For new immigrants arriving in Victoria, language can be the first gateway to starting a new life.
          Let’s begin with language and explore how to better integrate into Victoria’s
          vibrant and multicultural community.
        </p>
      </div>
      <div class="hero-image-container">
        <img src="../assets/languageKey.jpg" alt="language" class="hero-image" />
      </div>
    </section>

    <!-- Language Background Section -->
    <section class="section" data-aos="fade-up">
      <h2>Overview of the Language Backgrounds of Non-English Speaking Immigrant in Victoria</h2>
      <p class="lead">
        In multicultural Victoria, new immigrants come from all over the world, bringing with them a rich diversity of languages and cultures.
        According to recent data, Mandarin, Arabic, Vietnamese, Cantonese, and Greek are among the most common non-English native languages.
        The following chart shows the language backgrounds of commonly spoken non-English native languages in Victoria.
      </p>
      <div class="chart-container"></div>
    </section>

    <!-- Challenges Section -->
    <section class="section challenges" data-aos="fade-up">
      <h2>Challenges from Limited Language Proficiency</h2>
      <p class="lead">
        While this linguistic diversity brings vibrancy to the community, it also presents certain communication challenges.
        Due to different language backgrounds, new immigrants often face language barriers as they adjust to life in a new environment.
        Let’s take a closer look at the challenges that limited language proficiency can bring:
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

    </section>

    <section class="section" data-aos="fade-up">
  <h2>Language Assistance in Victoria State</h2>
  <p class="lead">
    Arriving in a new place can be overwhelming, and language barriers are a real challenge — but don’t worry.
    The Victorian government, along with various non-profit organizations, offers a wide range of language support services for new immigrants.
  </p>

  <div class="assistance-grid">
    <div
      class="assistance-card"
      v-for="(item, index) in languageAssistance"
      :key="index"
      data-aos="zoom-in-up"
    >
      <img :src="item.icon" class="assistance-icon" alt="icon" />
      <h3 class="assistance-title">{{ item.title }}</h3>
      <p class="assistance-description">{{ item.description }}</p>
    </div>
  </div>
</section>

    <!-- Aussie Slang Game Section -->
    <section class="section game" data-aos="fade-up">
      <h2>Mastering Aussie Slang: Speak Like a Local!</h2>
      <p class="lead">
        In addition to formal language, everyday life in Australia is filled with authentic slang expressions.
        Getting familiar with these local terms not only helps you understand what Aussies are really saying,
        but also makes your own communication sound more natural and relatable.
      </p>
      <div style="text-align: center; margin-top: 20px;">
  <button class="play-game-button" @click="openSlangGame">
    Ready for a challenge?
  </button>
</div>
      <SlangGameComponent v-if="showSlangGame" />
    </section>

    <!-- Quiz Modal -->
    <div v-if="showQuizCardModal" class="quiz-card-overlay">
      <div class="quiz-card">
        <button class="close-button" @click="closeQuizCard">X</button>
        <h3 v-if="currentQuiz">{{ currentQuiz.title }}</h3>
        <div v-if="currentQuestion" class="quiz-question">
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
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import SlangGameComponent from '@/components/SlangGameComponent.vue'


onMounted(() => {
  AOS.init({ duration: 600, easing: 'ease-in-out', once: true })
})

import smallTalk from '@/assets/smallTalk.jpg'
import misinterpretingIntentions from '@/assets/misinterpretingIntentions.jpg'
import responseDelay from '@/assets/responseDelay.jpg'
import repeatedConfirmation from '@/assets/repeatedConfirmation.jpg'
import lack from '@/assets/lack.jpg'
import happyAngry from '@/assets/happyAngry.jpg'
import tisIcon from '@/assets/tis.jpg'
import multilangIcon from '@/assets/multilang.jpg'
import communityIcon from '@/assets/community.jpg'
import interpreterIcon from '@/assets/interpreter.jpg'


const languageAssistance = [
  {
    title: 'TIS National Interpreter Service',
    description: 'Free telephone interpretation service available in many languages, helping you access daily and government services.',
    icon: tisIcon,
  },
  {
    title: 'Multilingual Government Information',
    description: 'The Victorian Government website offers information in languages like Chinese, Vietnamese, Arabic, and more to help you stay informed.',
    icon: multilangIcon,
  },
  {
    title: 'Community Language Centres',
    description: 'Language schools and cultural centers offer free or affordable English courses to help improve communication skills.',
    icon: communityIcon,
  },
  {
    title: 'Interpreters in Public Services',
    description: 'Language support is available at hospitals, schools, and courts to ensure clear and accurate communication.',
    icon: interpreterIcon,
  },
]

const showSlangGame = ref(false)

const openSlangGame = () => {
  showSlangGame.value = true
}

const challenges = [
  {
    title: 'Difficulty with Small Talk',
    description: 'Struggling with pleasantries, limited in light conversation',
    frontImage: smallTalk,
    backImage: smallTalk,
    quiz: {
      questions: [
        {
          question: 'Do you often feel awkward when trying to make small talk in English?',
          options: ['Yes', 'No'],
        },
        {
          question: 'Do you avoid casual conversations because you’re unsure what to say?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
  {
    title: 'Misinterpreting Intentions',
    description: 'Unable to accurately express or understand the other person\'s intentions',
    frontImage: misinterpretingIntentions,
    backImage: misinterpretingIntentions,
    quiz: {
      questions: [
        {
          question: 'Do you sometimes misunderstand what others want from a conversation?',
          options: ['Yes', 'No'],
        },
        {
          question: 'Have people misunderstood your intentions due to language use?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
  {
    title: 'Response Delay',
    description: 'Slow reaction, needing more time to understand/respond',
    frontImage: responseDelay,
    backImage: responseDelay,
    quiz: {
      questions: [
        {
          question: 'Do you need more time to understand what people are saying in English?',
          options: ['Yes', 'No'],
        },
        {
          question: 'Do you often hesitate when replying because you’re unsure of the right words?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
  {
    title: 'Repeated Confirmation',
    description: 'Frequently needing to double-check before taking action',
    frontImage: repeatedConfirmation,
    backImage: repeatedConfirmation,
    quiz: {
      questions: [
        {
          question: 'Do you often have to ask others to repeat instructions?',
          options: ['Yes', 'No'],
        },
        {
          question: 'Do you worry about misunderstanding important information?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
  {
    title: 'Lack of Contextual Understanding',
    description: 'Not understanding slang, idioms, or common expressions',
    frontImage: lack,
    backImage: lack,
    quiz: {
      questions: [
        {
          question: 'Do you feel confused by Aussie slang or idioms?',
          options: ['Yes', 'No'],
        },
        {
          question: 'Do you struggle to understand jokes or informal expressions?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
  {
    title: 'Misinterpreting Emotions',
    description: 'Unable to perceive the other person\'s emotional changes through language',
    frontImage: happyAngry,
    backImage: happyAngry,
    quiz: {
      questions: [
        {
          question: 'Do you find it hard to tell if someone is being serious or joking?',
          options: ['Yes', 'No'],
        },
        {
          question: 'Do you often miss emotional cues during conversations?',
          options: ['Yes', 'No'],
        },
      ],
    },
  },
];

const flippedIndex = ref(null)
const flipCard = (index) => {
  flippedIndex.value = index
}
const resetCard = (index) => {
  if (flippedIndex.value === index) {
    flippedIndex.value = null
  }
}



// Quiz
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
      // Quiz end
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
</script>

<style scoped>

.assistance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.assistance-card {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.assistance-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
}

.assistance-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}

.assistance-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.assistance-description {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}
/* General container style */
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
}

/* Common style for each main content block */
.section {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 40px;
  margin-bottom: 40px;
}

/* Section title style */
.section h2 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

/* Section lead text style */
.section .lead {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
  text-align: center;
}

/* Hero area style */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 50px;
  background-color: #f9f9f9;
}

/* Hero text content style */
.hero-content {
  flex: 1;
  text-align: left;
}

/* Hero title style */
.hero-content h2 {
  font-size: 2.8rem;
  margin-bottom: 15px;
  text-align: left;
}

/* Hero lead text style */
.hero-content .lead {
  font-size: 1.2rem;
  text-align: left;
}

/* Hero image container style */
.hero-image-container {
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

/* Hero image style */
.hero-image {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Chart container style */
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 20px;
}

/* Chart placeholder text style */
.chart-container .placeholder {
  color: #777;
  font-style: italic;
}

/* Chart element style */
.chart {
  width: 100%;
  max-width: 500px;
  height: auto;
}

/* Challenge list section style */
.challenges {
  background-color: #fff;
}

/* Card grid layout style */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

/* Individual card style */
.card {
  height: 320px;
  perspective: 1000px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Card inner container style */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
}

/* Rotate inner container when card is flipped */
.card.flipped .card-inner {
  transform: rotateY(180deg);
}

/* Common style for front and back of card */
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

/* Front side of card */
.card-front {
  border: 1px solid #eee;
}

/* Front image style */
.card-front .card-image {
  width: 210px;
  height: 200px;
  object-fit: cover;
  border-radius: 60%;
  margin-bottom: 15px;
}

/* Front title style */
.card-front .card-title {
  font-size: 1.3rem;
  color: #333;
  font-weight: 500;
}

/* Back side of card */
.card-back {
  transform: rotateY(180deg);
  background-color: #f8f8f8;
  border: 1px solid #eee;
}

/* Back image style */
.card-back .card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

/* Back description text style */
.card-back .card-description {
  font-size: 1.05rem;
  line-height: 1.5;
  color: #444;
  margin-bottom: 15px;
}


/* Responsive design */
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

@media (max-width: 600px) {
  .section {
    padding: 30px;
    margin-bottom: 30px;
  }

  .section h2 {
    font-size: 2rem;
  }

  .section .lead {
    font-size: 1rem;
  }

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

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
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

/* New quiz large card modal style */
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
  z-index: 1000; /* Ensure it's above other elements */
}

.quiz-card {
  background: white;
  border-radius: 15px;
  padding: 40px;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative; /* For positioning close button */
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
</style>
