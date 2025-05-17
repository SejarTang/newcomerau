<template>
  <div class="quiz-container">
    <div class="quiz-box">
      <h1 class="quiz-title">Cultural Integration Quiz</h1>
      <p class="quiz-intro">Welcome to the Australian Cultural Integration Quiz! Discover how well you understand the Australian lifestyle, values, and social customs through the following questions.</p>

      <div v-if="!quizStarted" class="center">
        <button class="start-btn" @click="quizStarted = true">Start Quiz</button>
      </div>

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

          <div v-if="showFeedback" class="feedback">
            <span v-if="isLastAnswerCorrect" class="correct">Correct Answer</span>
            <span v-else class="incorrect">Wrong Answer</span>
          </div>
        </div>
      </transition>

      <div v-if="quizCompleted" class="results">
        <h2 class="score-title">Your Score: {{ score }}/{{ questions.length }}</h2>
        <p class="score-feedback">
          {{ score >= 8 ? 'You have a great understanding of Australian culture!' : 'Good start! Try again to improve your score.' }}
        </p>

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

        <div class="center">
          <button class="restart-btn" @click="restartQuiz">Restart Quiz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const quizStarted = ref(false)
const currentQuestionIndex = ref(0)
const selectedAnswers = ref([])
const quizCompleted = ref(false)
const showFeedback = ref(false)
const isLastAnswerCorrect = ref(false)

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

const currentQuestion = computed(() => questions[currentQuestionIndex.value])
const progressPercentage = computed(() =>
  Math.round(((currentQuestionIndex.value + 1) / questions.length) * 100)
)

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

const score = computed(() =>
  selectedAnswers.value.reduce((acc, selected, i) =>
    selected === questions[i].correct ? acc + 1 : acc, 0)
)

const incorrectAnswers = computed(() =>
  selectedAnswers.value
    .map((selected, i) => ({ question: questions[i], selected }))
    .filter(item => item.selected !== item.question.correct)
)

function restartQuiz() {
  currentQuestionIndex.value = 0
  selectedAnswers.value = []
  quizCompleted.value = false
  quizStarted.value = false
}
</script>

<style scoped>
.quiz-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #cbe8ff, #ffffff, #c6f6d5);
  display: flex;
  justify-content: center;
  padding: 60px 20px 40px;
}

.quiz-box {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 30px;
  max-width: 1900px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.quiz-title {
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  color: #00070d;
}

.quiz-intro {
  text-align: center;
  font-size: 50px;
  color: #333;
  margin-top: 150px;
  margin-bottom: 20px;
}

.center {
  text-align: center;
  margin-top: 20px;
}

.start-btn,
.restart-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 20px 100px;
  font-size: 56px;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 120px;

  animation: breathe 2.5s ease-in-out infinite;
}

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

.start-btn:hover,
.restart-btn:hover {
  background-color: #0056b3;
}

.progress-info {
  margin-bottom: 8px;
  font-size: 50px;
  color: #666666;
  margin-top: 80px;
}

.progress-bar {
  background-color: #ddd;
  border-radius: 12px;
  height: 24px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-fill {
  background: linear-gradient(to right, red, orange, green);
  height: 100%;
  transition: width 0.5s ease-out;
}

.progress-text {
  position: absolute;
  width: 100%;
  text-align: center;
  color: white;
  font-weight: bold;
  line-height: 24px;
}

.question-text {
  font-size: 50px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 10px;
}

.options-list {
  list-style: none;
  padding: 0;
  margin-top: 30px;
}

.option-btn {
  width: 100%;
  font-size: 36px;
  padding: 10px 14px;
  margin-bottom: 10px;
  border: 1px solid #aaa;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: background 0.3s;
  text-align: center;
}

.option-btn:hover {
  background-color: #f0f0f0;
}

.feedback {
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}

.results {
  text-align: center;
}

.score-title {
  font-size: 22px;
  color: green;
}

.score-feedback {
  color: #555;
}

.wrong-section {
  margin-top: 20px;
  text-align: left;
}

.wrong-item {
  background: #ffe6e6;
  padding: 15px;
  border: 1px solid #ffcccc;
  border-radius: 10px;
  margin-bottom: 12px;
}

.wrong {
  color: red;
}

.right {
  color: green;
}

.explanation {
  margin-top: 6px;
  color: #444;
  font-style: italic;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
