<template>
  <div class="home-container">
    <!-- 背景视频 -->
    <div class="video-wrapper">
      <video autoplay muted loop playsinline class="bg-video">
        <source src="@/assets/house_1.mp4" type="video/mp4" />
      </video>
    </div>

    <!-- 内容区域 -->
    <div class="content-section">
      <!-- 轮播 -->
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

      <!-- 卡片区域 -->
      <div class="cards-section">
        <div class="cards-row">
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="card-box"
            @mouseover="hoverIndex = index"
            @mouseleave="hoverIndex = -1"
          >
            <div class="card-inner" :class="{ 'card-hover': hoverIndex === index }">
              <img :src="card.image" alt="card image" class="card-img" />
              <h3 class="card-title">{{ card.title }}</h3>
              <p class="card-description">{{ card.content }}</p>
              <router-link :to="card.link" class="learn-more-btn">Learn More</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'

const slides = ref([
  {
    title: 'Newcomers',
    description: 'Get to know who the newcomers are in Victoria and their key challenges.',
    bgColor: 'rgba(245, 245, 247, 0.8)'
  },
  {
    title: 'Language',
    description: 'Understand the multilingual landscape and language support for immigrants.',
    bgColor: 'rgba(245, 245, 247, 0.8)'
  }
])

const cards = ref([
  {
    title: 'Newcomers',
    content: 'Explore who the newcomers are in Victoria, where they live, and the challenges they face during settlement.',
    image: 'https://bookcreator.com/wp-content/uploads/2024/07/Welcoming-Newcomers.png',
    link: '/newcomers'
  },
  {
    title: 'Language',
    content: 'Discover the language support and multilingual communities available to help newcomers settle in Victoria.',
    image: 'https://www.open.edu/openlearn/fb/2e/fb2ec7240af3a13b9bf351a4a20819588bd6fc8c?response-content-disposition=inline%3Bfilename%3D%22dil_1_OLHP_786x400.jpg%22&response-content-type=image%2Fjpeg&Expires=1743984900&Signature=cCBVo15Icx4QF5ORoG2tECMnbs6IkUsTNEkNdlNB7UML9iFFw-1dZwzooVYKA4TNA--D5J3eEUpHa9HRHOK8XQ6upl76-qsdd8FFYO30tLYIOWY40EifFMy9isHK4DQJm5cjHQMiXegRPaRcJ0axFP-COiun9XyOvRRHRBxRpIGrytecS1kRaCGpbzQqVAaNUv-ib-paeTwqpzmnT4UtlsEA1n0gRJ043gP7KbraHAkgpmkub1rFzASFECUoOvnbVbE4cmmRPBqXT5a7ZtBXOIZtp-NmQuB63f5iJ-Tmax2bbOuA0UwC1Ys-g1rlh-ulNFfGCpfKz46RGVWYRID~1g__&Key-Pair-Id=K87HJKWMK329B',
    link: '/language'
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

/* ✅ 卡片样式区域 */
.cards-section {
  padding: 4rem 2rem;
}

.cards-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 2rem;
}

.card-box {
  flex: 1 1 45%;
  max-width: 45%;
  display: flex;
  justify-content: center;
}

.card-inner {
  background: #fff6f5eb;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  width: 100%;
  transition: all 0.3s ease;
}

.card-img {
  width: 100%;
  height: 200px; /* 固定高度确保卡片一致 */
  object-fit: cover; /* 填满容器并裁剪多余部分 */
  border-radius: 8px 8px 0 0; /* 上圆角 */
  display: block;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.card-description {
  font-size: 1rem;
  color: #555;
}

.card-hover {
  background: #1976d2;
  color: white;
  transform: translateY(-4px);
}

.card-hover .card-description {
  color: #e0e0e0;
}

.learn-more-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: #1976d2;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;
}

.card-hover .learn-more-btn {
  background: white;
  color: #1976d2;
}

.learn-more-btn:hover {
  background: #125ea9;
}

/* ✅ 响应式：移动端一列展示 */
@media (max-width: 768px) {
  .carousel-slide {
    padding: 0 5%;
  }

  .card-box {
    max-width: 100%;
    flex: 1 1 100%;
  }

  .cards-section {
    padding: 2rem 1rem;
  }

  .card-title {
    font-size: 1.8rem;
  }

  .card-description {
    font-size: 1rem;
  }

  .video-wrapper {
    height: 50vh;
  }
}
</style>
