<template>
    <div class="carousel-container"
         @mouseenter="hovered = true"
         @mouseleave="hovered = false">
      <div class="header-text">Explore more ways to move:</div>
      
      <button class="pause-btn" @click="togglePlay">
        {{ isPlaying ? '⏸' : '▶' }}
      </button>
  
      <div class="carousel-track" :style="transformStyle">
        <div 
          v-for="(item, index) in items" 
          :key="index" 
          class="carousel-slide"
        >
          <div class="card">
            <img 
              :src="item.image" 
              class="carousel-image" 
              :alt="item.altText"
            >
            <div class="card-content">
              <h2 class="card-title">{{ item.title }}</h2>
              <p class="card-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watchEffect, onBeforeUnmount } from 'vue';
  
  const items = [
    { 
      image: new URL('../assets/sydneyimage.jpg', import.meta.url).href,
      title: 'Artist Spotlight',
      description: 'Tell me about U2',
      altText: 'U2 performance'
    },
    { 
      image: new URL('../assets/sydneyimage.jpg', import.meta.url).href,
      title: 'Strength with',
      description: 'Training with Gregg',
      altText: 'Fitness session'
    },
    { 
      image: new URL('../assets/sydneyimage.jpg', import.meta.url).href,
      title: 'Time to Walk',
      description: 'With Danielle Brooks',
      altText: 'Walking path'
    }
  ];
  
  const currentIndex = ref(0);
  const isPlaying = ref(true);
  const hovered = ref(false);
  let animationTimer = null;
  
  const baseSpeed = 3000;
  const hoverSpeed = 5000;
  
  const transformStyle = computed(() => ({
    transform: `translateX(-${currentIndex.value * 100}%)`,
    transition: `transform ${hovered.value ? hoverSpeed/1000 : baseSpeed/1000}s linear`
  }));
  
  function nextSlide() {
    currentIndex.value = (currentIndex.value + 1) % items.length;
  }
  
  function togglePlay() {
    isPlaying.value = !isPlaying.value;
  }
  
  watchEffect(() => {
    clearTimeout(animationTimer);
    if (isPlaying.value) {
      const speed = hovered.value ? hoverSpeed : baseSpeed;
      animationTimer = setTimeout(() => {
        nextSlide();
      }, speed);
    }
  });
  
  onBeforeUnmount(() => {
    clearTimeout(animationTimer);
  });
  </script>
  
  <style>
  .carousel-container {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    background: #f5f5f7;
    margin: 1rem auto;
    max-width: 1200px;
  }
  
  .header-text {
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 1.4rem;
    color: #1d1d1f;
    z-index: 10;
  }
  
  .carousel-track {
    display: flex;
    height: 100%;
    will-change: transform;
  }
  
  .carousel-slide {
    flex: 0 0 100%;
    min-width: 100%;
    padding: 0 15%;
    box-sizing: border-box;
  }
  
  .card {
    position: relative;
    height: 320px;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    background: white;
  }
  
  .carousel-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
  
  .card-content {
    padding: 1.2rem;
    text-align: center;
  }
  
  .card-title {
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
    color: #1d1d1f;
    font-weight: 600;
  }
  
  .card-description {
    font-size: 1rem;
    color: #86868b;
    line-height: 1.4;
  }
  
  .pause-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 20;
    background: rgba(255,255,255,0.95);
    border: 1px solid rgba(0,0,0,0.1);
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    transition: transform 0.2s;
  }
  
  .pause-btn:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    .carousel-container {
      height: 340px;
      margin: 0.5rem auto;
    }
    
    .header-text {
      font-size: 1.2rem;
      left: 15px;
      top: 15px;
    }
    
    .carousel-slide {
      padding: 0 8%;
    }
    
    .card {
      height: 280px;
    }
    
    .carousel-image {
      height: 160px;
    }
    
    .card-title {
      font-size: 1.2rem;
    }
    
    .card-description {
      font-size: 0.9rem;
    }
    
    .pause-btn {
      right: 10px;
      bottom: 10px;
      padding: 6px 12px;
    }
  }
  
  @media (max-width: 480px) {
    .carousel-container {
      height: 300px;
    }
    
    .card {
      height: 240px;
    }
    
    .carousel-image {
      height: 140px;
    }
  }
  </style>