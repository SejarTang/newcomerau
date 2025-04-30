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

// Currently selected type to display
const selectedType = ref(null);

// References to map and markers
const map = ref(null);
const markers = ref([]);

// Location data
const clinics = ref([]);
const privateHospitals = ref([]);
const publicHospitals = ref([]);

// Marker color mapping by type
const markerColors = {
  clinic: 'blue',
  private: 'green',
  public: 'red'
};

// Fetch location data from API
const fetchData = async () => {
  const res = await axios.get('https://newcomerau.me/api/maplocations');
  clinics.value = res.data.clinics;
  privateHospitals.value = res.data.privateHospitals;
  publicHospitals.value = res.data.publicHospitals;
};

// Initialize the Leaflet map
const initMap = () => {
  map.value = L.map('map').setView([-37.8136, 144.9631], 11); // Melbourne
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value);
};

// Remove all existing markers from the map
const clearMarkers = () => {
  markers.value.forEach(marker => map.value.removeLayer(marker));
  markers.value = [];
};

// Add colored circle markers for given locations
const addMarkers = (locations, type) => {
  locations.forEach(loc => {
    const circleMarker = L.circleMarker([loc.latitude, loc.longitude], {
      radius: 8,
      fillColor: markerColors[type],
      color: '#ffffff',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });

const popupContent = `
  <div style="min-width:200px">
    <h4>${loc.clinic_name || loc.hos_name}</h4>
    ${loc.clinic_address || loc.hos_address ? `<p><strong>Address:</strong> ${loc.clinic_address || loc.hos_address}</p>` : ''}
    ${loc.phone ? `<p><strong>Phone:</strong> ${loc.phone}</p>` : ''}
    ${loc.rating ? `<p><strong>Rating:</strong> ${loc.rating}</p>` : ''}

    ${
      loc.service
        ? `<p><strong>Service:</strong> ${
            Array.isArray(loc.service)
              ? loc.service.join(', ')
              : (typeof loc.service === 'string' && loc.service.startsWith('['))
                ? JSON.parse(loc.service.replace(/'/g, '"')).join(', ')
                : loc.service
          }</p>`
        : ''
    }

    ${
      loc.opening_hours
        ? `<p><strong>Opening Hours:</strong></p>
          <div style="padding-left: 10px;">
            ${loc.opening_hours.split(',').map(day => `<p>${day.trim()}</p>`).join('')}
          </div>`
        : ''
    }
  </div>
`;


    circleMarker.bindPopup(popupContent);
    circleMarker.addTo(map.value);
    markers.value.push(circleMarker);
  });
};

// Watcher to update markers based on selected type
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

// Lifecycle hook: fetch data and initialize map
onMounted(async () => {
  await fetchData();
  initMap();
});
</script>

<style scoped>
.buttons {
  margin: 20px 0;
  display: flex;
  justify-content: center; /* Center horizontally */
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
