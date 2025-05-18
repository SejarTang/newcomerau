<template>
  <div class="upload-ocr-card">
    <h2 class="intro-title">OCR Analysis - Discover Everyday Words Around You!</h2>
    <p class="intro-description">
      Upload or select an image to recognize words<br />
      and learn their meanings, pronunciations, and examples!<br />
      Please do not upload images more than 1MB.
    </p>

    <!-- Preset Images -->
    <div class="preset-container">
      <div class="preset-images">
        <img
          v-for="(img, idx) in presetImages.slice(0, 3)"
          :key="'left-'+idx"
          :src="img"
          @click="selectPreset(img)"
          class="preset-image"
        />
      </div>

      <!-- Upload Section -->
      <div class="upload-area">
        <div class="preview-box">
          <img v-if="previewUrl" :src="previewUrl" class="preview-image" />
          <div v-else class="preview-placeholder">Your uploaded image will appear here.</div>
        </div>

        <label class="file-upload">
          Choose File
          <input type="file" @change="handleFileChange" accept="image/*" />
        </label>

        <button @click="uploadImage" :disabled="!selectedImage || loading">
          {{ loading ? 'Analyzing...' : 'Upload and Recognize' }}
        </button>

        <div v-if="loading" class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="progress-text">{{ Math.floor(progress) }}%</div>
        </div>

        <div v-if="loading" class="loading-text">Analyzing image, please wait...</div>
      </div>

      <div class="preset-images">
        <img
          v-for="(img, idx) in presetImages.slice(3, 6)"
          :key="'right-'+idx"
          :src="img"
          @click="selectPreset(img)"
          class="preset-image"
        />
      </div>
    </div>

    <!-- Result Display -->
    <div v-if="words.length" class="result-area">
      <h3>Recognized Words:</h3>
      <ul>
        <li v-for="(item, index) in words" :key="index">
          <div>
            <strong>{{ item.original }}</strong>
            <span v-if="item.phonetic">({{ item.phonetic }})</span>
          </div>
          <div v-if="item.meaning">Meaning: {{ item.meaning }}</div>
          <div v-if="item.example">Example: {{ item.example }}</div>
          <div v-if="item.audio">
            <audio :src="item.audio" controls></audio>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Reactive states
const selectedImage = ref(null);
const previewUrl = ref('');
const words = ref([]);
const loading = ref(false);
const progress = ref(0);
let timerId = null;

// Local preset images
const presetImages = [
  new URL('@/assets/ocr/ocrtest1.png', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest2.png', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest3.png', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest4.jpg', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest5.png', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest6.png', import.meta.url).href,
];

// Extract valid words from a line of text
function extractValidWords(line) {
  return line
    .split(/[^a-zA-Z]+/)                 // Split on non-letter characters
    .map(w => w.trim())
    .filter(w => /^[a-zA-Z]{2,}$/.test(w));  // Keep 2+ letter pure words only
}

// Query dictionary API for definition, example, audio, etc.
async function fetchDictionaryInfo(wordObj) {
  try {
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordObj.word}`);
    const entry = res.data[0];
    wordObj.phonetic = entry.phonetic || '';
    wordObj.meaning = entry.meanings?.[0]?.definitions?.[0]?.definition || '';
    wordObj.example = entry.meanings?.[0]?.definitions?.[0]?.example || '';
    wordObj.audio = entry.phonetics?.find(p => p.audio)?.audio || '';
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    console.warn(`No dictionary entry for: ${wordObj.word}`);
  }
}

// Process the OCR and dictionary lookup
async function uploadImage() {
  if (!selectedImage.value) {
    alert('Please select an image first!');
    return;
  }

  loading.value = true;
  progress.value = 0;
  words.value = [];

  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    if (progress.value < 90) progress.value += Math.random() * 10;
  }, 300);

  const formData = new FormData();
  formData.append('apikey', 'K87654478888957');
  formData.append('language', 'eng');
  formData.append('isOverlayRequired', 'false');
  formData.append('file', selectedImage.value);

  try {
    const response = await axios.post('https://api.ocr.space/parse/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const rawText = response.data?.ParsedResults?.[0]?.ParsedText || '';
    const lines = rawText.split('\n');

    const allWords = [];

    for (const line of lines) {
      const validWords = extractValidWords(line);
      for (const w of validWords) {
        const lowercase = w.toLowerCase();
        if (!allWords.find(item => item.word === lowercase)) {
          allWords.push({
            word: lowercase,
            original: w
          });
        }
      }
    }

    words.value = allWords;
    await Promise.all(words.value.map(fetchDictionaryInfo));

  } catch (err) {
    console.error('OCR or dictionary lookup failed:', err);
    alert('Image analysis failed. Please try again later.');
  } finally {
    progress.value = 100;
    clearInterval(timerId);
    setTimeout(() => {
      loading.value = false;
      progress.value = 0;
    }, 500);
  }
}

// Upload and process a preset image
function selectPreset(imageUrl) {
  fetch(imageUrl)
    .then(res => res.blob())
    .then(blob => {
      selectedImage.value = new File([blob], 'preset.png', { type: blob.type });
      previewUrl.value = URL.createObjectURL(blob);
      uploadImage();
    })
    .catch(err => console.error('Failed to load preset image:', err));
}

// Handle user file selection
function handleFileChange(event) {
  selectedImage.value = event.target.files[0];
  previewUrl.value = URL.createObjectURL(selectedImage.value);
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@300;400&display=swap');

.upload-ocr-card {
  margin: 100px auto 50px;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 1900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #f9fbfd, #ffffff);
}


.intro-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 50px;
  font-weight: 700;
  color: #020a0a;
  margin-bottom: 8px;
  position: relative;
  display: inline-block;
}



.intro-description {
  font-family: 'Open Sans', sans-serif;
  font-size: 26px;
  font-weight: 400;
  color: #555;
  text-align: center;
  line-height: 1.8;
  max-width: 1200px;
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: 0.3px;
}

.preset-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  width: 100%;
  box-sizing: border-box;
}

.preset-images {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.preset-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
.preset-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.preview-box {
  width: 1000px;
  height: 950px;
  background: #f0f4f8;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px dashed #ccddef;
}
.preview-placeholder {
  font-family: 'Open Sans', sans-serif;
  font-size: 50px;
  color: #888;
  text-align: center;
  padding: 20px;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.file-upload {
  display: inline-block;
  padding: 8px 35px;
  background-color: #3498db;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 25px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: breathe 2.5s ease-in-out infinite;
}

@keyframes breathe {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
}

.file-upload input[type="file"] {
  position: absolute;
  left: 0; top: 0; width: 100%; height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-area button {
  padding: 15px 30px;
  background-color: #42b983;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
.upload-area button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.upload-area button:not(:disabled):hover {
  background-color: #37a76f;
}


.progress-container {
  width: 100%;
  max-width: 500px;
  margin-top: 10px;
  text-align: center;
}
.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}
.progress-fill {
  height: 100%;
  background: #42b983;
  transition: width 0.3s ease;
}
.progress-text {
  font-size: 14px;
  color: #555;
}

.loading-text {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #42b983;
  font-weight: 600;
}

.result-area {
  margin-top: 30px;
  width: 100%;
  max-width: 800px;
  text-align: left;
}
.result-area h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  color: #2c7a83;
  margin-bottom: 12px;
}
.result-area ul {
  list-style: none;
  padding: 0;
}
.result-area li {
  background: #f7fcff;
  border: 1px solid #def0f4;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
}
</style>
