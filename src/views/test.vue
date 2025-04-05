<template>
    <div class="home">
      <div class="video-wrapper">
        <video autoplay muted loop playsinline class="bg-video">
          <source src="@/assets/house_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .home {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
  }
  
  .video-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .bg-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 0;
  }
  
  .content {
    position: absolute;
    z-index: 1;
    color: white;
    text-align: center;
  }
  </style>