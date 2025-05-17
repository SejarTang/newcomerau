<template>
  <div class="quiz-container">
    <div class="quiz-wrapper" :class="{ active: quizStarted }">

      <!-- Left illustration section -->
      <div class="quiz-image" :class="{ expanded: quizStarted }">
        <img src="@/assets/morequiz.jpg" alt="Quiz Illustration" />
      </div>

      <!-- Right quiz content section -->
      <div class="quiz-content">
        <h1 class="quiz-title">Cultural Integration Quiz</h1>
        <p class="quiz-intro">
          Welcome to the Australian Cultural Integration Quiz! Discover how well you understand the Australian lifestyle, values, and social customs through the following questions.
        </p>

        <!-- Start button before quiz begins -->
        <div v-if="!quizStarted" class="center">
          <button class="start-btn" @click="quizStarted = true">Start Quiz</button>
        </div>

        <!-- Main quiz flow -->
        <transition name="fade" mode="out-in">
          <div v-if="quizStarted && !quizCompleted" :key="currentQuestionIndex">
            <div class="progress-info">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
              <span class="progress-text">{{ progressPercentage }}%</span>
            </div>

            <h2 class="question-text">{{ currentQuestion.question }}</h2>
            <ul class="options-list">
              <li v-for="(option, idx) in currentQuestion.options" :key="idx">
                <button
                  class="option-btn"
                  @click="selectOption(idx)"
                  :disabled="showFeedback"
                >
                  {{ option }}
                </button>
              </li>
            </ul>

            <!-- Show feedback after answer -->
            <div v-if="showFeedback" class="feedback">
              <span v-if="isLastAnswerCorrect" class="correct">Correct Answer</span>
              <span v-else class="incorrect">Wrong Answer</span>
            </div>
          </div>
        </transition>

        <!-- Final results section -->
        <div v-if="quizCompleted" class="results">
          <h2 class="score-title">Your Score: {{ score }}/{{ questions.length }}</h2>
          <p class="score-feedback">
            {{ score >= 8 ? 'You have a great understanding of Australian culture!' : 'Good start! Try again to improve your score.' }}
          </p>

          <!-- Incorrect answer explanations -->
          <div v-if="incorrectAnswers.length" class="wrong-section">
            <h3>Questions You Answered Incorrectly:</h3>
            <ul>
              <li v-for="(item, idx) in incorrectAnswers" :key="idx" class="wrong-item">
                <p><strong>Question:</strong> {{ item.question.question }}</p>
                <p>Your answer: <span class="wrong">{{ item.question.options[item.selected] }}</span></p>
                <p>Correct answer: <span class="right">{{ item.question.options[item.question.correct] }}</span></p>
                <p class="explanation">Explanation: {{ item.question.explanation }}</p>
              </li>
            </ul>
          </div>

          <!-- Restart quiz button -->
          <div class="center">
            <button class="restart-btn" @click="restartQuiz">Restart Quiz</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State control
const quizStarted = ref(false)
const currentQuestionIndex = ref(0)
const selectedAnswers = ref([])
const quizCompleted = ref(false)
const showFeedback = ref(false)
const isLastAnswerCorrect = ref(false)

// Quiz data
const questions = [
  {
    question: 'Which of the following is considered a common social etiquette in Australia?',
    options: ['Not tipping', 'Wearing shoes indoors', 'Hugging when greeting', 'Keeping distance in supermarket queues'],
    correct: 3,
    explanation: 'Australians value personal space, and keeping distance while queuing is a basic social norm.'
  },
  {
    question: 'What is one of the most common leisure activities among Australians?',
    options: ['Going to the theater', 'Surfing and barbecuing', 'Shopping', 'Playing mahjong'],
    correct: 1,
    explanation: 'Australians love beach activities and barbecues, which are typical ways to socialize with family and friends.'
  },
  {
    question: 'Which behavior is encouraged in Australian schools?',
    options: ['Students must stay quiet and not ask questions', 'Students can correct teachers', 'Strict uniform codes', 'Teachers do not need to interact'],
    correct: 1,
    explanation: 'Australian education emphasizes critical thinking, and students are encouraged to express their opinions and even challenge their teachers.'
  },
  {
    question: 'Which statement best reflects Australians’ view of time?',
    options: ['Being late is common', 'Punctuality is not important', 'Time is very flexible', 'Being on time is highly valued'],
    correct: 3,
    explanation: 'Australians generally value punctuality, especially in professional and formal settings.'
  },
  {
    question: 'What is typical about winter in Australia?',
    options: ['Warm like summer all year', 'Heavy snow and extreme cold', 'Cold and damp in some areas', 'No winter at all'],
    correct: 2,
    explanation: 'In southern cities like Melbourne, winters are often cold and damp, contrary to the tropical image many have of Australia.'
  },
  {
    question: 'Which of the following animals is least likely to be seen near Australian homes?',
    options: ['Kangaroo', 'Possum', 'Spider', 'Owl'],
    correct: 3,
    explanation: 'Possums and spiders are commonly seen in residential areas, but owls are less likely to appear near human activity.'
  },
  {
    question: 'Which staple food is most common in Australians’ daily diets?',
    options: ['Rice', 'Corn', 'Wheat and potatoes', 'Beans'],
    correct: 2,
    explanation: 'Traditional Australian diets mainly consist of bread, potatoes, etc., while rice is more common in Asian diets.'
  },
  {
    question: 'What is the typical relationship between neighbors in Australia?',
    options: ['Visit each other frequently', 'Barely know each other', 'Eat together daily', 'Work together regularly'],
    correct: 1,
    explanation: 'Australians value personal space and tend to maintain polite but distant relationships with neighbors.'
  },
  {
    question: 'How do Australians typically socialize?',
    options: ['Go to tea houses', 'Read together', 'Drink and chat together', 'Work together'],
    correct: 2,
    explanation: 'In Australia, socializing often happens in relaxed settings like pubs or barbecues.'
  },
  {
    question: 'What are most Australian children encouraged to participate in from a young age?',
    options: ['Earning money', 'Playing video games', 'Sports activities', 'Learning musical instruments'],
    correct: 2,
    explanation: 'Sports are a vital part of Australian culture, and children are widely encouraged to participate actively.'
  },
]

