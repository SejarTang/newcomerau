<template>
  <div v-if="!gameStarted" class="start-screen">
    <h3>Welcome to play the Slang Match Game!</h3>
    <button class="start-button" @click="startGame">Start Game</button>
  </div>

  <div v-else class="game-container" :class="{ fade: isRestarting }">
    <h2 class="game-title">Australia Slang Match Game</h2>

    <div class="status-bar">
      <p>⏳ Time Remaining: {{ timer }}s</p>
      <p>🏅 Score: {{ score }} / {{ slangList.length }}</p>
      <p>🏆 Best Score: {{ bestScore }}</p>
    </div>

    <div class="falling-zone">
      <div
        v-if="currentSlang"
        class="falling-slang"
        :style="{ top: position + 'px', left: leftPosition }"
      >
        {{ currentSlang.word }}
      </div>
    </div>

    <div class="options">
      <transition-group name="fade" tag="div" class="button-group">
        <button
          v-for="(meaning, index) in activeMeanings"
          :key="meaning"
          :class="{
            correct: feedbackIndex === index && feedbackType === 'correct',
            wrong: feedbackIndex === index && feedbackType === 'wrong',
          }"
          @click="handleSelection(meaning, index)"
        >
          {{ meaning }}
        </button>
      </transition-group>
    </div>

    <div v-if="gameOver">
      <div class="overlay"></div>
      <div class="result">
        <h3>Game Over!</h3>
        <p>{{ resultMessage }}</p>
        <p>You got {{ score }} / {{ slangList.length }} correct!</p>
        <p>Current Best Score: {{ bestScore }}</p>
        <button class="restart-button" @click="restartGame">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const slangList = [
  { word: 'aussie', meaning: 'Australian' },
  { word: 'mate', meaning: 'Friend' },
  { word: 'arvo', meaning: 'Afternoon' },
  { word: 'avo', meaning: 'Avocado' },
  { word: 'servo', meaning: 'Service station' },
  { word: "G'day", meaning: 'Good day' },
  { word: 'footy', meaning: 'Football' },
  { word: 'chockie', meaning: 'Chocolate' },
  { word: 'brekkie', meaning: 'Breakfast' },
  { word: 'straya', meaning: 'Australia' },
];

const GAME_DURATION = 60;
const FALL_LIMIT = 350;
const FALL_SPEED = 0.7;

const gameStarted = ref(false);
const shuffledSlang = ref([]);
const activeMeanings = ref([]);
const currentIndex = ref(0);
const currentSlang = ref(null);
const score = ref(0);
const bestScore = ref(parseInt(localStorage.getItem('bestScore') || '0'));
const timer = ref(GAME_DURATION);
const position = ref(0);
const leftPosition = ref('50%');
const gameOver = ref(false);
const feedbackIndex = ref(null);
const feedbackType = ref(null);
const isRestarting = ref(false);
const correctlyAnswered = ref([]);

let fallingInterval = null;
let countdown = null;

const correctSound = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
const wrongSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
const finishSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');

const resultMessage = computed(() => {
  const percent = score.value / slangList.length;
  if (percent === 1) return '🏆 Perfect score! You are a true Aussie expert!';
  if (percent >= 0.7) return '👏🏻 Great job! You know a lot of Aussie slang!';
  return '🤝 Keep practicing and make more Aussie friends!';
});

function shuffleMeanings() {
  const allMeanings = slangList.map(s => s.meaning);
  const shuffled = [...allMeanings].sort(() => 0.5 - Math.random());
  activeMeanings.value = shuffled;
}

function handleSelection(selected, index) {
  if (!currentSlang.value) return;

  if (selected === currentSlang.value.meaning) {
    score.value++;
    correctSound.play();
    feedbackType.value = 'correct';
    correctlyAnswered.value.push(selected);
    activeMeanings.value.splice(activeMeanings.value.indexOf(selected), 1);
    setTimeout(() => {
      feedbackIndex.value = null;
      feedbackType.value = null;
      nextWord();
    }, 200);
  } else {
    wrongSound.play();
    feedbackType.value = 'wrong';
    feedbackIndex.value = index;
    setTimeout(() => {
      feedbackIndex.value = null;
      feedbackType.value = null;
      nextWord();
    }, 400);
  }
}

