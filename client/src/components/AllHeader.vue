<template>
  <!-- Navigation bar wrapper. It gets an extra 'scrolled' class when user scrolls down -->
  <nav class="navbar" :class="{ 'scrolled': isScrolled }" ref="navbar">
    <!-- Logo + Brand name section -->
    <div class="navbar-brand">
      <img src="../assets/immigrant.jpeg" alt="Website Symbol" class="navbar-logo" />
      <!-- Clicking this brand name takes you to the homepage -->
      <router-link to="/" class="brand-text">NewcomerAU</router-link>
    </div>

    <!-- Navigation links -->
    <ul class="navbar-menu">
      <li><router-link to="/" class="nav-link">Home</router-link></li>
      <li><router-link to="/newcomers" class="nav-link">Newcomers</router-link></li>
      <li><router-link to="/language" class="nav-link">Language</router-link></li>
      <li><router-link to="/languagehub" class="nav-link">LanguageHub</router-link></li>
      <li><router-link to="/healthcare" class="nav-link">Healthcare</router-link></li>
    </ul>
  </nav>
</template>


<script setup>
import { ref, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

// A reactive flag to determine if the user has scrolled past 30px
const isScrolled = ref(false);

// Get the current route so we can respond to path changes
const route = useRoute();

// This function checks how far the user has scrolled and updates the flag
const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

// Add or remove scroll listener depending on the current route
const updateScrollListener = (path) => {
  if (path === '/') {
    // On homepage: enable scroll effect
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // call once to update initial state
  } else {
    // On other pages: disable scroll effect and force navbar to show as "scrolled"
    window.removeEventListener('scroll', handleScroll);
    isScrolled.value = true;
  }
};

// Watch route changes and update the scroll listener accordingly
watch(() => route.path, (newPath) => {
  updateScrollListener(newPath);
}, { immediate: true }); // run immediately when component loads

// Clean up the event listener when the component is destroyed
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>


<style scoped>
/* Basic navbar layout: fixed to top, full width, transparent by default */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0);
  transition: all 0.3s ease;
}

/* Navbar appearance after scroll */
.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  padding: 0.8rem 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1); /* subtle bottom shadow */
}

/* Brand section: logo + text */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

/* Logo styling: circle image */
.navbar-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Brand text (NewcomerAU) appearance */
.brand-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

/* Brand text turns dark when scrolled */
.navbar.scrolled .brand-text {
  color: #1a1a1a;
}

/* Main menu container */
.navbar-menu {
  display: flex;
  gap: 1.2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Each navigation link styling */
.nav-link {
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Hover effect for navigation links */
.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

/* Link styling when navbar is scrolled (light mode) */
.navbar.scrolled .nav-link {
  color: #1a1a1a;
  background: rgba(0, 116, 204, 0.08);
  border-color: rgba(0, 116, 204, 0.15);
}

.navbar.scrolled .nav-link:hover {
  background: rgba(0, 116, 204, 0.15);
}

/* Responsive styling for smaller screens */
@media (max-width: 768px) {
  .navbar {
    padding: 0.8rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-menu {
    margin-top: 1rem;
    flex-direction: column;
    width: 100%;
  }

  .nav-link {
    width: 100%;
    text-align: left;
    padding: 0.8rem;
  }

  .navbar.scrolled {
    padding: 0.6rem 1.5rem;
  }
}
</style>