// Computed properties
const currentQuestion = computed(() => questions[currentQuestionIndex.value])
const progressPercentage = computed(() =>
  Math.round(((currentQuestionIndex.value + 1) / questions.length) * 100)
)

// Handle answer selection
function selectOption(index) {
  const isCorrect = index === currentQuestion.value.correct
  isLastAnswerCorrect.value = isCorrect
  selectedAnswers.value.push(index)
  showFeedback.value = true

  setTimeout(() => {
    showFeedback.value = false
    if (currentQuestionIndex.value + 1 < questions.length) {
      currentQuestionIndex.value++
    } else {
      quizCompleted.value = true
    }
  }, 1000)
}

// Calculate final score
const score = computed(() =>
  selectedAnswers.value.reduce((acc, selected, i) =>
    selected === questions[i].correct ? acc + 1 : acc, 0)
)

// Identify incorrect answers
const incorrectAnswers = computed(() =>
  selectedAnswers.value
    .map((selected, i) => ({ question: questions[i], selected }))
    .filter(item => item.selected !== item.question.correct)
)

// Reset quiz to start again
function restartQuiz() {
  currentQuestionIndex.value = 0
  selectedAnswers.value = []
  quizCompleted.value = false
  quizStarted.value = false
}
</script>

<style scoped>
/* Container covers full viewport height with gradient background */
.quiz-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #cbe8ff, #ffffff, #c6f6d5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

/* Wrapper for both image and quiz content */
.quiz-wrapper {
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  padding: 0 40px;
  align-items: stretch;
}

/* When quiz starts: adjust layout proportions */
.quiz-wrapper.active .quiz-image {
  flex: 0 0 35%;
}

.quiz-wrapper.active .quiz-content {
  flex: 0 0 60%;
}

/* Left-side illustration section */
.quiz-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  padding: 20px;
  max-height: 300px;
  transition: all 0.4s ease;
}

/* Expand image area vertically when quiz starts */
.quiz-image.expanded {
  max-height: none;
  align-self: stretch;
}

/* Responsive image styling */
.quiz-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
}

/* Right-side quiz content area */
.quiz-content {
  flex: 2;
  text-align: center;
}

/* Quiz main title */
.quiz-title {
  font-size: 42px;
  font-weight: bold;
  color: #00070d;
  margin-bottom: 10px;
}

/* Introduction paragraph */
.quiz-intro {
  font-size: 24px;
  color: #333;
  margin-bottom: 40px;
}

/* Start & Restart buttons */
.start-btn,
.restart-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 16px 40px;
  font-size: 24px;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 40px;
  animation: breathe 2.5s ease-in-out infinite;
}

/* Breathing animation for CTA buttons */
@keyframes breathe {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0, 123, 255, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 123, 255, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0, 123, 255, 0.7);
  }
}

/* Button hover effect */
.start-btn:hover,
.restart-btn:hover {
  background-color: #0056b3;
}

/* Question progress text */
.progress-info {
  margin-top: 40px;
  margin-bottom: 12px;
  font-size: 28px;
  color: #444;
}

/* Progress bar container */
.progress-bar {
  background-color: #ddd;
  border-radius: 12px;
  height: 24px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  width: 100%;
}

/* Animated fill for progress bar */
.progress-fill {
  background: linear-gradient(to right, red, orange, green);
  height: 100%;
  transition: width 0.5s ease-out;
}

/* Percentage text overlay on progress bar */
.progress-text {
  position: absolute;
  width: 100%;
  text-align: center;
  color: white;
  font-weight: bold;
  line-height: 24px;
}

/* Question text style */
.question-text {
  font-size: 28px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 30px;
}

/* Answer option list */
.options-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Answer button */
.option-btn {
  width: 100%;
  font-size: 20px;
  padding: 14px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

/* Hover state for option button */
.option-btn:hover {
  background-color: #f2f2f2;
}

/* Feedback text after answering */
.feedback {
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
}

/* Feedback colors */
.correct {
  color: green;
}

.incorrect {
  color: red;
}

/* Final result section */
.results {
  text-align: center;
}

/* Score title */
.score-title {
  font-size: 28px;
  color: green;
}

/* Score feedback message */
.score-feedback {
  color: #555;
  font-size: 20px;
}

/* Section for showing incorrect answers */
.wrong-section {
  margin-top: 30px;
  text-align: left;
}

/* Incorrect answer item box */
.wrong-item {
  background: #ffe6e6;
  padding: 15px;
  border: 1px solid #ffcccc;
  border-radius: 10px;
  margin-bottom: 16px;
}

/* Styling for wrong and correct answers */
.wrong {
  color: red;
}

.right {
  color: green;
}

/* Explanation for each question */
.explanation {
  margin-top: 6px;
  color: #444;
  font-style: italic;
}

/* Fade transition for question animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive layout for mobile screens */
@media (max-width: 900px) {
  .quiz-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .quiz-wrapper.active .quiz-image,
  .quiz-wrapper.active .quiz-content {
    flex: unset;
    width: 100%;
  }

  .quiz-image {
    max-height: none;
    margin-bottom: 20px;
  }
}
</style>
