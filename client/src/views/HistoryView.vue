<template>
  <div class="page-container">
    <!-- 页面说明 -->
    <p class="page-description">
      Understanding public holidays is a great way for newcomers to connect with the local community.
      This page introduces major public holidays celebrated in Victoria, Australia, and how locals observe them.
    </p>

    <!-- 正常卡片网格 -->
    <div class="card-grid">
      <div
        class="card"
        v-for="holiday in holidays"
        :key="holiday.name"
        :style="{ backgroundImage: `url(${holiday.image})` }"
      >
        <div class="card-title">{{ holiday.name }}</div>
        <div class="card-date">{{ holiday.date }}</div>
        <router-link class="learn-more" :to="holiday.link">Learn More</router-link>
      </div>
    </div>

    <!-- 特别卡片区域 -->
    <div
      class="featured-card"
      :style="{ backgroundImage: `url(${featuredHoliday.image})` }"
    >
      <div class="card-title">{{ featuredHoliday.name }}</div>
      <div class="card-date">{{ featuredHoliday.date }}</div>
      <router-link class="learn-more" :to="featuredHoliday.link">Learn More</router-link>
    </div>
  </div>
</template>


<script setup>
const holidays = [
  { name: "New Year's Day", date: "Wednesday 1 January", image: new URL('@/assets/holidays/new-years-day.jpg', import.meta.url).href, link: "/holidays/new-years-day" },
  { name: "Australia Day", date: "Monday 27 January", image: new URL('@/assets/holidays/australia-day.jpg', import.meta.url).href, link: "/holidays/australia-day" },
  { name: "Labour Day", date: "Monday 10 March", image: new URL('@/assets/holidays/labour-day.jpg', import.meta.url).href, link: "/holidays/labour-day" },
  { name: "Good Friday", date: "Friday 18 April", image: new URL('@/assets/holidays/good-friday.jpg', import.meta.url).href, link: "/holidays/good-friday" },
  { name: "Saturday before Easter", date: "Saturday 19 April", image: new URL('@/assets/holidays/easter-saturday.jpg', import.meta.url).href, link: "/holidays/easter-saturday" },
  { name: "Easter Sunday", date: "Sunday 20 April", image: new URL('@/assets/holidays/easter-sunday.jpg', import.meta.url).href, link: "/holidays/easter-sunday" },
  { name: "Easter Monday", date: "Monday 21 April", image: new URL('@/assets/holidays/easter-monday.jpg', import.meta.url).href, link: "/holidays/easter-monday" },
  { name: "Anzac Day", date: "Friday 25 April", image: new URL('@/assets/holidays/anzac-day.jpg', import.meta.url).href, link: "/holidays/anzac-day" },
  { name: "King's Birthday", date: "Monday 9 June", image: new URL('@/assets/holidays/kings-birthday.jpg', import.meta.url).href, link: "/holidays/kings-birthday" },
  { name: "AFL Grand Final Friday", date: "Friday 26 September", image: new URL('@/assets/holidays/afl-grand-final-day.jpg', import.meta.url).href, link: "/holidays/afl-grand-final" },
  { name: "Melbourne Cup", date: "Tuesday 4 November", image: new URL('@/assets/holidays/melbourne-cup.jpg', import.meta.url).href, link: "/holidays/melbourne-cup" },
  { name: "Christmas Day", date: "Thursday 25 December", image: new URL('@/assets/holidays/christmas-day.jpg', import.meta.url).href, link: "/holidays/christmas-day" }
];

const featuredHoliday = {
  name: "Boxing Day",
  date: "Friday 26 December",
  image: new URL('@/assets/holidays/boxing-day.jpg', import.meta.url).href,
  link: "/holidays/boxing-day"
};
</script>

<style scoped>
.page-container {
  padding: 24px 16px;
  max-width: 1500px;
  margin: 0 auto;
}

.page-description {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 32px;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center; /* ✅ 新增：居中文本 */
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 26px;
  justify-content: center;
}

/* 卡片样式 */
.card,
.featured-card {
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 60px;
  padding-top: 40px;
  border-radius: 15px;
  transition: transform 0.4s ease;
}

/* 普通卡片 */
.card {
  height: 500px;
}

/* Featured 卡片加宽 */
.featured-card {
  margin: 48px auto 0;
  max-width: 1000px;
  height: 520px;
}

/* 遮罩 */
.card::before,
.featured-card::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
  z-index: 0;
}

/* Hover 效果 */
.card:hover,
.featured-card:hover {
  transform: scale(1.05);
}

/* 上移内容 */
.card:hover .card-title,
.card:hover .card-date,
.featured-card:hover .card-title,
.featured-card:hover .card-date {
  transform: translateY(-80px);
}

/* 文本层级提升 */
.card-title,
.card-date,
.learn-more {
  z-index: 1;
}

/* 标题样式 */
.card-title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  transition: transform 0.4s ease;
  transform: translateY(0);
}

/* 日期样式 */
.card-date {
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 8px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  transition: transform 0.4s ease;
  transform: translateY(0);
}

/* Learn More 按钮 */
.learn-more {
  margin-top: 12px;
  padding: 10px 24px;
  background-color: white;
  color: #1f2937;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    background-color 0.3s ease,
    color 0.3s ease;
  text-decoration: none;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card:hover .learn-more,
.featured-card:hover .learn-more {
  opacity: 1;
  transform: translateY(0);
}

.learn-more:hover {
  background-color: #1f2937;
  color: white;
}
</style>
