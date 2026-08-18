<script setup>
import { store } from '../store/eventStore';
import EventCard from '../components/EventCard.vue';
import { MapPin, ChevronRight, ArrowRight } from 'lucide-vue-next';

const citiesList = [
  { name: 'Lagos', state: 'Lagos State', count: 124, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80', description: 'Victoria Island, Ikoyi, Lekki Phase 1, Landmark Beach, Eko Hotel' },
  { name: 'Abuja', state: 'FCT', count: 68, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80', description: 'Maitama, Wuse 2, Jabi Lake Mall, International Conference Centre' },
  { name: 'Port Harcourt', state: 'Rivers State', count: 42, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80', description: 'GRA Phase 2, Pleasure Park, Stadium Road, Atlantic Hall' },
  { name: 'Ibadan', state: 'Oyo State', count: 35, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80', description: 'Bodija, Ring Road, Agodi Gardens, Cultural Centre' },
  { name: 'Enugu', state: 'Enugu State', count: 28, image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80', description: 'Independence Layout, New Haven, Polo Park Mall' },
  { name: 'Kano', state: 'Kano State', count: 19, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80', description: 'Nasarawa GRA, Trade Fair Complex, Bayero University Campus' }
];

const selectCity = (cityName) => {
  store.navigateToView('discover', { city: cityName });
};
</script>

<template>
  <div class="py-10 bg-white min-h-screen">
    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <!-- Page Header -->
      <div class="text-left space-y-2 border-b border-[#EAEAEA] pb-6">
        <span class="px-3.5 py-1 rounded-full bg-[#FFF4EE] border border-[#FF5000]/20 text-xs font-bold text-[#FF5000]">City Hub</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#111111] font-sans">
          Events Across <span class="text-[#FF5000]">Nigeria</span>
        </h1>
        <p class="text-xs sm:text-sm text-[#555555]">
          Select your city to view verified local experiences, nightlife, conferences & concerts.
        </p>
      </div>

      <!-- Cities Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="c in citiesList"
          :key="c.name"
          @click="selectCity(c.name)"
          class="group relative h-72 rounded-3xl overflow-hidden cursor-pointer border border-[#EAEAEA] shadow-md hover:shadow-2xl transition-all"
        >
          <img :src="c.image" :alt="c.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          <div class="absolute top-4 right-4">
            <span class="px-3 py-1 rounded-full bg-[#FF5000] text-white text-[11px] font-extrabold shadow-sm">
              {{ c.count }} Active Events
            </span>
          </div>

          <div class="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
            <span class="text-xs font-bold text-[#FF5000] uppercase tracking-wider">{{ c.state }}</span>
            <h3 class="text-2xl font-extrabold font-sans leading-tight">{{ c.name }}</h3>
            <p class="text-xs text-gray-300 font-normal line-clamp-1">{{ c.description }}</p>
            
            <div class="pt-2 flex items-center gap-1 text-xs font-bold text-[#FF5000] group-hover:translate-x-1 transition-transform">
              <span>Browse {{ c.name }} Events</span>
              <ArrowRight class="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Events in Selected City -->
      <div class="pt-8 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-extrabold text-[#111111] font-sans">Lagos Nightlife Spotlight</h2>
          <button @click="selectCity('Lagos')" class="text-xs font-bold text-[#FF5000] hover:underline">View All Lagos Events</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <EventCard 
            v-for="e in store.events.filter(x => x.city === 'Lagos').slice(0, 3)" 
            :key="e.id" 
            :event="e" 
          />
        </div>
      </div>

    </div>
  </div>
</template>
