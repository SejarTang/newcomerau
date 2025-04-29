<template>
  <div class="chatbot-page">

    <!-- Top-level introduction text -->
    <div class="intro-text">
      <h2 class="intro-title">Welcome to NewcomerAU Health Support!</h2>
      <p class="intro-subtitle">
        I'm here to assist you with simple health-related questions.<br>
        You can type your concerns below, or click a quick question to start!
      </p>
    </div>

    <!-- Middle layout area -->
    <div class="chatbot-layout">

      <!-- Left side presupposed question-->
      <div class="preset-questions full-height">
        <button
          v-for="(q, idx) in presetQuestions"
          :key="idx"
          @click="sendPreset(q)"
        >
          {{ q }}
        </button>
      </div>

      <!-- The middle chat box -->
      <div class="chatbot-container">
        <ChatBot ref="chatbotRef" />
      </div>

      <!-- The question presupposed on the right side. -->
      <div class="preset-questions full-height">
        <button
          v-for="(q, idx) in presetQuestions2"
          :key="'r'+idx"
          @click="sendPreset(q)"
        >
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
  "What should I do if I have a fever?",
  "How can I treat a mild headache at home?",
  "When should I see a doctor for a persistent cough?"
]);

const presetQuestions2 = ref([
  "How do I clean and dress a small cut?",
  "What medicine helps a sore throat?",
  "What number do I call for an ambulance in Australia?"
]);

const chatbotRef = ref(null);
function sendPreset(question) {
  if (chatbotRef.value && chatbotRef.value.receivePreset) {
    chatbotRef.value.receivePreset(question);
  }
}
</script>

<style scoped>
/* ---------- 页面整体 ---------- */
.chatbot-page {
  padding: 100px 20px 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

/* ---------- 欢迎区设计 ---------- */
.intro-text {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

/* 主标题 */
.intro-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #2c7a83;
  letter-spacing: 1px;
  margin-bottom: 8px;
  display: inline-block;
  position: relative;
  padding-bottom: 6px;
}


/* 副标题 */
.intro-subtitle {
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* ---------- 聊天布局 ---------- */
.chatbot-layout {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 40px;
  flex-wrap: wrap;
}

/* 预设问题区域 */
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

/* 预设按钮 */
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

/* 聊天框外层容器 */
.chatbot-container {
  width: 880px;  /* 扩展过的宽度 */
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 10px;
}

</style>
