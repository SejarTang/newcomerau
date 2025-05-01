<template>
  <!-- Main container for the chatbot page -->
  <div class="chatbot-page">
    <!-- Top-level introduction text -->
    <div class="intro-text">
      <!-- Page title -->
      <h2 class="intro-title">Welcome to NewcomerAU Health Support!</h2>
      <!-- Subtitle providing instructions -->
      <p class="intro-subtitle">
        I'm here to assist you with simple health-related questions.<br>
        You can type your concerns below, or click a quick question to start!
      </p>
    </div>

    <!-- Middle layout: preset questions + chat area -->
    <div class="chatbot-layout">
      <!-- Left column: preset questions list -->
      <div class="preset-questions full-height">
        <!-- Loop over first set of questions -->
        <button
          v-for="(q, idx) in presetQuestions"
          :key="idx"
          @click="sendPreset(q)"
        >
          {{ q }}
        </button>
      </div>

      <!-- Center column: chat interface -->
      <div class="chatbot-container">
        <!-- Chat component wrapper -->
        <div class="chatbot">
          <!-- Messages display area -->
          <div class="messages">
            <!-- Render each message with appropriate styling -->
            <div
              v-for="(msg, idx) in messages"
              :key="idx"
              :class="msg.role"
            >
              {{ msg.text }}
            </div>
          </div>

          <!-- User input area -->
          <div class="input-area">
            <!-- Text input bound to userInput state -->
            <input
              v-model="userInput"
              @keyup.enter="handleSend"
              :disabled="loading"
              placeholder="Describe your health concern..."
            />
            <!-- Send button triggers handleSend -->
            <button
              @click="handleSend"
              :disabled="loading || !userInput.trim()"
            >
              {{ loading ? 'Thinking...' : 'Send' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Right column: second set of preset questions -->
      <div class="preset-questions full-height">
        <!-- Loop over second set of questions -->
        <button
          v-for="(q, idx) in presetQuestions2"
          :key="'r' + idx"
          @click="sendPreset(q)"
        >
          {{ q }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import Vue composition API
import { ref } from 'vue';

// === Gemini API Configuration ===
// Replace with your actual API key if needed
const API_KEY = 'AIzaSyC8rIwKzh7J5DlL0XiWuKG-dzYQzclg5xI';
// Endpoint to call Gemini model for content generation
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Preset question lists for left and right panels
const presetQuestions = ref([
  'What should I do if I have a fever?',
  'How can I treat a mild headache at home?',
  'When should I see a doctor for a persistent cough?'
]);
const presetQuestions2 = ref([
  'How do I clean and dress a small cut?',
  'What medicine helps a sore throat?',
  'What number do I call for an ambulance in Australia?'
]);

// Reactive state for user input, chat messages, and loading indicator
const userInput = ref('');
const messages = ref([
  { role: 'bot', text: 'Hi! How can I assist you with your health concerns today?' }
]);
const loading = ref(false);

/**
 * handleSend: send userInput to the API and display response
 */
async function handleSend() {
  // Prevent sending empty messages
  if (!userInput.value.trim()) return;

  // Capture and clear the current input
  const userText = userInput.value.trim();
  messages.value.push({ role: 'user', text: userText });
  userInput.value = '';
  loading.value = true;

  // Add placeholder for bot response
  const index = messages.value.length;
  messages.value.push({ role: 'bot', text: 'Thinking...' });

  try {
    // Call Gemini API with prompt including userText
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { parts: [
              { text: `You are a simple and friendly health assistant. The user describes a health concern. Provide a short, clear, supportive response in easy English. Encourage seeing a doctor if needed. User's message: '${userText}'` }
            ] }
        ]
      })
    });
    const data = await response.json();
    // Extract generated reply or fallback message
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      || 'Sorry, I could not generate advice at the moment.';
    // Replace placeholder with actual reply
    messages.value[index] = { role: 'bot', text: reply };
  } catch (error) {
    console.error(error);
    // On error, update placeholder with error message
    messages.value[index] = { role: 'bot', text: 'Error: failed to connect to server.' };
  } finally {
    // Reset loading state
    loading.value = false;
  }
}

/**
 * sendPreset: set input to a preset question and trigger handleSend
 * @param {string} q - preset question text
 */
function sendPreset(q) {
  userInput.value = q;
  handleSend();
}
</script>

<style scoped>
/* Page background and padding */
.chatbot-page {
  padding: 100px 20px 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

/* Intro text styling */
.intro-text {
  text-align: center;
  margin-bottom: 40px;
}
.intro-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #2c7a83;
  letter-spacing: 1px;
}
.intro-subtitle {
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Layout for preset questions and chat container */
.chatbot-layout {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: nowrap;       /* keep columns on one row */
  overflow-x: auto;       /* allow horizontal scroll if needed */
}

/* Preset questions panels */
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

/* Chat container with fixed size and scrollable messages */
.chatbot-container {
  width: 880px;
  height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 10px;
}

/* Inner chatbot styling */
.chatbot {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}

/* Messages list with vertical scroll */
.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}
.bot {
  background-color: #eef;
  margin: 8px 0;
  padding: 8px;
  border-radius: 6px;
}
.user {
  background-color: #d2f5d2;
  margin: 8px 0;
  padding: 8px;
  border-radius: 6px;
  text-align: right;
}

/* Input area styling */
.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background: white;
}
input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  margin-left: 8px;
  padding: 8px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
}
</style>
