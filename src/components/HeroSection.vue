<script setup>
import { ref } from 'vue';
import { store } from '../store/eventStore';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Grid, 
  Sparkles, 
  ArrowRight,
  Ticket,
  Users,
  ShieldCheck
} from 'lucide-vue-next';

const categories = ['All categories', 'Raves & Parties', 'Concerts', 'Conferences', 'Comedy', 'Food & Drink', 'Festivals & Beach', 'Sports'];
const cities = ['Anywhere', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kano'];

const handleSearchSubmit = () => {
  store.navigateToView('discover');
};
</script>

<template>
  <section class="relative overflow-hidden bg-white pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EAEAEA]">
    
    <!-- Subtle orange background blur -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#FFF4EE] rounded-full blur-[140px] pointer-events-none -z-10"></div>

    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- HERO SPLIT LAYOUT: LEFT 45%, RIGHT 55% -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- LEFT COLUMN: Headline & CTAs -->
        <div class="lg:col-span-6 space-y-6 text-left">
          
          <!-- Small Orange Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF4EE] border border-[#FF5000]/20 text-xs font-bold text-[#FF5000]">
            <Sparkles class="w-3.5 h-3.5" />
            <span>Nigeria’s Premier Event Marketplace</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.1] font-sans">
            Your next great <br class="hidden sm:inline" />
            <span class="gradient-orange-text">experience</span> starts here.
          </h1>

          <p class="text-base sm:text-lg text-[#555555] font-normal leading-relaxed max-w-lg">
            Discover concerts, parties, conferences and unforgettable experiences happening around you. Get instant scannable digital tickets in Naira (₦).
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <button
              @click="store.navigateToView('discover')"
              class="px-7 py-3.5 rounded-xl text-sm font-bold gradient-orange-btn shadow-lg shadow-[#FF5000]/25 flex items-center gap-2"
            >
              <span>Explore Events</span>
              <ArrowRight class="w-4 h-4" />
            </button>

            <button
              @click="store.setModal('create-event')"
              class="px-6 py-3.5 rounded-xl text-sm font-bold text-[#111111] bg-white border border-[#EAEAEA] hover:border-[#FF5000] hover:bg-[#FFF4EE] transition-all"
            >
              Create an Event
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="pt-6 border-t border-[#F2F2F2] flex flex-wrap items-center gap-6 text-xs text-[#555555] font-semibold">
            <div class="flex items-center gap-2">
              <Ticket class="w-4 h-4 text-[#FF5000]" />
              <span>100K+ Tickets Sold</span>
            </div>
            <div class="flex items-center gap-2">
              <Users class="w-4 h-4 text-[#FF5000]" />
              <span>500+ Verified Organizers</span>
            </div>
            <div class="flex items-center gap-2">
              <ShieldCheck class="w-4 h-4 text-[#16A34A]" />
              <span>Paystack Secured</span>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: Nigerian Event Photography Collage (55%) -->
        <div class="lg:col-span-6 relative">
          <div class="grid grid-cols-2 gap-4 relative">
            
            <!-- Card 1: Beach Rave -->
            <div class="space-y-4">
              <div 
                @click="store.navigateToView('event-details', { event: store.events[0] })"
                class="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg group border border-[#EAEAEA] cursor-pointer"
              >
                <img 
                  src="/images/neon_music_festival.png" 
                  alt="Lagos Beach Rave" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="px-2.5 py-0.5 rounded-full bg-[#FF5000] text-[10px] font-extrabold uppercase">Raves & Parties</span>
                  <h4 class="text-sm font-bold font-sans mt-1">AfroWave Lagos 2026</h4>
                  <div class="text-[11px] text-white/80">Landmark Beach · ₦8,000</div>
                </div>
              </div>

              <!-- Card 2: Tech Summit -->
              <div 
                @click="store.navigateToView('event-details', { event: store.events[1] })"
                class="relative h-44 sm:h-48 rounded-2xl overflow-hidden shadow-md group border border-[#EAEAEA] cursor-pointer"
              >
                <img 
                  src="/images/tech_ai_summit.png" 
                  alt="Lagos Tech Summit" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div class="absolute bottom-3 left-3 right-3 text-white">
                  <span class="px-2 py-0.5 rounded bg-[#111111] text-[9px] font-extrabold uppercase">Conferences</span>
                  <h4 class="text-xs font-bold mt-1">Creator Economy Africa</h4>
                </div>
              </div>
            </div>

            <!-- Card 3: Food Gala & Comedy -->
            <div class="space-y-4 pt-6">
              <div 
                @click="store.navigateToView('event-details', { event: store.events[3] })"
                class="relative h-44 sm:h-48 rounded-2xl overflow-hidden shadow-md group border border-[#EAEAEA] cursor-pointer"
              >
                <img 
                  src="/images/gourmet_dining_gala.png" 
                  alt="Gourmet Dining Gala" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div class="absolute bottom-3 left-3 right-3 text-white">
                  <span class="px-2 py-0.5 rounded bg-[#FF5000] text-[9px] font-extrabold uppercase">Food & Galas</span>
                  <h4 class="text-xs font-bold mt-1">The Imperial Plum Gala</h4>
                </div>
              </div>

              <!-- Card 4: Comedy Show -->
              <div 
                @click="store.navigateToView('event-details', { event: store.events[5] })"
                class="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg group border border-[#EAEAEA] cursor-pointer"
              >
                <img 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80" 
                  alt="Nightlife Comedy Show" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="px-2.5 py-0.5 rounded-full bg-[#FF5000] text-[10px] font-extrabold uppercase">Comedy & Nightlife</span>
                  <h4 class="text-sm font-bold font-sans mt-1">Lagos Comedy Uncut</h4>
                  <div class="text-[11px] text-white/80">Muson Centre · ₦10,000</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- PROMINENT EVENT SEARCH BAR -->
      <div class="mt-12 lg:mt-16">
        <div class="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAEAEA] shadow-xl shadow-black/5">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            <!-- Search Keyword -->
            <div class="lg:col-span-4 relative">
              <label class="block text-[10px] font-extrabold uppercase text-[#FF5000] mb-1 ml-2">Search events</label>
              <div class="relative">
                <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input
                  v-model="store.searchQuery"
                  type="text"
                  placeholder="Search events, artists or organizers"
                  class="w-full pl-10 pr-3 py-2.5 rounded-xl glass-input text-xs font-semibold text-[#111111]"
                />
              </div>
            </div>

            <!-- Location City -->
            <div class="lg:col-span-3 relative">
              <label class="block text-[10px] font-extrabold uppercase text-[#FF5000] mb-1 ml-2">Location</label>
              <div class="relative">
                <MapPin class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <select
                  v-model="store.selectedCity"
                  class="w-full pl-10 pr-6 py-2.5 rounded-xl glass-input text-xs font-semibold text-[#111111] appearance-none cursor-pointer"
                >
                  <option v-for="c in cities" :key="c" :value="c">{{ c === 'Anywhere' ? 'Anywhere in Nigeria' : c + ', Nigeria' }}</option>
                </select>
              </div>
            </div>

            <!-- Category Dropdown -->
            <div class="lg:col-span-3 relative">
              <label class="block text-[10px] font-extrabold uppercase text-[#FF5000] mb-1 ml-2">Category</label>
              <div class="relative">
                <Grid class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <select
                  v-model="store.selectedCategory"
                  class="w-full pl-10 pr-6 py-2.5 rounded-xl glass-input text-xs font-semibold text-[#111111] appearance-none cursor-pointer"
                >
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
            </div>

            <!-- Search Action Button -->
            <div class="lg:col-span-2 pt-4 lg:pt-[18px]">
              <button
                @click="handleSearchSubmit"
                class="w-full py-2.5 px-4 rounded-xl text-xs font-bold gradient-orange-btn shadow-md flex items-center justify-center gap-1.5"
              >
                <Search class="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>
