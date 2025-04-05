<template>
    <div class="game-container" :class="{ fade: isRestarting }">
      <h2 class="game-title">AU Aussie Slang Match Game</h2>
      <div class="status-bar">
        <p>Time Remaining: {{ timer }} seconds</p >
        <p>Score: {{ score }} / {{ slangList.length }}</p >
        <p>Best Score: {{ bestScore }}</p >
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
  
      <div v-if="gameOver" class="result">
        <h3>Game Over!</h3>
        <p>{{ resultMessage }}</p >
        <p>You got {{ score }} / {{ slangList.length }} correct.</p >
        <p>Current Best Score: {{ bestScore }}</p >
        <button class="restart-button" @click="restartGame">Play Again</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // Game data
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
  
  // State
  const shuffledSlang = ref([]);
  const activeMeanings = ref([]);
  const currentIndex = ref(0);
  const currentSlang = ref(null);
  const score = ref(0);
  const bestScore = ref(parseInt(localStorage.getItem('bestScore') || '0'));
  const timer = ref(60);
  const position = ref(0);
  const leftPosition = ref('50%');
  let fallingInterval = null;
  let countdown = null;
  const gameOver = ref(false);
  const feedbackIndex = ref(null);
  const feedbackType = ref(null);
  const isRestarting = ref(false);
  const correctlyAnswered = ref([]);
  
  // soundscape
  const correctSound = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
  const wrongSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
  
  // feedback message
  const resultMessage = computed(() => {
    const percent = score.value / slangList.length;
    if (percent === 1) return 'Perfect score! You are a true Aussie expert!';
    if (percent >= 0.7) return 'Great job! You know your Aussie slang!';
    return 'Try to make more Aussie friends, you will do better next time!';
  });
  
  // Initialise answer options
  function shuffleMeanings() {
    const allMeanings = slangList.map((s) => s.meaning);
    const shuffled = [...allMeanings].sort(() => 0.5 - Math.random());
    activeMeanings.value = [...shuffled];
  }
  
  // deal with the options
  function handleSelection(selected, index) {
    if (!currentSlang.value) return;
  
    if (selected === currentSlang.value.meaning) {
      score.value++;
      correctSound.play();
      feedbackType.value = 'correct';
      correctlyAnswered.value.push(selected);
      activeMeanings.value.splice(activeMeanings.value.indexOf(selected), 1);
    } else {
      wrongSound.play();
      feedbackType.value = 'wrong';
    }
  
    feedbackIndex.value = index;
  
    setTimeout(() => {
      feedbackIndex.value = null;
      feedbackType.value = null;
      nextWord();
    }, 400);
  }
  
  // next
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
  
  // Drop Animation
  function startFalling() {
    position.value = 0;
    const randomLeft = Math.floor(Math.random() * 60) + 20;
    leftPosition.value = `${randomLeft}%`;
  
    fallingInterval = setInterval(() => {
      position.value += 0.2;
      if (position.value > 350) {
        wrongSound.play();
        nextWord();
      }
    }, 20);
  }
  
  // count down
  function startCountdown() {
    countdown = setInterval(() => {
      timer.value--;
      if (timer.value <= 0) {
        clearInterval(countdown);
        clearInterval(fallingInterval);
        endGame();
      }
    }, 1000);
  }
  
  // game over
  function endGame() {
    gameOver.value = true;
    if (score.value > bestScore.value) {
      bestScore.value = score.value;
      localStorage.setItem('bestScore', bestScore.value.toString());
    }
  }
  
  // restart game
  function restartGame() {
    isRestarting.value = true;
    setTimeout(() => {
      shuffledSlang.value = [...slangList].sort(() => 0.5 - Math.random());
      currentIndex.value = 0;
      score.value = 0;
      timer.value = 60;
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
  
  // initialise game
  onMounted(() => {
    restartGame();
  });
  </script>
  
  <style scoped>
  .game-container {
    max-width: 700px;
    margin: auto;
    text-align: center;
    font-family: 'Arial', sans-serif;
    transition: opacity 0.5s ease;
    background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .game-container.fade {
    opacity: 0;
  }
  
  .game-title {
    color: #1976d2;
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
    background: #f0f8ff;
  }
  
  .falling-slang {
    position: absolute;
    font-size: 36px;
    font-weight: bold;
    color: #1976d2;
    animation: sway 1s infinite ease-in-out;
    background: white;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  @keyframes sway {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(10px); }
  }
  
  .options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  button {
    padding: 14px 20px;
    font-size: 18px;
    min-width: 180px;
    background: #bbdefb;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  button:hover {
    background: #90caf9;
    transform: translateY(-2px);
  }
  
  button.correct {
    background-color: #c8e6c9 !important;
  }
  
  button.wrong {
    background-color: #ffcdd2 !important;
  }
  
  .result {
    font-size: 20px;
    margin-top: 20px;
    color: #333;
  }
  
  .restart-button {
    padding: 14px 20px;
    font-size: 18px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 20px;
    transition: background 0.2s, transform 0.2s;
  }
  
  .restart-button:hover {
    background: #43a047;
    transform: translateY(-2px);
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-leave-to {
    opacity: 0;
  }
  </style>