function nextWord() {
  clearInterval(fallingInterval);
  position.value = 0;
  currentIndex.value++;
  if (currentIndex.value >= shuffledSlang.value.length || timer.value <= 0) {
    endGame();
    return;
  }
  currentSlang.value = shuffledSlang.value[currentIndex.value];
  startFalling();
}

function startFalling() {
  clearInterval(fallingInterval);
  position.value = 0;
  const randomLeft = Math.floor(Math.random() * 60) + 20;
  leftPosition.value = `${randomLeft}%`;
  fallingInterval = setInterval(() => {
    position.value += FALL_SPEED;
    if (position.value > FALL_LIMIT) {
      wrongSound.play();
      nextWord();
    }
  }, 20);
}

function startCountdown() {
  clearInterval(countdown);
  countdown = setInterval(() => {
    timer.value--;
    if (timer.value <= 0) {
      clearInterval(countdown);
      clearInterval(fallingInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(fallingInterval);
  clearInterval(countdown);
  gameOver.value = true;
  finishSound.play();
  if (score.value > bestScore.value) {
    bestScore.value = score.value;
    localStorage.setItem('bestScore', bestScore.value.toString());
  }
}

function startGame() {
  gameStarted.value = true;
  restartGame();
}

function restartGame() {
  isRestarting.value = true;
  setTimeout(() => {
    shuffledSlang.value = [...slangList].sort(() => 0.5 - Math.random());
    currentIndex.value = 0;
    score.value = 0;
    timer.value = GAME_DURATION;
    gameOver.value = false;
    feedbackIndex.value = null;
    feedbackType.value = null;
    correctlyAnswered.value = [];
    shuffleMeanings();
    currentSlang.value = shuffledSlang.value[0];
    isRestarting.value = false;
    startFalling();
    startCountdown();
  }, 500);
}
</script>

<style scoped>

.game-container, .start-screen {
  position: relative;
  max-width: 1000px;
  margin: auto;
  margin-top: 15px;
  text-align: center;
  font-family: 'Poppins', 'Arial', sans-serif;
  padding: 30px;
  border-radius: 20px;
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s ease;
}

.game-title {
  color: #1565c0;
  margin-bottom: 20px;
  font-size: 2.5rem;
}

.status-bar {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #333;
}

.falling-zone {
  height: 300px;
  position: relative;
  overflow: hidden;
  border: 2px dashed #81d4fa;
  margin-bottom: 20px;
  background: #e3f2fd;
  border-radius: 12px;
}

.falling-slang {
  position: absolute;
  font-size: 38px;
  font-weight: bold;
  color: #1976d2;
  animation: sway 1.5s infinite ease-in-out;
  background: white;
  padding: 12px 24px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@keyframes sway {
  0% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(20px) rotate(10deg); }
  50% { transform: translateX(0) rotate(0deg); }
  75% { transform: translateX(-20px) rotate(-10deg); }
  100% { transform: translateX(0) rotate(0deg); }
}

.options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-bottom: 20px;
}

button {
  padding: 16px 24px;
  font-size: 18px;
  min-width: 200px;
  background: linear-gradient(135deg, #64b5f6, #2196f3);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

button:hover {
  background: linear-gradient(135deg, #42a5f5, #1e88e5);
  transform: translateY(-4px);
}

button.correct {
  background: #66bb6a !important;
}

button.wrong {
  background: #ef5350 !important;
}

.restart-button, .start-button {
  padding: 14px 30px;
  font-size: 20px;
  background: linear-gradient(135deg, #81c784, #4caf50);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
}

.restart-button:hover, .start-button:hover {
  background: linear-gradient(135deg, #66bb6a, #388e3c);
  transform: translateY(-3px);
}

.result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  font-size: 24px;
  color: #333;
  background: white;
  padding: 30px 40px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 5;
  border-radius: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
