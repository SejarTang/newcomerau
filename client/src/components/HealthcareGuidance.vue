<template>
  <div class="healthcare-page">
    <div class="healthcare-container">

      <!-- Left side: Image section -->
      <div class="image-section">
        <img src="@/assets/health.jpg" alt="Healthcare" />
      </div>

      <!-- Right side: Content section -->
      <div class="content-section">
        <h1>Healthcare Guidance</h1>
        <p class="subtitle">
          This page is for reference only.<br />
          In an emergency, please call 000 immediately.
        </p>

        <transition name="fade" mode="out-in">
          <div class="content" :key="currentStepKey">

            <!-- Dynamic question or description -->
            <p class="description" v-html="currentStep.text"></p>

            <!-- If remedies exist, show home care suggestions -->
            <div v-if="currentStep.remedies" class="remedies">
              <h3>Common Home Care Suggestions:</h3>
              <ul>
                <li v-for="(item, index) in currentStep.remedies" :key="index">{{ item }}</li>
              </ul>
            </div>

            <!-- Yes / No options -->
            <div class="buttons">
              <button
                v-for="(option, index) in sortedOptions"
                :key="index"
                :class="['option-button', option.label === 'Yes' ? 'yes' : 'no', { active: selectedOptionIndex === index }]"
                @click="handleOptionClick(index, option.next)"
              >
                {{ option.label }}
              </button>

              <!-- Go back button -->
              <button v-if="history.length" class="back-button" @click="goBack">
                Back
              </button>
            </div>

            <!-- External helpful links -->
            <div v-if="currentStep.link" class="link-section">
              <a :href="currentStep.link.url" target="_blank">{{ currentStep.link.text }}</a>
            </div>

          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Define conversation steps
const steps = {
  start: {
    text: "Welcome to the Healthcare Service Guide!\n\nIn Australia, different health conditions require different treatments, such as self-care, seeing a doctor, or calling an ambulance.<br><span class='question-highlight'>Do you currently have any health concerns?</span>",
    options: [
      { label: "Yes", next: "needHospital" },
      { label: "No", next: "healthyBlessing" },
    ],
  },
  healthyBlessing: {
    text: "Wishing you good health! If you need assistance in the future, feel free to refer to this guide.",
    options: [{ label: "Finish", next: "finish" }],
  },
  needHospital: {
    text: "Do you think you need to see a doctor?",
    options: [
      { label: "Yes", next: "emergencyCheck" },
      { label: "No", next: "selfCare" },
    ],
  },
  selfCare: {
    text: "Common Self-Care Suggestions:",
    remedies: [
      "Mild cold: Drink plenty of water, rest well, and take Paracetamol if needed.",
      "Sore throat: Drink warm water or honey water, avoid spicy foods, see a doctor if severe.",
      "Minor cuts: Clean with saline solution, disinfect, and cover with a bandage.",
      "Mild heatstroke: Move to a cool place, hydrate, and apply a cold compress.",
      "Hay fever: Use antihistamines, wear a mask and sunglasses outdoors.",
      "Insect bites: Ice compress to relieve itching, avoid scratching.",
      "Minor skin rashes: Keep the skin dry, apply gentle skincare cream.",
      "Sunburn: Apply aloe vera, stay away from sunlight.",
      "Sprains: Follow R.I.C.E method (Rest, Ice, Compression, Elevation).",
      "Athlete's foot: Use antifungal cream, keep feet dry.",
      "Mild allergies: Take antihistamines, call 000 if breathing difficulty."
    ],
    options: [{ label: "Finish", next: "finish" }],
  },
  emergencyCheck: {
    text: "Is this an emergency? (e.g., severe bleeding, chest pain, difficulty breathing)",
    options: [
      { label: "Yes", next: "emergencyCall" },
      { label: "No", next: "findHospital" },
    ],
  },
  emergencyCall: {
    text: "Please call 000 immediately for an ambulance. Provide your location and describe symptoms clearly.",
    options: [{ label: "Finish", next: "finish" }],
  },
  findHospital: {
    text: "Find a nearby clinic using HotDoc platform for availability, specialties, and patient reviews.",
    link: { url: "https://www.hotdoc.com.au/", text: "Find a clinic via HotDoc" },
    options: [{ label: "Clinic found", next: "needInterpreter" }],
  },
  needInterpreter: {
    text: "Need language assistance? TIS National provides free interpreters for healthcare appointments in Australia.",
    options: [
      { label: "Yes", next: "getInterpreterInfo" },
      { label: "No", next: "gpAppointment" },
    ],
  },
  getInterpreterInfo: {
    text: "Call 131 450 to request a medical interpreter when making your appointment.",
    options: [{ label: "Understood, proceed to book GP", next: "gpAppointment" }],
  },
  gpAppointment: {
    text: "Book a GP (General Practitioner) for initial medical care, health checks, or specialist referrals.",
    link: { url: "https://www.hotdoc.com.au/", text: "Book a GP via HotDoc" },
    options: [{ label: "Appointment booked", next: "afterGPVisit" }],
  },
  afterGPVisit: {
    text: "What did the GP recommend?",
    options: [
      { label: "Referral to a specialist", next: "getReferral" },
      { label: "Issue managed", next: "diagnosis" },
    ],
  },
  getReferral: {
    text: "The GP has issued a Referral Letter. Please keep it safe and proceed to book a specialist.",
    options: [{ label: "Book Specialist", next: "specialistAppointment" }],
  },
  specialistAppointment: {
    text: "Search for a specialist via HotDoc, HealthShare, or call the clinic directly.",
    link: { url: "https://www.hotdoc.com.au/specialists", text: "Find a specialist via HotDoc" },
    options: [{ label: "Specialist appointment completed", next: "discharge" }],
  },
  diagnosis: {
    text: "Follow your GP's advice for recovery or arrange any necessary follow-ups.",
    options: [{ label: "Got it", next: "discharge" }],
  },
  discharge: {
    text: "Congratulations! You have completed your medical visit.\n\nPlease request a Discharge Summary for future reference.",
    options: [{ label: "Continue", next: "haveInsurance" }],
  },
  haveInsurance: {
    text: "Do you have health insurance to help cover costs?",
    options: [
      { label: "Yes", next: "insuranceType" },
      { label: "No", next: "payFull" },
    ],
  },
  payFull: {
    text: "Without insurance (Medicare/private), you may need to pay the full cost at discharge.",
    options: [{ label: "Finish", next: "finish" }],
  },
  insuranceType: {
    text: "Which type of insurance do you have?",
    options: [
      { label: "Medicare", next: "bulkBill" },
      { label: "Private Insurance", next: "privateClaim" },
    ],
  },
  bulkBill: {
    text: "If bulk billing applies, Medicare covers the cost directly. Carry your Medicare card.",
    options: [{ label: "Finish", next: "finish" }],
  },
  privateClaim: {
    text: "Private insurance can reimburse your visit costs. Keep all receipts and medical summaries for claim.",
    options: [{ label: "Finish", next: "finish" }],
  },
  // ⭐ NEW: Final page
  finish: {
    text: "You have completed the healthcare guidance!\n\nTake care and stay healthy. If you ever need assistance again, feel free to revisit this guide!",
    options: [],
  },
}


