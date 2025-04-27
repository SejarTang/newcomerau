<template>
  <footer class="footer-container">
    <div class="footer-content">
      <div class="footer-left">
        <div class="footer-image">
          <img src="../assets/immigrant.jpeg" alt="Website Symbol" class="footer-logo" />
        </div>
        <div class="footer-section">
          <h1 class="footer-title">NewcomerAU</h1>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/newcomers">Newcomers</router-link></li>
            <li><router-link to="/language">Language</router-link></li>
            <li><router-link to="/languagehub">LanguageHub</router-link></li>
            <li><router-link to="/healthcare">Healthcare</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 TA12. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-container {
  background-color: #ffffff;
  padding: 2rem;
  color: #333;
  box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.05);
}

.footer-content {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.footer-left {
  display: flex;
  align-items: center;
  margin-left: 4rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-image {
  display: flex;
  align-items: center;
}

.footer-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.footer-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li a {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 6px;
}

.footer-links li a:hover {
  color: #0074cc;
  background-color: rgba(0, 116, 204, 0.05);
}

.footer-bottom {
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  text-align: center;
  padding-top: 1.5rem;
  font-size: 0.9rem;
  color: #888;
}

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
