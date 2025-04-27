<template>
  <div class="upload-ocr">
    <h2>OCR Analysis - Upload Image</h2>

    <!-- Image upload form -->
    <input type="file" @change="handleFileChange" accept="image/*" />

    <button @click="uploadImage" :disabled="!selectedImage">
      Upload and Recognize
    </button>

    <div v-if="words.length">
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

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedImage: null,  // Selected image file
      words: []             // Word information returned from backend
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedImage = event.target.files[0];
    },
    async uploadImage() {
      if (!this.selectedImage) {
        alert('Please select an image first!');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.selectedImage);

      try {
        const response = await axios.post('/api/ocr/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        this.words = response.data.words; // Backend returns { words: [...] }
      } catch (error) {
        console.error('Upload or recognition failed:', error);
        alert('Upload or recognition failed. Please try again later.');
      }
    }
  }
}
</script>

<style scoped>
.upload-ocr {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.upload-ocr input[type="file"] {
  margin-bottom: 15px;
}

.upload-ocr button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.upload-ocr button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