// State management
const currentStepKey = ref('start')
const currentStep = ref(steps.start)
const history = ref([])
const selectedOptionIndex = ref(null)

// Sort options to make "Yes" button always appear first
const sortedOptions = computed(() => {
  if (!currentStep.value.options) return []
  return [...currentStep.value.options].sort((a) => (a.label === 'Yes' ? -1 : 1))
})

// Handle clicking an option
function handleOptionClick(index, nextKey) {
  selectedOptionIndex.value = index
  setTimeout(() => {
    history.value.push(currentStepKey.value)
    currentStepKey.value = nextKey
    currentStep.value = steps[nextKey]
    selectedOptionIndex.value = null
  }, 300)
}

// Handle going back to previous step
function goBack() {
  const prevStep = history.value.pop()
  if (prevStep) {
    currentStepKey.value = prevStep
    currentStep.value = steps[prevStep]
    selectedOptionIndex.value = null
  }
}
</script>


<style scoped>
/* Full page background */
.healthcare-page {
  width: 100%;
  min-height: 100vh;
  padding: 100px 20px 40px;
  background-color: #f9fbfd;
  box-sizing: border-box;
}

/* Layout container for image and content */
.healthcare-container {
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  align-items: stretch;
  gap: 0;
}

/* Left side: image block */
.image-section {
  flex: 1 1 60%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  height: 700px;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

/* Right side: text block */
.content-section {
  flex: 1 1 55%;
  background: #e9f4fc;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

/* Main heading */
h1 {
  font-size: 40px;
  margin-bottom: 8px;
  color: #004ba0;
  font-weight: bold;
  text-align: left;
}

/* Subtitle under heading */
.subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  text-align: left;
  line-height: 1.6;
}

/* Normal description text */
.content-section p {
  font-size: 20px;
  color: #444;
  margin-bottom: 25px;
  line-height: 1.7;
  text-align: left;
}

/* Highlighted main question */
.question-highlight {
  display: block;
  background: #d0e7ff;
  padding: 20px 25px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #222;
  margin: 30px 0 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #b0d4f1;
}

/* Buttons container */
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  width: 100%;
}

/* Yes/No buttons */
.option-button {
  padding: 22px 100px;
  font-size: 22px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.option-button.yes {
  background-color: #4caf50;
  color: white;
}

.option-button.no {
  background-color: #b0bec5;
  color: white;
}

.option-button.active {
  outline: 3px solid #1976d2;
}

.option-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  opacity: 0.95;
}

/* Back button */
.back-button {
  margin-top: 20px;
  padding: 14px 30px;
  font-size: 18px;
  background: #9e9e9e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease, transform 0.3s ease;
}

.back-button:hover {
  transform: scale(1.03);
  opacity: 0.95;
}

/* Links (like HotDoc) */
.link-section {
  margin-top: 24px;
  text-align: left;
}

.link-section a {
  color: #1976d2;
  font-size: 18px;
  text-decoration: underline;
}

/* Remedies suggestions area */
.remedies {
  margin-top: 20px;
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  color: #333;
  text-align: left;
}

/* Fade transition for step changes */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive (for mobile) */
@media (max-width: 768px) {
  .healthcare-container {
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  align-items: flex-start;
  gap: 0;
}
  .image-section, .content-section {
    width: 100%;
    max-width: 600px;
  }
  .buttons {
    align-items: center;
  }
  .option-button, .back-button {
    width: 100%;
    text-align: center;
  }
}
</style>
