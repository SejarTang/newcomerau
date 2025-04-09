<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }" ref="navbar">
    <div class="navbar-brand">
      <img src="../assets/immigrant.jpeg" alt="Website Symbol" class="navbar-logo" />
      <router-link to="/" class="brand-text">NewcomerAU</router-link>
    </div>
    <ul class="navbar-menu">
      <li><router-link to="/" class="nav-link">Home</router-link></li>
      <li><router-link to="/newcomers" class="nav-link">Newcomers</router-link></li>
      <li><router-link to="/language" class="nav-link">Language</router-link></li>

    </ul>
  </nav>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const isScrolled = ref(false);
const route = useRoute();

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

const updateScrollListener = (path) => {
  if (path === '/') {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  } else {
    window.removeEventListener('scroll', handleScroll);
    isScrolled.value = true;
  }
};

watch(() => route.path, (newPath) => {
  updateScrollListener(newPath);
}, { immediate: true });

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
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

.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  padding: 0.8rem 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.navbar-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.brand-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.navbar.scrolled .brand-text {
  color: #1a1a1a;
}

.navbar-menu {
  display: flex;
  gap: 1.2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

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
