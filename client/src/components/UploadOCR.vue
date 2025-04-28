<template>
  <div class="upload-ocr-card">
    <h2 class="intro-title">OCR Analysis - Discover Everyday Words Around You!</h2>
    <p class="intro-description">Upload or select an image to recognize words and learn their meanings, pronunciations, and examples!</p>

    <div class="preset-container">
      <div class="preset-images">
        <img v-for="(img, idx) in presetImages.slice(0, 3)" :key="'left-'+idx" :src="img" @click="selectPreset(img)" class="preset-image" />
      </div>

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

        <div v-if="loading" class="loading-text">
          Analyzing image, please wait...
        </div>
      </div>

      <div class="preset-images">
        <img v-for="(img, idx) in presetImages.slice(3, 6)" :key="'right-'+idx" :src="img" @click="selectPreset(img)" class="preset-image" />
      </div>
    </div>

    <div v-if="words.length" class="result-area">
      <h3>Recognized Words:</h3>
      <ul>
        <li v-for="(item, index) in words" :key="index">
          <div><strong>{{ item.word }}</strong> <span v-if="item.phonetic">({{ item.phonetic }})</span></div>
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

const selectedImage = ref(null);
const previewUrl = ref('');
const words = ref([]);
const loading = ref(false);

const presetImages = [
  new URL('@/assets/ocr/ocrtest1.png', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest2.png', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest3.png', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest4.png', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest5.png', import.meta.url).href,
  new URL('@/assets/ocr/ocrtest6.png', import.meta.url).href,
];

function handleFileChange(event) {
  selectedImage.value = event.target.files[0];
  previewUrl.value = URL.createObjectURL(selectedImage.value);
}

async function uploadImage() {
  if (!selectedImage.value) {
    alert('Please select an image first!');
    return;
  }
  loading.value = true;
  const formData = new FormData();
  formData.append('image', selectedImage.value);

  try {
    const response = await axios.post('/api/ocr/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    words.value = response.data.words;
  } catch (error) {
    console.error('Upload or recognition failed:', error);
    alert('Upload or recognition failed. Please try again later.');
  } finally {
    loading.value = false;
  }
}

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
</script>

<style scoped>
.upload-ocr-card {
  margin-top: 100px;
  margin-bottom: 50px;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.intro-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.intro-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
}

.preset-container {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.preset-images {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preset-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.preset-image:hover {
  transform: scale(1.05);
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.preview-box {
  width: 250px;
  height: 250px;
  background: #eee;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preview-placeholder {
  color: #777;
  font-size: 14px;
  padding: 10px;
  text-align: center;
}

.file-upload {
  display: inline-block;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
}

.file-upload input[type="file"] {
  display: none;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading-text {
  margin-top: 10px;
  font-weight: bold;
  color: #42b983;
}

.result-area {
  margin-top: 30px;
  text-align: left;
}
</style>
