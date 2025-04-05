<script setup>
import { ref, onMounted } from 'vue';

const slides = ref([
  {
    title: "Innovative Design",
    description: "Experience cutting-edge technology with sleek aesthetics",
    bgColor: "rgba(245, 245, 247, 0.8)"
  },
  {
    title: "Premium Performance",
    description: "Powerful features for professional workflows",
    bgColor: "rgba(245, 245, 247, 0.8)"
  },
  {
    title: "Eco-Friendly",
    description: "Made with 100% recycled materials",
    bgColor: "rgba(245, 245, 247, 0.8)"
  }
]);

const currentSlide = ref(0);
const autoPlay = ref(true);

// Automatic carousel rotation
onMounted(() => {
  setInterval(() => {
    if (autoPlay.value) {
      nextSlide();
    }
  }, 5000);
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
  <div class="home">
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

      <!-- Navigation Arrows -->
      <button class="carousel-control prev" @click="prevSlide">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button class="carousel-control next" @click="nextSlide">
        <i class="bi bi-chevron-right"></i>
      </button>

      <!-- Indicators -->
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
  </div>
</template>

<style scoped>
.home {
  padding: 4rem 0;
  background-color: #fff6f5eb;
  min-height: 100vh;
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
  top: -0%;
  left: -0%;
  right: -0%;
  bottom: -0%;
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
  filter: 
    blur(30px);
    /*drop-shadow(0 0 20px rgba(0,0,0,0.1));*/
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
}
</style>