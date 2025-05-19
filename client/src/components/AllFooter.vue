<template>
  <!-- The main footer container that holds all footer content -->
  <footer class="footer-container">
    <div class="footer-content">
      <!-- Left section of the footer: logo and links -->
      <div class="footer-left">
        <!-- Logo image of the website -->
        <div class="footer-image">
          <img src="../assets/immigrant.jpeg" alt="Website Symbol" class="footer-logo" />
        </div>

        <!-- Title and navigation links section -->
        <div class="footer-section">
          <!-- Website title -->
          <h1 class="footer-title">NewcomerAU</h1>

          <!-- Navigation links inside the footer -->
          <ul class="footer-links">
            <li>
              <router-link to="/" class="nav-link" :class="{ 'active-footer-link': route.path === '/' }">Home</router-link>
            </li>
            <li>
              <router-link to="/newcomers" class="nav-link" :class="{ 'active-footer-link': route.path.startsWith('/newcomers') }">Newcomers</router-link>
            </li>
            <li>
              <router-link to="/education" class="nav-link" :class="{ 'active-footer-link': route.path.startsWith('/education') }">Education</router-link>
            </li>
            <li>
              <router-link to="/healthcare/guidance" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/healthcare/guidance') }">Healthcare Guidance</router-link>
            </li>
            <li>
              <router-link to="/healthcare/symptom-checker" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/healthcare/symptom-checker') }">Symptom Checker</router-link>
            </li>
            <li>
              <router-link to="/healthcare/medical-map" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/healthcare/medical-map') }">Medical Map</router-link>
            </li>
            <li>
              <router-link to="/healthcare/health-statistics" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/healthcare/health-statistics') }">Health Statistics</router-link>
            </li>
            <li>
              <router-link to="/language" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/language') }">Language Overview</router-link>
            </li>
            <li>
              <router-link to="/languagehub" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/languagehub') }">Language Hub</router-link>
            </li>
            <li>
              <router-link to="/integration/holidays" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/integration/holidays') }">Public holiday</router-link>
            </li>
            <li>
              <router-link to="/integration/history" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/integration/history') }">Holiday Culture</router-link>
            </li>
            <li>
              <router-link to="/integration/more-holidays" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/integration/more-holidays') }">More Festivals</router-link>
            </li>
            <li>
              <router-link to="/integration/quiz" class="dropdown-item" :class="{ 'active-footer-link': route.path.startsWith('/integration/quiz') }">Cultural Integration Quiz</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom part of the footer with copyright info -->
    <div class="footer-bottom">
      <p>&copy; 2025 TA12. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
// Import route to determine which page is active
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>
/* The outer container of the footer */
.footer-container {
  background-color: #ffffff;
  padding: 2rem;
  color: #333;
  box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.05); /* subtle shadow for elevation */
}

/* Wrapper for the main content area of the footer */
.footer-content {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap; /* Allows items to wrap on smaller screens */
}

/* Left side of the footer: logo + links */
.footer-left {
  display: flex;
  align-items: center;
  margin-left: 4rem;
  flex-wrap: wrap;
  gap: 2rem; /* space between logo and links */
}

/* Wrapper for the logo image */
.footer-image {
  display: flex;
  align-items: center;
}

/* Style for the logo image */
.footer-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

/* Section holding title and navigation links */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Website title style */
.footer-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
}

/* List container for navigation links */
.footer-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}

/* Style for normal footer links */
.footer-links li a {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
}

/* Hover effect for links */
.footer-links li a:hover {
  color: #0074cc;
  background-color: rgba(0, 116, 204, 0.05);
}

/* Highlight active page link */
.active-footer-link {
  color: #0056a3 !important;
  font-weight: 700;
  background-color: rgba(0, 116, 204, 0.08);
  border: 1px solid rgba(0, 116, 204, 0.2);
  border-radius: 8px;
}

/* Bottom part of the footer */
.footer-bottom {
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  text-align: center;
  padding-top: 1.5rem;
  font-size: 1.2rem;
  color: #888;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .footer-left {
    margin-left: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }

  .footer-image {
    margin-bottom: 0.5rem;
  }
}
</style>
