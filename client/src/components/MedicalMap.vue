<template>
    <div>
      <div class="buttons">
        <button @click="selectedType = 'clinic'">Clinics</button>
        <button @click="selectedType = 'private'">Private Hospitals</button>
        <button @click="selectedType = 'public'">Public Hospitals</button>
      </div>
      <div id="map" style="height: 80vh;"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import L from 'leaflet';
  
  const selectedType = ref('clinic');
  const map = ref(null);
  const markers = ref([]);
  
  const clinics = ref([]);
  const privateHospitals = ref([]);
  const publicHospitals = ref([]);
  
  const markerColors = {
    clinic: 'blue',
    private: 'green',
    public: 'red'
  };
  
  const fetchData = async () => {
    // const res = await axios.get('/api/map-locations');
    const res = await axios.get('https://newcomerau.me/api/map-locations');

    clinics.value = res.data.clinics;
    privateHospitals.value = res.data.privateHospitals;
    publicHospitals.value = res.data.publicHospitals;
  };
  
  const initMap = () => {
    map.value = L.map('map').setView([-37.8136, 144.9631], 11); // Melbourne
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.value);
  };
  
  const clearMarkers = () => {
    markers.value.forEach(marker => map.value.removeLayer(marker));
    markers.value = [];
  };
  
  const addMarkers = (locations, type) => {
    locations.forEach(loc => {
      const marker = L.marker([loc.latitude, loc.longitude], {
        icon: L.icon({
          iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${markerColors[type]}`,
          iconSize: [21, 34],
          iconAnchor: [10, 34],
          popupAnchor: [0, -30]
        })
      });
  
      const popupContent = `
        <div style="min-width:200px">
          <h4>${loc.clinic_name || loc.hos_name}</h4>
          <p><strong>Address:</strong> ${loc.clinic_address || loc.hos_address}</p>
          <p><strong>Phone:</strong> ${loc.phone || 'N/A'}</p>
          <p><strong>Rating:</strong> ${loc.rating || 'N/A'}</p>
          <p><strong>Service:</strong> ${loc.service || 'N/A'}</p>
          <p><strong>Opening Hours:</strong> ${loc.opening_hours || 'N/A'}</p>
        </div>
      `;
  
      marker.bindPopup(popupContent);
      marker.addTo(map.value);
      markers.value.push(marker);
    });
  };
  
  watch(selectedType, (newType) => {
    clearMarkers();
    if (newType === 'clinic') {
      addMarkers(clinics.value, 'clinic');
    } else if (newType === 'private') {
      addMarkers(privateHospitals.value, 'private');
    } else if (newType === 'public') {
      addMarkers(publicHospitals.value, 'public');
    }
  });
  
  onMounted(async () => {
    await fetchData();
    initMap();
    addMarkers(clinics.value, 'clinic'); // show clinics
  });
  </script>
  
  <style scoped>
  .buttons {
    margin: 10px;
    display: flex;
    gap: 10px;
  }
  button {
    padding: 10px 20px;
    border: none;
    background-color: #1976d2;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #115293;
  }
  </style>
  