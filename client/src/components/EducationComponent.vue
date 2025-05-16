<template>
  <div class="education-container">
    <div class="hero-section">
      <h1 class="welcome-message">EDUCATION IN AUSTRALIA – WHAT IMMIGRANTS NEED TO KNOW</h1>
      <div class="image-container">
        <img src="@/assets/education-hero.jpg" alt="Smiling multicultural children in school uniform" />
        <div class="text-overlay">
          <p>Explore Australia's Education System – From Pre-School to University</p>
        </div>
      </div>
    </div>

    <div class="navigation-tabs">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index" 
        @click="activeTab = tab.id"
        :class="{ active: activeTab === tab.id }"
        class="tab-button"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span>{{ tab.name }}</span>
      </button>
    </div>

    <div class="content-section">
      <!-- For Children Section -->
      <div v-if="activeTab === 'children'" class="tab-content">
        <h2>For Children</h2>
        <p>Education is compulsory from age 6 to 17 in Australia. Most children start school around age 5 in Foundation/Prep. Schools are free in the public system, and you can choose from government (public), Catholic, or independent (private) schools.</p>
        
        <div class="education-cards">
          <div class="education-card">
            <h3>The Australian education system is broadly structured as follows:</h3>
            <ol>
              <li>Primary school: seven or eight years, starting at Foundation (also called kindergarten/preparatory/pre-school) through to Year 6 or 7</li>
              <li>Secondary school: four years from Years 7 or 8 to 10</li>
              <li>Senior secondary school: two years from Years 11 to 12</li>
            </ol>
            <p>For more information about school near you in Victoria please visit our <router-link to="/healthcare#medical-map">map</router-link></p>
          </div>
        </div>
        
        <p class="highlight-text">Finishing Year 12 earns a certificate that can lead to university or vocational training.</p>
      </div>

      <!-- For Adults Section -->
      <div v-else-if="activeTab === 'adults'" class="tab-content">
        <h2>Education for Adults and Parents</h2>
        <p>Adults can study English, get job training (VET), or attend university. Courses are available for all skill levels, and some are government-funded or discounted for permanent residents.</p>
        
        <div class="info-cards">
          <div class="info-card">
            <h3>Learn English</h3>
            <p>Free or low-cost classes (AMEP program)</p>
          </div>
          <div class="info-card">
            <h3>TAFE / VET</h3>
            <p>Learn a trade or skill (e.g., cooking, aged care, IT)</p>
          </div>
          <div class="info-card">
            <h3>University</h3>
            <p>Degrees, diplomas, and flexible online options</p>
          </div>
        </div>
        
        <p>For more information about school near you in Victoria please visit our <router-link to="/healthcare#medical-map">map</router-link></p>
      </div>

      <!-- Fees & Support Section -->
      <div v-else-if="activeTab === 'fees'" class="tab-content">
        <h2>Fees, Help and Support</h2>
        <p>Public school is usually free or low-cost, but private schools charge fees. Free support is often available for:</p>
        <ul>
          <li>Newly arrived refugees</li>
          <li>Families on low income</li>
          <li>Learning English (AMEP)</li>
          <li>Enrolment translation help</li>
        </ul>
      </div>

      <!-- Enrolment Steps Section -->
      <div v-else-if="activeTab === 'enrolment'" class="tab-content">
        <h2>How to enrol?</h2>
        <div class="enrolment-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-text">Find local schools or courses</div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-text">Check visa type and eligibility</div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-text">Gather documents (proof of address, ID, visa)</div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-text">Contact the school or enrol online</div>
          </div>
          <div class="step">
            <div class="step-number">5</div>
            <div class="step-text">Ask for an interpreter if needed</div>
          </div>
        </div>
        <p class="tip">📍 Tip: Schools must accept enrolment if you live in their zone (for public schools).</p>
      </div>

      <!-- Education Pathway Section -->
      <div v-else-if="activeTab === 'pathway'" class="tab-content">
        <h2>Education pathway overview</h2>
        <div class="education-system-image">
          <img src="@/assets/education_system.jpg" alt="Australian Education System Pathway" />
        </div>
        
        <h3>Who runs education in Australia</h3>
        <p>Education in Australia is a shared responsibility between the Federal Government and each of the State and Territory Governments. While the Australian Government provides major funding and policy leadership, the States and Territories manage the operation of most education services, especially government schools.</p>
        
        <div class="responsibility-table">
          <div class="table-column">
            <h4>Federal Government (Commonwealth)</h4>
            <ul>
              <li>Funds non-government schools</li>
              <li>Provides some funding to government schools</li>
              <li>Regulates international student programs (ESOS)</li>
              <li>Oversees quality in early childhood education</li>
              <li>Leads national education strategy (e.g. MySchool)</li>
            </ul>
          </div>
          <div class="table-column">
            <h4>State/Territory Governments</h4>
            <ul>
              <li>Operates public (government) schools</li>
              <li>Funds infrastructure and teacher salaries</li>
              <li>Regulates curriculum, accreditation, exams</li>
              <li>Administers and runs early learning centres</li>
              <li>Sets local policy and runs day-to-day systems</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Q&A Section -->
      <div v-else-if="activeTab === 'qa'" class="tab-content">
        <h2>Frequently Asked Questions (FAQ)</h2>
        
        <div class="faq-filter">
          <button 
            v-for="(category, index) in faqCategories" 
            :key="index"
            @click="activeFaqCategory = category.id"
            :class="{ active: activeFaqCategory === category.id }"
            class="category-button"
          >
            {{ category.name }}
          </button>
        </div>
        
        <div class="faq-list">
          <div 
            v-for="(faq, index) in filteredFaqs" 
            :key="index"
            class="faq-item"
          >
            <div 
              class="faq-question" 
              @click="toggleFaq(index)"
              :class="{ active: openFaqs.includes(index) }"
            >
              <span>{{ faq.question }}</span>
              <span class="faq-toggle">{{ openFaqs.includes(index) ? '−' : '+' }}</span>
            </div>
            <div 
              class="faq-answer"
              :class="{ active: openFaqs.includes(index) }"
            >
              <p v-html="faq.answer"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EducationComponent',
  data() {
    return {
      activeTab: 'children',
      activeFaqCategory: 'general',
      openFaqs: [],
      tabs: [
        { id: 'children', name: 'For Children', icon: '🧒' },
        { id: 'adults', name: 'For Adults', icon: '👨‍🎓' },
        { id: 'fees', name: 'Fees & Support', icon: '💰' },
        { id: 'enrolment', name: 'Enrolment Steps', icon: '📜' },
        { id: 'pathway', name: 'Education Pathway', icon: '🗺️' },
        { id: 'qa', name: 'Q&A', icon: 'Q&A' }
      ],
      faqCategories: [
        { id: 'general', name: 'General' },
        { id: 'parents', name: 'For Parents and Students' },
        { id: 'adults', name: 'For Adults' }
      ],
      faqs: [
        {
          category: 'general',
          question: 'Is school free in Australia?',
          answer: 'Education at public (government) schools is free for Australian citizens and most permanent residents. However, families may be asked to pay voluntary contributions and cover costs such as school uniforms, stationery, excursions (school trips), and extra-curricular activities.<br><br>For international students or those on temporary visas, school fees may apply depending on the visa subclass and the state or territory—check with the relevant education department.'
        },
        {
          category: 'general',
          question: 'When must children start school?',
          answer: 'All children must start school by the age of six. Most children begin earlier, enrolling in Foundation or Prep (the first year of primary school) between the ages of 4.5 and 5.5. Pre-school or kindergarten (for ages 3–5) is available before formal schooling and is highly recommended for early development.'
        },
        {
          category: 'general',
          question: 'What is the school year in Australia?',
          answer: 'The Australian school year runs from late January or early February to mid-December. It is divided into two terms, with holiday breaks in between.<br>Term 1: February<br>Term 2: July'
        },
        {
          category: 'general',
          question: "Can I enrol my child if I'm on a temporary visa?",
          answer: 'Yes, but you must check the visa conditions. Some visa types require payment of international student fees (which can range from $5,000 to $15,000+ per year).<br><br>In some cases (e.g., humanitarian or bridging visas), children may access public schools with little or no fees. Always check with the state education authority (e.g., Victorian Department of Education) to confirm.'
        },
        {
          category: 'general',
          question: 'What are the school hours in Australia?',
          answer: 'Most primary and secondary schools operate Monday to Friday, from approximately 8:45 AM to 3:15 PM.<br><br>Before-school and after-school care (Out of School Hours Care) is often available for working parents, but may incur extra costs.'
        },
        {
          category: 'parents',
          question: 'What is the difference between public, Catholic, and private schools?',
          answer: 'Public (Government) Schools: Run by state or territory governments. They are low-cost and offer inclusive education.<br>Catholic Schools: Faith-based schools with moderate fees, often welcoming students of all backgrounds.<br>Independent/Private Schools: Privately funded with higher fees, offering various educational approaches and facilities.<br><br>All schools follow the Australian Curriculum, but their values, teaching methods, and facilities can vary.'
        },
        {
          category: 'parents',
          question: "Can my child get help if they don't speak English well?",
          answer: 'Yes. Many schools offer EAL (English as an Additional Language) support programs. These programs help children improve their English skills while continuing their regular subjects. Some states also have intensive language centres for newly arrived students.'
        },
        {
          category: 'parents',
          question: 'How do I enrol my child in school?',
          answer: 'Find your local school (for public schools, this is usually based on your home address).<br>Contact the school directly or visit the Department of Education website for your state.<br>Provide necessary documents: passport, visa, proof of address, immunisation record, and previous school reports (if available).<br>You can ask for translation or interpreting services during enrolment.<br>Once accepted, the school will confirm start dates and orientation details.'
        },
        {
          category: 'parents',
          question: 'Will my child need a school uniform?',
          answer: 'Yes, most schools in Australia (especially public and Catholic schools) require students to wear a school uniform. The school will provide a list of required clothing. Uniforms may include shirts, dresses, pants, hats, and shoes. Financial assistance may be available for low-income families.'
        },
        {
          category: 'parents',
          question: 'Can I visit the school before enrolling?',
          answer: 'Absolutely. Many schools offer school tours or open days where you can meet teachers, ask questions, and see classrooms. Booking a visit helps you feel more confident and ensures the school is a good fit for your child.'
        },
        {
          category: 'adults',
          question: 'Can I study as an adult in Australia?',
          answer: 'Yes. Adults can enrol in a range of programs, such as:<br>English language courses (e.g., AMEP for eligible migrants)<br>TAFE or VET programs to gain job skills or trade qualifications<br>University for higher education degrees<br><br>Many programs are flexible, offered part-time or online, and can be accessed by residents and, in some cases, temporary visa holders.'
        },
        {
          category: 'adults',
          question: 'Is there support for learning English?',
          answer: 'Yes. The Adult Migrant English Program (AMEP) provides up to 510 hours of free English lessons to eligible migrants and refugees. Classes focus on everyday language, job preparation, and community engagement.<br>You can learn in classrooms, online, or with a volunteer tutor.'
        },
        {
          category: 'adults',
          question: 'What is TAFE?',
          answer: 'TAFE (Technical and Further Education) institutions offer practical, job-oriented training. Courses range from Certificate I to Diploma level in areas like hospitality, aged care, building, IT, and more.<br>Many TAFE courses provide a pathway to university and may include work placements.'
        },
        {
          category: 'adults',
          question: 'Do I need qualifications to enter university?',
          answer: 'Typically, universities require a Year 12 completion (ATAR) or an equivalent qualification. However, many offer alternative pathways for adult learners, including:<br>VET diplomas or certificates<br>Bridging courses<br>Recognition of prior learning or experience<br>Mature-age entry exams or interviews'
        },
        {
          category: 'adults',
          question: 'Can I get financial help for study?',
          answer: 'If you are a permanent resident or citizen, you may be eligible for government support:<br>HECS-HELP or FEE-HELP loans for university students<br>Skills First and Free TAFE initiatives (in some states like Victoria)<br>Temporary visa holders may not be eligible, but some scholarships or local supports may apply.'
        }
      ]
    };
  },
  computed: {
    filteredFaqs() {
      return this.faqs.filter(faq => faq.category === this.activeFaqCategory);
    }
  },
  methods: {
    toggleFaq(index) {
      if (this.openFaqs.includes(index)) {
        this.openFaqs = this.openFaqs.filter(i => i !== index);
      } else {
        this.openFaqs.push(index);
      }
    }
  }
};
</script>

