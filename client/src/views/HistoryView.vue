<template>
  <div class="page-container">
    <!-- Introductory description about public holidays -->
    <p class="page-description">
      Understanding public holidays is a great way for newcomers to connect with the local community.
      This page introduces the public holidays celebrated in Victoria, Australia, and how locals observe them.
    </p>

    <!-- Grid of regular holiday cards -->
    <div class="card-grid">
      <div
        class="card"
        v-for="holiday in holidays"
        :key="holiday.name"
        :style="{ backgroundImage: `url(${holiday.image})` }"
      >
        <div class="card-title">{{ holiday.name }}</div>
        <div class="card-date">{{ holiday.date }}</div>
        <router-link class="learn-more" :to="holiday.link">Learn More</router-link>
      </div>
    </div>

    <!-- Highlighted featured holiday card -->
    <div
      class="featured-card"
      :style="{ backgroundImage: `url(${featuredHoliday.image})` }"
    >
      <div class="card-title">{{ featuredHoliday.name }}</div>
      <div class="card-date">{{ featuredHoliday.date }}</div>
      <router-link class="learn-more" :to="featuredHoliday.link">Learn More</router-link>
    </div>
  </div>

    <!-- Explore More Button -->
<div class="explore-more-wrapper">
  <button class="explore-more-button" @click="goToHolidayCulture">Explore More</button>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHolidayCulture() {
  router.push('/integration/more-holidays')
}

const holidays = [
  { name: "New Year's Day", date: "Wednesday 1 January", image: new URL('@/assets/holidays/new-years-day.jpg', import.meta.url).href, link: "/holidays/new-years-day" },
  { name: "Australia Day", date: "Monday 27 January", image: new URL('@/assets/holidays/australia-day.jpg', import.meta.url).href, link: "/holidays/australia-day" },
  { name: "Labour Day", date: "Monday 10 March", image: new URL('@/assets/holidays/labour-day.jpg', import.meta.url).href, link: "/holidays/labour-day" },
  { name: "Good Friday", date: "Friday 18 April", image: new URL('@/assets/holidays/good-friday.jpg', import.meta.url).href, link: "/holidays/good-friday" },
  { name: "Saturday before Easter", date: "Saturday 19 April", image: new URL('@/assets/holidays/easter-saturday.jpg', import.meta.url).href, link: "/holidays/easter-saturday" },
  { name: "Easter Sunday", date: "Sunday 20 April", image: new URL('@/assets/holidays/easter-sunday.jpg', import.meta.url).href, link: "/holidays/easter-sunday" },
  { name: "Easter Monday", date: "Monday 21 April", image: new URL('@/assets/holidays/easter-monday.jpg', import.meta.url).href, link: "/holidays/easter-monday" },
  { name: "Anzac Day", date: "Friday 25 April", image: new URL('@/assets/holidays/anzac-day.jpg', import.meta.url).href, link: "/holidays/anzac-day" },
  { name: "King's Birthday", date: "Monday 9 June", image: new URL('@/assets/holidays/kings-birthday.jpg', import.meta.url).href, link: "/holidays/kings-birthday" },
  { name: "AFL Grand Final Friday", date: "Friday 26 September", image: new URL('@/assets/holidays/afl-grand-final-day.jpg', import.meta.url).href, link: "/holidays/afl-grand-final" },
  { name: "Melbourne Cup", date: "Tuesday 4 November", image: new URL('@/assets/holidays/melbourne-cup.jpg', import.meta.url).href, link: "/holidays/melbourne-cup" },
  { name: "Christmas Day", date: "Thursday 25 December", image: new URL('@/assets/holidays/christmas-day.jpg', import.meta.url).href, link: "/holidays/christmas-day" }
];

const featuredHoliday = {
  name: "Boxing Day",
  date: "Friday 26 December",
  image: new URL('@/assets/holidays/boxing-day.jpg', import.meta.url).href,
  link: "/holidays/boxing-day"
};
</script>

<style scoped>
/* Container for the entire page */
.page-container {
  padding: 24px 16px;
  max-width: 1500px;
  margin: 100px auto 0 auto;
}

/* Introductory paragraph style */
.page-description {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 32px;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
}

/* Grid layout for holiday cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 26px;
  justify-content: center;
}

/* Base styles for both regular and featured cards */
.card,
.featured-card {
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 60px;
  padding-top: 50px;
  border-radius: 15px;
  transition: transform 0.4s ease;
}

/* Specific height for regular cards */
.card {
  height: 500px;
}

/* Featured card styling (larger and centered) */
.featured-card {
  margin: 48px auto 0;
  max-width: 1000px;
  height: 520px;
}

/* Gradient overlay at the bottom of cards */
.card::before,
.featured-card::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
  z-index: 0;
}

/* Zoom effect on hover */
.card:hover,
.featured-card:hover {
  transform: scale(1.05);
}

/* Slide up title and date on hover */
.card:hover .card-title,
.card:hover .card-date,
.featured-card:hover .card-title,
.featured-card:hover .card-date {
  transform: translateY(-80px);
}

/* Ensure text and buttons are above the gradient */
.card-title,
.card-date,
.learn-more {
  z-index: 1;
}

/* Title style */
.card-title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  transition: transform 0.4s ease;
  transform: translateY(0);
}

/* Date style */
.card-date {
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 8px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  transition: transform 0.4s ease;
  transform: translateY(0);
}

/* Learn More button styling */
.learn-more {
  margin-top: 12px;
  padding: 10px 24px;
  background-color: white;
  color: #1f2937;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    background-color 0.3s ease,
    color 0.3s ease;
  text-decoration: none;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Show Learn More button on card hover */
.card:hover .learn-more,
.featured-card:hover .learn-more {
  opacity: 1;
  transform: translateY(0);
}

/* Learn More button hover effects */
.learn-more:hover {
  background-color: #1f2937;
  color: white;
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
