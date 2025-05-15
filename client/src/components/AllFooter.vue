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
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/newcomers">Newcomers</router-link></li>
            <li><router-link to="/language">Language</router-link></li>
            <li><router-link to="/languagehub">LanguageHub</router-link></li>
            <li><router-link to="/healthcare">Healthcare</router-link></li>
            <li><router-link to="/education">Education</router-link></li>
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
// No logic or interactivity is needed here — it's a static footer.
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
  border-radius: 50%; /* make it a circle */
  object-fit: cover; /* ensure image covers the space */
  border: 2px solid #f0f0f0; /* light border for contrast */
}

/* Section holding title and navigation links */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Website title style */
.footer-title {
  font-size: 1.5rem;
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
}

/* Style for individual links */
.footer-links li a {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 6px;
}

/* Hover effect on links */
.footer-links li a:hover {
  color: #0074cc;
  background-color: rgba(0, 116, 204, 0.05);
}

/* Bottom part of the footer with small text */
.footer-bottom {
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  text-align: center;
  padding-top: 1.5rem;
  font-size: 0.9rem;
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
