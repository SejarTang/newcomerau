<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }" ref="navbar">
    <div class="navbar-brand">
      <img src="../assets/immigrant.jpeg" alt="Website Symbol" class="navbar-logo" />
      <router-link to="/" class="brand-text">NewcomerAU</router-link>
    </div>

    <ul class="navbar-menu">
      <li><router-link to="/" class="nav-link">Home</router-link></li>
      <li><router-link to="/newcomers" class="nav-link">Newcomers</router-link></li>
      <li><router-link to="/education" class="nav-link">Education</router-link></li>
      <li><router-link to="/healthcare" class="nav-link">Healthcare</router-link></li>

      <!-- Language dropdown -->
      <li class="dropdown">
        <router-link to="/language" class="nav-link">Language ▼</router-link>
        <ul class="dropdown-menu">
          <li><router-link to="/language" class="dropdown-item">Language Overview</router-link></li>
          <li><router-link to="/languagehub" class="dropdown-item">Language Hub</router-link></li>
        </ul>
      </li>

      <!-- Cultural Integration dropdown -->
      <li class="dropdown">
        <router-link to="/integration" class="nav-link">Cultural Integration ▼</router-link>
        <ul class="dropdown-menu">
          <li><router-link to="/integration/holidays" class="dropdown-item">Public holiday</router-link></li>
          <li><router-link to="/integration/history" class="dropdown-item">Holiday Culture</router-link></li>
          <li><router-link to="/integration/more-holidays" class="dropdown-item">More Festivals</router-link></li>
          <li><router-link to="/integration/quiz" class="dropdown-item">Cultural Integration Quiz</router-link></li>

        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const isScrolled = ref(false);
const route = useRoute();

// Detect if the window is scrolled past a threshold
const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

// Add or remove scroll event listener based on route
const updateScrollListener = (path) => {
  if (path === '/') {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  } else {
    window.removeEventListener('scroll', handleScroll);
    isScrolled.value = true;
  }
};

// Watch route change to update scroll behavior
watch(() => route.path, (newPath) => {
  updateScrollListener(newPath);
}, { immediate: true });

// Cleanup on component unmount
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Navigation bar container */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  background-color: rgba(255, 255, 255, 0);
  transition: all 0.3s ease;
  overflow: visible;
}

/* Navbar style when scrolled */
.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  padding: 1.2rem 3rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

/* Brand section */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.navbar-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.brand-text {
  font-size: 2rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.navbar.scrolled .brand-text {
  color: #1a1a1a;
}

/* Top-level menu container */
.navbar-menu {
  display: flex;
  gap: 1.2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Menu links */
.nav-link {
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.navbar.scrolled .nav-link {
  color: #1a1a1a;
  background: rgba(0, 116, 204, 0.08);
  border-color: rgba(0, 116, 204, 0.15);
}

.navbar.scrolled .nav-link:hover {
  background: rgba(0, 116, 204, 0.15);
}

/* Dropdown container */
.dropdown {
  position: relative;
}

/* Dropdown menu styling */
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 200px;
  padding: 0.5rem 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9); /* 更清晰、可读 */
  backdrop-filter: blur(8px); /* 模糊保留 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  text-align: center;
}

/* Show dropdown on hover */
.dropdown:hover .dropdown-menu {
  display: block;
}

/* Dropdown menu item */
.dropdown-item {
  display: block;
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a; /* 深色字体，确保可读性 */
  text-shadow: none; /* 移除模糊阴影 */
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.25s ease;
}

/* Hover effect for dropdown item */
.dropdown-item:hover {
  background-color: rgba(0, 116, 204, 0.1);
  color: #0056a3;
}

/* Responsive layout adjustments */
@media (max-width: 768px) {
  .dropdown-menu {
    position: static;
    transform: none;
    box-shadow: none;
    padding-left: 1rem;
    background: rgba(30, 30, 30, 0.85); /* dark translucent background */
    backdrop-filter: blur(8px);         /* glass effect */
    border-radius: 12px;
    margin-top: 0.5rem;
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

  .dropdown-menu {
    position: static;
    transform: none;
    box-shadow: none;
    padding-left: 1rem;
    background: transparent;
    backdrop-filter: none;
  }
}

.nav-link.router-link-active {
  color: #0056a3 !important;
  font-weight: 700;
  font-size: 1.3rem;
  padding: 0.9rem 1.6rem;
  background-color: rgba(0, 116, 204, 0.15);
  border: 2px solid rgba(0, 116, 204, 0.25);
  border-radius: 10px;
  transform: scale(1.12);
  transition: all 0.3s ease;
}

</style>
