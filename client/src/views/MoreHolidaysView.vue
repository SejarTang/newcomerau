<template>
  <div class="festivals-page">
    <!-- Page header -->
    <div class="header-section">
      <h1>More Festivals</h1>
      <p>
        Beyond public holidays, these festivals are also beloved by locals in Victoria!
        Get involved, explore the cultural vibe, and become a part of your community!
      </p>
    </div>

    <!-- Festival card grid -->
    <div class="festival-grid">
      <!-- Render each festival as a clickable card -->
      <div
        v-for="festival in festivals"
        :key="festival.name"
        class="festival-card"
        :style="{ backgroundImage: `url(${festival.image})` }"
        @click="showDetails(festival)"
      >
        <!-- Text overlay on image -->
        <div class="festival-overlay">
          <h2 class="festival-name">{{ festival.name }}</h2>
          <p class="festival-date">{{ festival.date }}</p>
          <p class="click-hint">Click to learn more</p>
        </div>
      </div>
    </div>

    <!-- Popup modal with more festival details -->
    <div v-if="selectedFestival" class="modal-backdrop" @click.self="selectedFestival = null">
      <div class="modal-card">
        <h2>{{ selectedFestival.name }}</h2>
        <p class="modal-date">{{ selectedFestival.date }}</p>
        <img :src="selectedFestival.image" alt="Festival Image" />
        <p class="modal-description">{{ selectedFestival.description }}</p>
        <button @click="selectedFestival = null">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import festival images
import pako from '@/assets/more/pako.jpg'
import emerge from '@/assets/more/emerge.jpg'
import cny from '@/assets/more/cny.jpg'
import diwali from '@/assets/more/diwali.jpg'
import greek from '@/assets/more/greek.jpg'
import moomba from '@/assets/more/moomba.jpg'
import whitenight from '@/assets/more/whitenight.jpg'
import fringe from '@/assets/more/fringe.jpg'
import sustainable from '@/assets/more/sustainable.jpg'

// Reactive variable for currently selected festival (used in modal)
const selectedFestival = ref(null)

// Function to open the modal with selected festival's data
const showDetails = (festival) => {
  selectedFestival.value = festival
}

// Static list of festivals (could be fetched from API in real use)
const festivals = [
  {
    name: "Chinatown Lunar New Year",
    date: "29 January 2025",
    image: cny,
    description: "A major celebration in Melbourne’s Chinatown featuring dragon dances, Asian food markets, and traditional performances. Popular across all communities."
  },
  {
    name: "Sustainable Living Festival",
    date: "1–28 February 2025",
    image: sustainable,
    description: "A month-long festival focused on eco-conscious living. Includes workshops, panels, and community initiatives — ideal for eco-minded newcomers."
  },
  {
    name: "Pako Festa",
    date: "22 February 2025",
    image: pako,
    description: "Victoria’s largest multicultural street festival held in Geelong, featuring cultural parades, global cuisine stalls, and live performances. Ideal for families."
  },
  {
    name: "Lonsdale Street Greek Festival",
    date: "22 & 23 February 2025",
    image: greek,
    description: "One of Australia’s largest Greek cultural festivals filled with food, music, dance, and history. A lively weekend for cultural discovery."
  },
  {
    name: "Moomba Festival",
    date: "6–10 March 2025",
    image: moomba,
    description: "Melbourne’s largest free community festival with parades, waterski shows, fireworks, rides, and more. Fun for kids and families alike."
  },
  {
    name: "Emerge Festival",
    date: "23 & 24 August",
    image: emerge,
    description: "A celebration of art, music, and culture from new migrants and refugees, presented by Multicultural Arts Victoria. A powerful showcase of diversity."
  },
  {
    name: "Melbourne Fringe Festival",
    date: "30 September-19 October 2025",
    image: fringe,
    description: "An inclusive and creative festival supporting alternative art and performance. A great platform for migrants to share their voices."
  },
  {
    name: "Diwali Festival",
    date: "20 October 2025",
    image: diwali,
    description: "Held at Federation Square, Melbourne’s Diwali celebration features lights, Indian food, traditional dances, and family-friendly festivities."
  },
  {
    name: "White Night Melbourne",
    date: "TBA",
    image: whitenight,
    description: "An all-night city-wide celebration of light and art, where Melbourne is transformed by projections and performances. Visual and language barrier-free."
  }
];
</script>


<style scoped>
/* Full page layout with light gradient background */
.festivals-page {
  min-height: 100vh;
  background: linear-gradient(to right, #f9f9f9, #dceeff);
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  padding-top: 110px;
}

/* Header section: page title and intro text */
.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.header-section h1 {
  font-size: 2.5rem;
  color: #010912;
  font-weight: bold;
}

.header-section p {
  font-size: 2rem;
  color: #00060c;
  margin-top: 0.5rem;
}

/* Responsive grid layout for festival cards */
.festival-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.5rem;
}

/* Individual festival card styling */
.festival-card {
  position: relative;
  height: 500px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.festival-card:hover {
  transform: scale(1.05);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.3);
}

/* Text overlay on card */
.festival-overlay {
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
  width: 100%;
  padding: 1rem;
  color: white;
}

/* Festival name styling */
.festival-name {
  font-size: 2rem;
  font-weight: bold;
}

/* Festival date styling */
.festival-date {
  font-size: 1.5rem;
}

/* "Click to learn more" hint */
.click-hint {
  font-size: 1.2rem;
  opacity: 0.85;
}

/* Backdrop for modal popup */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

/* Modal content card */
.modal-card {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  padding: 2rem;
  text-align: center;
  animation: popIn 0.3s ease;
}

/* Image inside modal */
.modal-card img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin: 1rem 0;
  border-radius: 12px;
}

/* Close button */
.modal-card button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

/* Date text inside modal */
.modal-date {
  color: #777;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

/* Modal pop-in animation */
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
