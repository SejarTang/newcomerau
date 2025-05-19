<template>
  <div class="symptom-checker">
    <h1>Symptom Checker</h1>

    <!-- Description Section -->
    <div class="description-section">
      <h2>About This Tool</h2>
      <p>
        This symptom checker is designed to help you assess your health condition based on your reported symptoms.
        It will guide you through a series of questions about your health background and current symptoms to provide
        appropriate medical advice.
      </p>
      <p>
        <strong>Important Note:</strong> This tool is for informational purposes only and is not a substitute for
        professional medical advice. If you are experiencing severe symptoms or a medical emergency, please call 000
        immediately or visit your nearest emergency department.
      </p>
      <div class="disclaimer">
        <p>
          <i class="fas fa-info-circle"></i>
          The results provided are based on common flu-like symptoms and should be used as a general guide only.
          Always consult with a healthcare professional for proper diagnosis and treatment.
        </p>
      </div>
    </div>

    <!-- Basic Information -->
    <div class="section">
      <h2>Basic Information</h2>
      <div class="form-group">
        <label>How old are you?</label>
        <input
          type="number"
          v-model="age"
          min="0"
          max="120"
          @input="validateAge"
          :class="{ 'error': ageError }"
        >
        <span v-if="ageError" class="error-message">{{ ageError }}</span>
      </div>

      <div class="form-group">
        <label>Please choose your gender:</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="gender" value="female"> Female
          </label>
          <label>
            <input type="radio" v-model="gender" value="male"> Male
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>Which suburb are you in? (Postcode)</label>
        <input
          type="text"
          v-model="postcode"
          pattern="[0-9]{4}"
          @input="validatePostcode"
          :class="{ 'error': postcodeError }"
          maxlength="4"
        >
        <span v-if="postcodeError" class="error-message">{{ postcodeError }}</span>
      </div>
    </div>

    <!-- Health Background -->
    <div class="section">
      <h2>Health Background</h2>
      <div v-for="(question, index) in healthBackgroundQuestions" :key="index" class="form-group">
        <label>{{ question.text }}</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="healthBackground[index]" :value="true"> Yes
          </label>
          <label>
            <input type="radio" v-model="healthBackground[index]" :value="false"> No
          </label>
        </div>
      </div>
    </div>

    <!-- Symptoms -->
    <div class="section">
      <h2>Symptoms</h2>
      <div v-for="(question, index) in symptomQuestions" :key="index" class="form-group">
        <label>{{ question.text }}</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="symptoms[index]" :value="true"> Yes
          </label>
          <label>
            <input type="radio" v-model="symptoms[index]" :value="false"> No
          </label>
        </div>
      </div>
    </div>

    <button @click="validateAndCalculate" class="submit-btn" :disabled="!isFormValid">Get Results</button>

    <!-- Results Modal -->
    <div v-if="showResults" class="modal">
      <div class="modal-content">
        <h2>{{ resultTitle }}</h2>
        <p>{{ resultMessage }}</p>
        <button @click="showResults = false" class="close-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Basic information
const age = ref('')
const gender = ref('')
const postcode = ref('')
const ageError = ref('')
const postcodeError = ref('')

// Health background questions
const healthBackgroundQuestions = [
  { text: 'Have you visited outside of Australia within the last 2 weeks?' },
  { text: 'Have you experienced any recent physical injury?' },
  { text: 'Do you currently smoke cigarettes?' },
  { text: 'Do you have a family history of allergies?' },
  { text: 'Are you currently pregnant? (if applicable)' },
  { text: 'Are you currently overweight or obese?' },
  { text: 'Have you been diagnosed with hypertension (high blood pressure)?' }
]

// Symptom questions
const symptomQuestions = [
  { text: 'Do you have a fever above 38°C (100.4°F)?' },
  { text: 'Are you experiencing a dry cough?' },
  { text: 'Do you feel very tired or weak all of a sudden?' },
  { text: 'Do you have muscle aches or body pain?' },
  { text: 'Are you experiencing chills or sweating?' },
  { text: 'Do you have a sore throat?' },
  { text: 'Are you sneezing or have a runny nose?' },
  { text: 'Do you have a headache?' },
  { text: 'Have you had trouble breathing?' },
  { text: 'Do you have a loss of appetite?' },
  { text: 'Have your symptoms appeared suddenly (within 1–2 days)?' },
  { text: 'Have you been in contact with someone who had the flu recently?' },
  { text: 'Have you had the flu vaccine this year?' },
  { text: 'Are you 65 or older, or have a chronic illness (e.g., asthma, diabetes)?' },
  { text: 'Have you experienced nausea or vomiting?' }
]

