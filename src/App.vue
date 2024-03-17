<script setup>
import Content from './components/Content.vue'
import {ref, onMounted ,provide, watch } from 'vue'
import L from 'leaflet'
import iconLocation from './assets/images/icon-location.svg';
let map
let marker
let ip = ref('')
let address = ref('')
let location = ref('')
let lat = ref(0); 
let lng = ref(0); 
provide('ip', ip)
provide('address', address)
provide('location', location)
provide('lat', lat);
provide('lng', lng);

onMounted(() => {
    map = L.map('map').setView([lat.value, lng.value], 13);
    
    let customIcon = L.icon({
        iconUrl: iconLocation,
        iconSize: [50, 60],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });
    marker = L.marker([lat.value, lng.value], {icon: customIcon}).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    watch([lat, lng], () => {
      console.log('Parent Latitude:', lat.value);
      console.log('Parent Longitude:', lng.value);
      map.setView([lat.value, lng.value], 13);
      marker.setLatLng([lat.value, lng.value]);
  });
});
  
</script>

<template>
  <main class="m-0 p-0 box-content min-w-[375px] md:min-w-[1440px] w-screen min-h-screen font-rubik text-[18px] bg-blue-500 bg-opacity-40">
    <div class="relative hidden md:block">
      <img class="absolute -z-10 w-full h-[400px] " src="./assets/images/pattern-bg-desktop.png" alt="desktop">
    </div>
    <div class="relative block md:hidden">
      <img class="absolute -z-10 w-full h-[300px] " src="./assets/images/pattern-bg-mobile.png" alt="mobile">
    </div>
    <Content class="relative z-50"/>
    <div class="h-screen relative z-30 -mt-[150px] md:-mt-24" id="map"></div>
  </main>
</template>
