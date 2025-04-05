<template>
    <!-- 页脚整体容器 -->
    <footer class="footer-container">
      <div class="footer-content">
        <!--  -->
        <div class="footer-left">
          <!-- 图标区域 -->
          <div class="footer-image">
            <img src="../assets/immigrant.jpeg" alt="Website Symbol" class="footer-logo" />
          </div>
  
          <!-- 网站名称和链接区域 -->
          <div class="footer-section">
            <h1 class="footer-title">NewcomerAU</h1>
            <ul class="footer-links">
              <li><router-link to="/epic">Epic</router-link></li>
              <li><router-link to="/about">About</router-link></li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- 页脚底部版权信息 -->
      <div class="footer-bottom">
        <p>&copy; 2025 TA12. All Rights Reserved.</p >
      </div>
    </footer>
  </template>
  
  <script setup></script>
  
  <style scoped>
  /* 页脚容器整体样式 */
  .footer-container {
    background-color: #0074cc;
    padding: 2rem;
    color: white;
  }
  
  /* 顶部内容区域 */
  .footer-content {
    display: flex;
    justify-content: flex-start; 
    flex-wrap: wrap;
  }
  
  /*  */
  .footer-left {
    display: flex;
    align-items: center;
    margin-left: 4rem;
    flex-wrap: wrap;
  }
  
  /* 图片区域样式 */
  .footer-image {
    display: flex;
    align-items: center;
    margin-right: 1.5rem; /* 图片与右侧文字的间距 */
  }
  
  .footer-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%; /* 圆形头像效果 */
    object-fit: cover;
  }
  
  /* 网站标题和链接区域 */
  .footer-section {
    display: flex;
    flex-direction: column;
  }
  
  /* 网站名称样式 */
  .footer-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: white;
  }
  
  /* 链接列表样式 */
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.5rem;
  }
  
  /* 链接文字样式，与 Header 统一 */
  .footer-links li a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }
  
  .footer-links li a:hover,
  .footer-links li a:focus {
    color: #ffcc33; /* 悬停变亮黄色，与 Header 一致 */
    outline: none;
  }
  
  /* 底部版权样式 */
  .footer-bottom {
    margin-top: 2rem;
    border-top: 1px solid white;
    text-align: center;
    padding-top: 1rem;
    font-size: 0.9rem;
  }
  
  /*  */
  @media (max-width: 768px) {
    .footer-left {
      margin-left: 0;
      flex-direction: column;
      align-items: flex-start;
    }
  
    .footer-image {
      margin-bottom: 1rem;
    }
  }
  </style>