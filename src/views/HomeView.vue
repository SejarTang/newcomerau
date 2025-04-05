<script setup>
import { ref, onMounted } from 'vue';
const slides = ref([
  {
    title: "Information 1",
    description: "content......",
    bgColor: "rgba(245, 245, 247, 0.8)"
  },
  {
    title: "Information 2",
    description: "content......",
    bgColor: "rgba(245, 245, 247, 0.8)"
  },
  {
    title: "Information 3",
    description: "content......",
    bgColor: "rgba(245, 245, 247, 0.8)"
  }
]);

const cards = ref([
  {
    title: 'Where People Like You Live',
    content: '......',
    link: '/epic'
  },
  {
    title: 'How Melbourne Moves',
    content: '......'
  },
  {
    title: 'Your First Free Services',
    content: '......'
  },
  {
    title: 'What Locals Love Most',
    content: '......'
  },
  {
    title: 'Costs You Should Know',
    content: '......'
  },
  {
    title: '...',
    content: '......'
  }
]);

const currentSlide = ref(0);
const autoPlay = ref(true);
const hoverIndex = ref(-1);

onMounted(() => {
  const interval = setInterval(() => {
    if (autoPlay.value) {
      nextSlide();
    }
  }, 5000);
  return () => clearInterval(interval);
});

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};
</script>

<template>
  <div class="home-container">
    <div class="video-wrapper">
      <video autoplay muted loop playsinline class="bg-video">
        <source src="@/assets/house_1.mp4" type="video/mp4" />
      </video>
    </div>

    <div class="content-section">
      <div class="carousel-container">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div 
            v-for="(slide, index) in slides" 
            :key="index"
            class="carousel-slide"
            @mouseenter="autoPlay = false"
            @mouseleave="autoPlay = true"
          >
            <div 
              class="card" 
              :class="{ active: currentSlide === index }"
              :style="{ backgroundColor: slide.bgColor }"
            >
              <div class="card-content">
                <h2 class="card-title">{{ slide.title }}</h2>
                <p class="card-description">{{ slide.description }}</p>
                <button class="btn btn-dark">Learn More</button>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-control prev" @click="prevSlide">
          <i class="bi bi-chevron-left"></i>
        </button>
        <button class="carousel-control next" @click="nextSlide">
          <i class="bi bi-chevron-right"></i>
        </button>

        <div class="indicators">
          <button 
            v-for="(_, index) in slides"
            :key="index"
            class="indicator" 
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>

      <div class="cards-section">
        <div class="cards-wrapper">
          <div 
            v-for="(card, index) in cards"
            :key="index"
            class="card-item"
            @mouseover="hoverIndex = index"
            @mouseleave="hoverIndex = -1"
          >
            <div 
              class="grid-card"
              :class="{ 'card-hover': hoverIndex === index }"
            >
              <h3>{{ card.title }}</h3>
              <p>{{ card.content }}</p>
              <router-link 
                :to="card.link" 
                class="card-link"
              >
                Learn More
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  background-color: #fff6f5eb;
  min-height: 100vh;
  overflow: visible;
}

.video-wrapper {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.content-section {
  position: relative;
  z-index: 1;
  padding: 4rem 0;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.carousel-slide {
  flex: 0 0 100%;
  padding: 0 15%;
  box-sizing: border-box;
  transition: opacity 0.3s;
}

.card {
  border-radius: 30px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  transform: scale(0.9);
  opacity: 0.5;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-image: linear-gradient(
    145deg,
    rgba(79,207,112,0.15),
    rgba(250,214,72,0.15),
    rgba(167,103,229,0.15),
    rgba(18,188,254,0.15),
    rgba(68,206,123,0.15)
  );
  filter: blur(30px);
  opacity: 0.6;
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card.active::after {
  opacity: 0.8;
  animation: shadow-breath 3s ease-in-out infinite;
}

@keyframes shadow-breath {
  0%, 100% { opacity: 0.8; transform: scale(0.98); }
  50% { opacity: 0.95; transform: scale(1.02); }
}

.card.active {
  transform: scale(1);
  opacity: 1;
}

.card-content {
  text-align: center;
  color: #1d1d1f;
}

.card-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.card-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #86868b;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.1);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s;
  z-index: 2;
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.2);
}

.prev {
  left: 2rem;
}

.next {
  right: 2rem;
}

.indicators {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.indicator.active {
  background-color: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
}

.cards-section {
  padding: 4rem 2rem;
}

.cards-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.card-item {
  padding: 0 1rem;
}

.grid-card {
  background: #fff6f5eb;
  padding: 1.5rem;
  border-radius: 8px;
  min-height: 200px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(240, 245, 213, 0.1);
  color: #1d1d1f;
}

.card-hover {
  background: #5d5d5d;
  color: #ffffff;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-link {
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  color: rgba(0, 0, 0, 0.7);
  position: relative;
}

.card-item:hover .card-link {
  color: white;
}

.card-link:hover {
  color: #ffe390 !important;
}

@media (max-width: 768px) {
  .carousel-slide {
    padding: 0 5%;
  }
  
  .card-title {
    font-size: 1.8rem;
  }
  
  .card-description {
    font-size: 1rem;
  }

  .cards-wrapper {
    grid-template-columns: 1fr;
  }
  
  .cards-section {
    padding: 2rem 1rem;
  }
  
  .video-wrapper {
    height: 50vh;
  }
}
</style>