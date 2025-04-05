<template>
    <!-- 主导航栏容器 -->
    <nav class="navbar">
      <!-- 左侧部分：包含 Logo 和网站名称 -->
      <div class="navbar-left">
        <div class="navbar-brand">
          <!-- 网站图标（Logo），位于 assets 文件夹下 -->
          <img src="../assets/immigrant.jpeg" alt="Website Symbol" class="navbar-logo" />
  
          <!-- 网站名称链接，点击跳转回首页 -->
          <router-link to="/">NewcomerAU</router-link>
        </div>
      </div>
  
      <!-- 中间部分：导航菜单项列表 -->
      <ul class="navbar-menu">
        <!-- 每一项通过 router-link 组件进行页面跳转 -->
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/epic">Epic</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* 主导航栏整体样式 */
  .navbar {
    background-color: #0074cc; /* 导航栏背景色：深蓝 */
    padding: 1rem 2rem; /* 上下1rem，左右2rem 的内边距 */
    display: flex; /* 使用 Flex 布局横向排列内容 */
    justify-content: center; /* 居中对齐导航内容 */
    align-items: center; /* 垂直方向居中对齐 */
    flex-wrap: wrap; /* 当屏幕窄时允许换行 */
  }
  
  /* 左侧区域（Logo 和名称）布局样式 */
  .navbar-left {
    display: flex;
    align-items: center;
    margin-right: 2rem; /* 让左侧与中间有空间 */
  }
  
  /* 网站图标样式 */
  .navbar-logo {
    width: 40px;
    height: 40px;
    margin-right: 6px; /* 图标和文字之间的间距 */
    border-radius: 50%; /* 使图标变为圆形 */
    object-fit: cover; /* 保持图像比例裁剪填充 */
  }
  
  /* 网站名称链接样式 */
  .navbar-brand a {
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .navbar-brand a:hover {
    color: #ffcc33;
    text-decoration: underline;
    cursor: pointer;
  }
  
  /* 导航菜单整体样式 */
  .navbar-menu {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center; /* 保证菜单居中 */
  }
  
  /* 每个菜单链接的样式（加框、圆角、内边距） */
  .navbar-menu li a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    border: 2px solid white;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  /* 鼠标悬停或获得焦点时的样式变化 */
  .navbar-menu li a:hover,
  .navbar-menu li a:focus {
    color: #0074cc;
    background-color: #ffcc33;
    transform: scale(1.05);
    outline: none;
  }
  
  /* 当屏幕宽度小于 768px 时启用 */
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .navbar-menu {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin-top: 1rem;
    }
  
    .navbar-menu li {
      margin: 0.5rem 0;
    }
  }
  </style>