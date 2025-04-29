<template>
  <div class="chatbot">
    <div class="messages">
      <div v-for="(msg, idx) in messages" :key="idx" :class="msg.role">
        {{ msg.text }}
      </div>
    </div>

    <div class="input-area">
      <input
        v-model="userInput"
        @keyup.enter="handleSend"
        :disabled="loading"
        placeholder="Describe your health concern..."
      />
      <button @click="handleSend" :disabled="loading || !userInput.trim()">
        {{ loading ? "Thinking..." : "Send" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// === Gemini API Configuration ===
const API_KEY = 'AIzaSyC8rIwKzh7J5DlL0XiWuKG-dzYQzclg5xI'; // API KEY
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const userInput = ref('');
const messages = ref([
  { role: 'bot', text: 'Hi! How can I assist you with your health concerns today?' }
]);
const loading = ref(false);
const pendingReplyIndex = ref(null);

// === Chatting logic for sending messages===
async function handleSend() {
  if (!userInput.value.trim()) return;

  const userText = userInput.value.trim();
  messages.value.push({ role: 'user', text: userText });
  userInput.value = '';
  loading.value = true;
  pendingReplyIndex.value = null;

  try {
    pendingReplyIndex.value = messages.value.length;
    messages.value.push({ role: 'bot', text: 'Thinking...' });

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `
You are a simple and friendly health assistant.
The user describes a health concern. Provide a short, clear, supportive response in easy English.
Encourage seeing a doctor if needed.

User's message: '${userText}'
            `.trim()
          }]
        }]
      })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Sorry, I could not generate advice at the moment.';

    messages.value[pendingReplyIndex.value] = { role: 'bot', text: reply };

  } catch (error) {
    console.error(error);
    if (pendingReplyIndex.value !== null) {
      messages.value[pendingReplyIndex.value] = { role: 'bot', text: 'Error: failed to connect to server.' };
    }
  } finally {
    loading.value = false;
    pendingReplyIndex.value = null;
  }
}

// === External call, sending preset questions ===
function receivePreset(presetText) {
  userInput.value = presetText;
  handleSend();
}

// Expose the method for the parent component to call
defineExpose({ receivePreset });
</script>

<style scoped>
.chatbot {
  width: 880px;
  height: 600px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}

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
