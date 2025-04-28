<template>
  <div class="chatbot-page">

    <!-- Top-level introduction text -->
    <div class="intro-text">
      <h2>Welcome to NewcomerAU Health Support!</h2>
      <p>
        I'm here to assist you with simple health-related questions.
        You can type your concerns below, or click a quick question to start!
      </p>
    </div>

    <!-- Middle layout area -->
    <div class="chatbot-layout">

      <!-- Left side presupposed question-->
      <div class="preset-questions full-height">
        <button v-for="(q, idx) in presetQuestions" :key="idx" @click="sendPreset(q)">
          {{ q }}
        </button>
      </div>

      <!-- The middle chat box -->
      <div class="chatbot-container">
        <ChatBot ref="chatbotRef" />
      </div>

      <!-- The question presupposed on the right side. -->
      <div class="preset-questions full-height">
        <button v-for="(q, idx) in presetQuestions2" :key="'r'+idx" @click="sendPreset(q)">
          {{ q }}
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatBot from '@/components/ChatBot.vue';

const presetQuestions = ref([
  "I feel unwell",
  "How can I find a clinic?",
  "What to do if I have a headache?"
]);

const presetQuestions2 = ref([
  "What is Medicare?",
  "Emergency number in Australia?",
  "How to get a doctor appointment?"
]);

const chatbotRef = ref(null);
function sendPreset(question) {
  if (chatbotRef.value && chatbotRef.value.receivePreset) {
    chatbotRef.value.receivePreset(question);
  }
}
</script>

<style scoped>
.chatbot-page {
  padding: 100px 20px 20px;
}

.intro-text {
  text-align: center;
  margin-bottom: 40px;
}

.chatbot-layout {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 40px;
  flex-wrap: wrap;
}

.preset-questions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  min-width: 220px;
}


.full-height {
  height: 600px;
}


.preset-questions button {
  flex: 1;
  padding: 20px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  transition: all 0.3s ease;
  text-align: center;
  word-break: break-word;
}

.preset-questions button:hover {
  background-color: #f0fdf4;
  box-shadow: 0 6px 12px rgba(66, 185, 131, 0.2);
  border-color: #42b983;
  color: #2c7a4b;
}

.chatbot-container {
  width: 440px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 10px;
}
</style>
