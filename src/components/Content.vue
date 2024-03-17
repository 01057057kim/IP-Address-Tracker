<script setup>
import { ref , inject ,watch } from 'vue';

let  ip = inject('ip')
let address = inject('address')
let  location = inject('location')
const country = ref('')
const timezone = ref('')
const postal = ref('')
const isp = ref('')
let lat = inject('lat');
let lng = inject('lng');

const ipTracker = async () => {
    const get = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_MbiUYNLpuPOOQSqeWEkM25hpLqFfF&ipAddress=${ip.value}`)
    const data = await get.json();
    address.value = data.ip
    location.value = data.location.region
    country.value = data.location.country
    postal.value = data.location.postalCode
    timezone.value = data.location.timezone
    isp.value = data.isp
    lat.value = data.location.lat;
    lng.value = data.location.lng;
    
};

watch([lat, lng], () => {
    if (lat.value && lng.value) {
        console.log('Child Latitude:', lat.value);
        console.log('Child Longitude:', lng.value);
    }
});
</script>
<!--https://geo.ipify.org/docs and https://leafletjs.com-->
<template>
    <section class="flex flex-col items-center justify-center md:grid md:place-items-center min-w-[375px] md:w-auto md:min-h-[460px]">
        <div class="flex flex-col items-center justify-center w-[450px] md:w-[500px] mt-5 md:mt-10 md:gap-10 gap-3">
            <h1 class="font-semibold text-white text-2xl md:text-4xl tracking-[3px]">IP Address Tracker</h1>
            <div class="border border-transparent bg-white rounded-l-xl w-[300px] md:w-[500px] px-4 flex relative select-none -ml-[70px] md:-ml-0">
                <input v-model="ip" class="w-[500px] h-[51px] outline-none" type="text" placeholder="Search for any IP address or domain">
                <div class="hover:bg-opacity-85 cursor-pointer border border-transparent bg-v-d-gray rounded-r-xl  absolute -right-[70px] -top-[1px] flex items-center justify-center">
                    <button class="w-[70px] h-[53px] flex justify-center items-center" @click="ipTracker"><img src="../assets/images/icon-arrow.svg" alt=""></button>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center border border-transparent bg-white rounded-xl w-[368px] md:w-[900px] md:h-[150px] mt-5 md:mt-10 py-2 px-2 md:px-6 md:py-5 relative z-100 select-none">
            <ul class="flex flex-col md:flex-row w-[250px] md:w-[850px] md:text-start text-center">
                <div class="border-none md:border-r-2 md:border-solid border-d-gray md:w-[210px] md:h-[100px]">
                    <li class="uppercase text-sm md:text-lg text-d-gray font-medium md:mt-0 mt-4">IP Address</li>
                    <p class="mt-1 font-medium text-v-d-gray md:mb-0 mb-4">{{ address}}</p>
                </div>
                <div class="md:ml-4 md:border-r-2 md:border-solid border-d-gray md:w-[210px] md:h-[100px]">
                    <li class="uppercase text-sm md:text-lg text-d-gray font-medium">Location</li>
                    <p class="mt-1 font-medium text-v-d-gray md:mb-0 mb-4"> {{ location }} {{ country }} {{ postal }}</p>
                </div>
                <div class="md:ml-4 md:border-r-2 md:border-solid border-d-gray md:w-[210px] md:h-[100px]">
                    <li class="uppercase text-sm md:text-lg text-d-gray font-medium">Timezone</li>
                    <p class="mt-1 font-medium text-v-d-gray md:mb-0 mb-4">UTC {{ timezone }}</p>
                </div>
                <div class="md:ml-4 md:h-[100px]">
                    <li class="uppercase text-sm md:text-lg text-d-gray font-medium">ISP</li>
                    <p class="mt-1 font-medium text-v-d-gray md:mb-0 mb-4">{{ isp }}</p>
                </div>
            </ul>
        </div>
    </section>
    
</template>