const healthBackground = ref(Array(healthBackgroundQuestions.length).fill(null))
const symptoms = ref(Array(symptomQuestions.length).fill(null))
const showResults = ref(false)
const resultTitle = ref('')
const resultMessage = ref('')

// Validation functions
const validateAge = () => {
  const ageNum = parseInt(age.value)
  if (!age.value) {
    ageError.value = 'Please enter your age'
  } else if (isNaN(ageNum)) {
    ageError.value = 'Please enter a valid number'
  } else if (ageNum < 0 || ageNum > 120) {
    ageError.value = 'Age must be between 0 and 120'
  } else {
    ageError.value = ''
  }
}

const validatePostcode = () => {
  if (!postcode.value) {
    postcodeError.value = 'Please enter your postcode'
  } else if (!/^\d{4}$/.test(postcode.value)) {
    postcodeError.value = 'Postcode must be 4 digits'
  } else {
    postcodeError.value = ''
  }
}

// Form validation
const isFormValid = computed(() => {
  return !ageError.value &&
         !postcodeError.value &&
         age.value &&
         postcode.value &&
         gender.value &&
         healthBackground.value.every(answer => answer !== null) &&
         symptoms.value.every(answer => answer !== null)
})

const validateAndCalculate = () => {
  validateAge()
  validatePostcode()

  if (isFormValid.value) {
    calculateResult()
  }
}

const calculateResult = () => {
  const yesCount = symptoms.value.filter(answer => answer === true).length

  if (yesCount >= 12) {
    resultTitle.value = 'Emergency Alert'
    resultMessage.value = 'Please call 000\n\nWhat You Should Do\nBased on the symptoms you\'ve reported, you should immediately call Triple Zero (000) and request an ambulance.\nIf you\'re calling from a mobile phone, you can also dial 112.'
  } else if (yesCount >= 10) {
    resultTitle.value = 'Urgent Medical Attention Required'
    resultMessage.value = 'You likely have flu symptoms. Please contact a doctor immediately.'
  } else if (yesCount >= 5) {
    resultTitle.value = 'Possible Flu Symptoms'
    resultMessage.value = 'You may have the flu. Consider seeing a GP or resting at home.'
  } else {
    resultTitle.value = 'Monitor Your Symptoms'
    resultMessage.value = 'Your symptoms may not match typical flu signs. Monitor closely.'
  }

  showResults.value = true
}
</script>

<style scoped>
/* Main container for the Symptom Checker page */
.symptom-checker {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Page title */
h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 2.2rem;
  margin-bottom: 40px;
}

/* Section headings */
h2 {
  color: #34495e;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

/* Description block styling */
.description-section {
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 40px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.description-section p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

/* Info alert box inside the description */
.disclaimer {
  background-color: #e3f2fd;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
  border-left: 4px solid #2196f3;
}

.disclaimer p {
  margin: 0;
  color: #0d47a1;
  font-size: 0.95rem;
}

/* General section block */
.section {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 40px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

/* Form group block */
.form-group {
  margin-bottom: 25px;
}

/* Label text */
label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

/* Input fields */
input[type="number"],
input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  margin-top: 4px;
  transition: border-color 0.3s ease;
}

/* Focus state for inputs */
input[type="number"]:focus,
input[type="text"]:focus {
  border-color: #3a91e7;
  outline: none;
}

/* Error input border */
input.error {
  border-color: #f44336;
}

/* Error message text */
.error-message {
  color: #f44336;
  font-size: 0.9em;
  margin-top: 5px;
}

/* Radio button group layout */
.radio-group {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 10px;
}

/* Submit button styling */
.submit-btn {
  display: block;
  margin: 0 auto;
  background-color: #3a91e7;
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Disabled state for submit button */
.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Hover effect for active submit button */
.submit-btn:hover:not(:disabled) {
  background-color: #2c6ecf;
  transform: scale(1.02);
}

/* Modal overlay */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal content box */
.modal-content {
  background-color: white;
  padding: 35px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Close button inside modal */
.close-btn {
  margin-top: 25px;
  padding: 10px 22px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

/* Hover effect for modal close button */
.close-btn:hover {
  background-color: #d32f2f;
}

/* ===== Centered Content Adjustments for Basic Information & Symptoms ===== */

/* Only apply to sections with class center-content */
.center-content .form-group {
  display: flex;
  flex-direction: column;
  align-items: center; /* Horizontally center all fields */
  text-align: center;
  width: 100%;
}

/* Center labels */
.center-content label {
  text-align: center;
}

/* Limit input field width when centered */
.center-content input[type="number"],
.center-content input[type="text"] {
  max-width: 300px;
  width: 100%;
}

/* Center the radio buttons inside those sections */
.center-content .radio-group {
  justify-content: center;
}
</style>