<style scoped>
.education-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  margin-top: 80px;
}

.hero-section {
  text-align: center;
  margin-bottom: 30px;
}

.welcome-message {
  font-size: 28px;
  margin-bottom: 20px;
  color: #0055a5;
}

.image-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 15px;
}

.text-overlay p {
  font-size: 20px;
  margin: 0;
}

.navigation-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.tab-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button.active {
  background-color: #0055a5;
  color: white;
}

.tab-icon {
  font-size: 22px;
  margin-bottom: 5px;
}

.content-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tab-content {
  animation: fadeIn 0.5s;
}

.education-cards, .info-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.education-card, .info-card {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.highlight-text {
  font-size: 18px;
  font-weight: bold;
  color: #0055a5;
  text-align: center;
  margin: 20px 0;
}

.enrolment-steps {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.step {
  display: flex;
  align-items: center;
  gap: 15px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #0055a5;
  color: white;
  border-radius: 50%;
  font-weight: bold;
}

.tip {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff9e6;
  border-left: 4px solid #ffd966;
  font-style: italic;
}

.education-system-image {
  margin: 20px 0;
  text-align: center;
}

.education-system-image img {
  max-width: 100%;
  border-radius: 8px;
}

.responsibility-table {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.table-column {
  flex: 1;
  min-width: 300px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.faq-filter {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.category-button {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.category-button.active {
  background-color: #0055a5;
  color: white;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.faq-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f5f5f5;
  cursor: pointer;
  font-weight: bold;
}

.faq-question.active {
  background-color: #e6f0ff;
}

.faq-toggle {
  font-size: 20px;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.active {
  max-height: 500px;
  padding: 15px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .navigation-tabs {
    flex-direction: column;
  }
  
  .tab-button {
    width: 100%;
  }
  
  .education-cards, .info-cards, .responsibility-table {
    flex-direction: column;
  }
}
</style>
