<template>
  <!-- Fullscreen canvas for fireworks effect -->
  <canvas ref="canvasRef" class="global-fireworks"></canvas>

  <!-- Main content container for public holiday information -->
  <div class="holiday-container" ref="containerRef">
    <img src="@/assets/holiday.jpg" alt="Holiday Banner" class="holiday-banner" />

    <!-- Introduction paragraph -->
    <p class="holiday-description">
      Understanding public holidays is important for new immigrants to actively engage in community life,
      plan ahead, and connect with local traditions in Victoria.
      This table offers a simple reference to help newcomers integrate more smoothly into Australian society.
    </p>

    <!-- Section title -->
    <h1 class="holiday-title">Public holidays in Victoria for 2025</h1>

    <!-- Dynamic message for next holiday countdown -->
    <p class="next-holiday-info" v-if="daysUntilNextHolidayMessage">
      {{ daysUntilNextHolidayMessage }}
    </p>

    <!-- Public holiday table -->
    <div class="holiday-table-wrapper">
      <table class="holiday-table">
        <thead>
          <tr>
            <th>Holiday</th>
            <th>Date in 2025</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(holiday, index) in holidays" :key="index">
            <td>{{ holiday.name }}</td>
            <td>{{ holiday.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Additional holiday info paragraph -->
    <p class="holiday-extra-info">
      In Australia, there are a total of seven national public holidays that are observed by each state throughout the country.
      In addition, each state has several public holidays that are observed only within their state. Some states also have local or regional holidays that are observed by a smaller section of each state.
    </p>

    <!-- Image showing differences in holiday observation -->
    <img src="@/assets/diff.jpg" alt="Holiday Differences" class="holiday-diff-image" />
  </div>

  <!-- Calendar download section -->
  <div class="holiday-download-section">
    <p class="download-text">
      Add Victoria's 2025 public holiday dates to your device:
    </p>
    <a
      href="https://www.vic.gov.au/sites/default/files/2025-04/Victorian-public-holiday-dates.ics"
      download
      class="download-button"
      title="Download Victorian public holidays calendar"
      aria-label="Download calendar for Outlook, Google, or Apple"
    >
      📥  Click here to Download Calendar (for Outlook, Google, Apple)
    </a>
  </div>

  <!-- Explore More Button -->
<div class="explore-more-wrapper">
  <button class="explore-more-button" @click="goToHolidayCulture">Explore More</button>
</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHolidayCulture = () => {
  router.push('/integration/history');
};

// Static list of holidays for 2025 in Victoria
const holidays = [
  { name: "New Year's Day", date: 'Wednesday, 1 January' },
  { name: 'Australia Day', date: 'Monday, 27 January' },
  { name: 'Labour Day', date: 'Monday, 10 March' },
  { name: 'Good Friday', date: 'Friday, 18 April' },
  { name: 'Saturday before Easter Sunday', date: 'Saturday, 19 April' },
  { name: 'Easter Sunday', date: 'Sunday, 20 April' },
  { name: 'Easter Monday', date: 'Monday, 21 April' },
  { name: 'ANZAC Day', date: 'Friday, 25 April' },
  { name: "King's Birthday", date: 'Monday, 9 June' },
  { name: 'Friday before the AFL Grand Final', date: 'Friday, 26 September' },
  { name: 'Melbourne Cup', date: 'Tuesday, 4 November' },
  { name: 'Christmas Day', date: 'Thursday, 25 December' },
  { name: 'Boxing Day', date: 'Friday, 26 December' },
];

// Reactive refs for DOM elements and dynamic message
const daysUntilNextHolidayMessage = ref('');
const containerRef = ref(null);
const canvasRef = ref(null);

// Global variables for fireworks animation
let ctx;
let particles = [];
let animationId;
const MAX_PARTICLES = 300;

// Parses a human-readable holiday string into a Date object
const parseHolidayDate = (dateStr, year) => {
  const parts = dateStr.split(' ');
  const day = parts[parts.length - 2];
  const month = parts[parts.length - 1];
  const formattedDateStr = `${month} ${day}, ${year}`;
  const date = new Date(formattedDateStr);
  date.setHours(0, 0, 0, 0);
  return date;
};

// Determines the next holiday and how many days until it
const calculateNextHoliday = () => {
  const currentYear = 2025;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  for (const holiday of holidays) {
    const parsedDate = parseHolidayDate(holiday.date, currentYear);
    if (parsedDate >= today) {
      const diffTime = parsedDate.getTime() - today.getTime();
      const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      daysUntilNextHolidayMessage.value =
        daysUntil === 0
          ? `The next public holiday is ${holiday.name} - which is today! 🎉`
          : daysUntil === 1
          ? `The next public holiday is ${holiday.name} - in 1 day!`
          : `The next public holiday is ${holiday.name} - in ${daysUntil} days.`;
      return;
    }
  }

  daysUntilNextHolidayMessage.value = 'No upcoming public holidays found for 2025.';
};

// Fireworks particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;
    this.speedX = (Math.random() - 0.5) * 4;
    this.speedY = (Math.random() - 0.5) * 4;
    this.color = `hsla(${Math.random() * 360}, 100%, 60%, 0.9)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Handle mouse movement and spawn particles
const handleMouseMove = (e) => {
  const rect = canvasRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  for (let i = 0; i < 5; i++) {
    if (particles.length < MAX_PARTICLES) {
      particles.push(new Particle(x, y));
    }
  }
};

// Animate and render all particles
const animate = () => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.size < 0.5) particles.splice(i, 1);
  }

  animationId = requestAnimationFrame(animate);
};

// Setup canvas and start animations on mount
onMounted(() => {
  const canvas = canvasRef.value;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');

  window.addEventListener('mousemove', handleMouseMove);

  animate();
  calculateNextHoliday();
});

// Clean up when the component is unmounted
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
/* Fullscreen canvas for fireworks */
.global-fireworks {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  background: transparent;
}

/* Container for all holiday-related content */
.holiday-container {
  padding: 40px 5%;
  background-color: #e6f7fd;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Banner image at top of section */
.holiday-banner {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

/* Holiday section title */
.holiday-title {
  text-align: center;
  font-size: 2.5em;
  color: #3a91e7;
  margin-bottom: 10px;
  font-family: -apple-system;
  font-weight: bold;
}

/* Countdown message styling */
.next-holiday-info {
  text-align: center;
  font-size: 2em;
  color: #3a91e7;
  margin-bottom: 10px;
  animation: pop 1.5s ease infinite alternate;
  font-family: -apple-system;
}

@keyframes pop {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}

/* Descriptive paragraph about the purpose of the table */
.holiday-description {
  font-size: 1.5rem;
  color: #3a91e7;
  text-align: center;
  font-weight: 500;
  line-height: 1.8;
  margin: 0 auto 30px auto;
  max-width: 1300px;
  font-family: -apple-system;
}

/* Table wrapper enables horizontal scroll */
.holiday-table-wrapper {
  overflow-x: auto;
  margin-top: 30px;
}

/* Table structure and row styles */
.holiday-table {
  width: 100%;
  border-collapse: collapse;
  background: none;
}

.holiday-table th,
.holiday-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  font-size: 1.6em;
  font-family: -apple-system;
}

.holiday-table thead {
  background-color: #3f81ea;
  color: white;
  position: sticky;
  top: 0;
}

.holiday-table tbody tr:hover {
  background-color: #f0faff;
  transition: background-color 0.2s ease;
}

/* Additional info text */
.holiday-extra-info {
  margin-top: 24px;
  font-family: -apple-system;
  font-size: 1.6em;
  color: #3a91e7;
  line-height: 1.6;
  text-align: center;
}

/* Image showing regional differences */
.holiday-diff-image {
  display: block;
  margin: 16px auto 0;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Calendar download section */
.holiday-download-section {
  margin-top: 0px;
  text-align: center;
  padding: 20px;
  background-color: #dff2ff;
  border-radius: 0px;
}

.download-text {
  font-size: 2em;
  font-weight: 600;
  color: #1c3c72;
  margin-bottom: 12px;
  font-family: -apple-system;
}

.download-button {
  display: inline-block;
  font-size: 1.6em;
  padding: 10px 20px;
  background-color: #3a91e7;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-family: -apple-system;
  animation: breathe 2.5s ease-in-out infinite;
}

@keyframes breathe {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.95;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.download-button:hover {
  background-color: #2c6ecf;
}

.explore-more-wrapper {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.explore-more-button {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #3a91e7;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.explore-more-button:hover {
  background-color: #2c6ecf;
  transform: scale(1.05);
}
</style>
