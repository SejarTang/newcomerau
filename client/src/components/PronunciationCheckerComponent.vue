<template>
  <div class="wrapper">
    <div class="pronunciation-checker">
      <!-- Show original preset text for user reference -->
      <div class="original-text">
        <h3>Read the following text:</h3>
        <p>{{ presetText }}</p>
      </div>

      <!-- Highlighted version after speech recognition -->
      <div class="highlighted-text">
        <h3>Pronunciation Result:</h3>
        <p v-html="highlightedText"></p>
      </div>

      <!-- Controls -->
      <div class="btn-group">
        <button @click="startListening" :disabled="isListening">Start Reading</button>
        <button @click="stopListening" :disabled="!isListening">Stop Reading</button>
      </div>

      <!-- Mispronounced words -->
      <div v-if="errorWords.length > 0" class="error-words">
        <h3>Mispronounced Words:</h3>
        <p>{{ errorWords.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PronunciationChecker',
  data() {
    return {
      // The preset sentence that the user is supposed to read
      presetText: 'This is a simple sentence for pronunciation testing.',
      recognizedText: '',
      highlightedText: '',
      errorWords: [],
      isListening: false,
      recognition: null,
    };
  },
  created() {
    // Use browser speech recognition (Web Speech API)
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = true;
      this.recognition.continuous = true; // Keep listening until manually stopped

      // When recognition returns results
      this.recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(' ');

        this.recognizedText = transcript;
        this.compareWords(transcript);
      };
    } else {
      alert('Your browser does not support Speech Recognition.');
    }

    // Initialize highlightedText to raw preset text
    this.highlightedText = this.presetText;
  },
  methods: {
    // Start listening and reset previous data
    startListening() {
      this.isListening = true;
      this.errorWords = [];
      this.recognizedText = '';
      this.recognition.start();
    },
    // Stop listening and finalize results
    stopListening() {
      this.recognition.stop();
      this.isListening = false;
    },
    // Compare spoken words with preset words and highlight them
    compareWords(transcript) {
      const presetWords = this.presetText.toLowerCase().split(' ');
      const spokenWords = transcript.toLowerCase().split(' ');

      this.highlightedText = presetWords
        .map((word, idx) => {
          if (spokenWords[idx] === word) {
            return `<span style="color: green">${word}</span>`;
          } else {
            if (!this.errorWords.includes(word)) {
              this.errorWords.push(word);
            }
            return `<span style="color: red">${word}</span>`;
          }
        })
        .join(' ');
    },
  },
};
</script>

<style scoped>
/* Wrapper to center the whole component */
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;
}

/* Main container */
.pronunciation-checker {
  max-width: 700px;
  width: 100%;
  text-align: center;
}

/* Original reference text */
.original-text {
  margin-bottom: 40px;
}

/* Recognition result highlight */
.highlighted-text {
  margin-bottom: 20px;
}

/* Button group spacing */
.btn-group {
  margin: 20px 0;
}

/* Styled buttons */
button {
  padding: 8px 16px;
  margin: 0 10px;
  cursor: pointer;
}

/* Display of mispronounced words */
.error-words {
  margin-top: 20px;
  color: red;
}
</style>
