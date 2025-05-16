<template>
  <div>
    <!-- Top margin to separate from previous section -->
    <div class="top-space"></div>

    <!-- Description text above the map -->
    <div id="medical-map" class="description">
      <h2>Facilities Map</h2>
      <p>
        This interactive map displays the locations of medical facilities and education providers in Melbourne. 
        By clicking the buttons below, you can toggle between different facility types and view their locations on the map. 
        Clicking on a marker will show detailed information about the facility.
        You can also click the "Go Here" button in each popup to automatically plan a route from your current location to the selected facility, using real street routes.
      </p>
    </div>

    <!-- Type selection buttons -->
    <div class="buttons">
      <button @click="selectedType = 'clinic'">Clinics</button>
      <button @click="selectedType = 'private'">Private Hospitals</button>
      <button @click="selectedType = 'public'">Public Hospitals</button>
      <button @click="selectedType = 'school'">Schools</button>
    </div>

    <!-- Map container -->
    <div id="map" style="height: 80vh;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import L from 'leaflet';

// Selected type to display
const selectedType = ref(null);

// Map and data references
const map = ref(null);
const markers = ref([]);
const userLocation = ref(null);
const routeLine = ref(null);

// Location data arrays
const clinics = ref([]);
const privateHospitals = ref([]);
const publicHospitals = ref([]);
const schools = ref([]); // New array for education providers

// Marker color by type
const markerColors = {
  clinic: 'blue',
  private: 'green',
  public: 'red',
  school: 'purple' // Add color for schools
};

// OpenRouteService API key
const ORS_API_KEY = '5b3ce3597851110001cf62481ccf2b8c2eda4e2988f0bfe478b7dc28';

// Fetch locations from API
const fetchData = async () => {
  const res = await axios.get('https://newcomerau.me/api/maplocations');
  clinics.value = res.data.clinics;
  privateHospitals.value = res.data.privateHospitals;
  publicHospitals.value = res.data.publicHospitals;
  schools.value = res.data.schools; // Add schools data
};

// Initialize the Leaflet map and get user location
const initMap = () => {
  map.value = L.map('map').setView([-37.8136, 144.9631], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value);

  // Get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      userLocation.value = [latitude, longitude];
      L.marker(userLocation.value).addTo(map.value).bindPopup('Your Location').openPopup();
    });
  }
};

// Remove all markers and existing route from map
const clearMarkers = () => {
  markers.value.forEach(marker => map.value.removeLayer(marker));
  markers.value = [];
  if (routeLine.value) {
    map.value.removeLayer(routeLine.value);
    routeLine.value = null;
  }
};

// Add markers for selected locations
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

    // Build popup content
    const popupContent = document.createElement('div');
    popupContent.style.minWidth = '200px';

    // Different content structure for schools vs medical facilities
    if (type === 'school') {
      popupContent.innerHTML = `
        <h4>${loc.provider_name}</h4>
        <p><strong>Type:</strong> ${loc.provider_type}</p>
        <p><strong>Address:</strong> ${loc.provider_address}</p>
        ${loc.suburb ? `<p><strong>Suburb:</strong> ${loc.suburb}</p>` : ''}
        ${loc.postcode ? `<p><strong>Postcode:</strong> ${loc.postcode}</p>` : ''}
        ${loc.phone ? `<p><strong>Phone:</strong> ${loc.phone}</p>` : ''}
        ${loc.rating ? `<p><strong>Rating:</strong> ${loc.rating}</p>` : ''}
      `;
    } else {
      popupContent.innerHTML = `
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
      `;
    }

    // Add Go Here button
    const goButton = document.createElement('button');
    goButton.textContent = 'Go Here';
    goButton.style.marginTop = '10px';
    goButton.style.padding = '5px 10px';
    goButton.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('navigate-to', {
        detail: { lat: loc.latitude, lng: loc.longitude }
      }));
    });

    popupContent.appendChild(goButton);
    circleMarker.bindPopup(popupContent);
    circleMarker.addTo(map.value);
    markers.value.push(circleMarker);
  });
};

// Watch selectedType and update map
watch(selectedType, (newType) => {
  clearMarkers();
  if (newType === 'clinic') {
    addMarkers(clinics.value, 'clinic');
  } else if (newType === 'private') {
    addMarkers(privateHospitals.value, 'private');
  } else if (newType === 'public') {
    addMarkers(publicHospitals.value, 'public');
  } else if (newType === 'school') {
    addMarkers(schools.value, 'school');
  }
});

// Listen for Go Here button event and draw real-world route using OpenRouteService API
window.addEventListener('navigate-to', async (e) => {
  if (!userLocation.value) {
    alert('User location not available.');
    return;
  }

  const start = userLocation.value;
  const end = [e.detail.lat, e.detail.lng];

  try {
    const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
      params: {
        api_key: ORS_API_KEY,
        start: `${start[1]},${start[0]}`, // lon,lat
        end: `${end[1]},${end[0]}`       // lon,lat
      }
    });

    const coords = response.data.features[0].geometry.coordinates;
    const latlngs = coords.map(c => [c[1], c[0]]); // Convert [lng, lat] to [lat, lng]

    if (routeLine.value) {
      map.value.removeLayer(routeLine.value);
    }

    routeLine.value = L.polyline(latlngs, { color: 'red', weight: 4 }).addTo(map.value);
    map.value.fitBounds(routeLine.value.getBounds(), { padding: [50, 50] });

  } catch (error) {
    console.error('Error fetching route:', error);
    alert('Failed to get route. Please try again.');
  }
});

// Run when component is mounted
onMounted(async () => {
  await fetchData();
  initMap();
});
</script>

<style scoped>
.top-space {
  margin-top: 50px;
}

.description {
  text-align: center;
  margin-bottom: 20px;
  padding: 0 15px;
}

.buttons {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #1976d2;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  min-width: 120px;
}

button:hover {
  background-color: #115293;
}
</style>
