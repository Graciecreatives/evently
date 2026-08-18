<script setup>
import { computed } from 'vue';
import { store } from '../store/eventStore';
import EventCard from './EventCard.vue';
import { 
  Flame, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  QrCode, 
  Tag, 
  ArrowRight, 
  Ticket,
  ChevronRight
} from 'lucide-vue-next';

const featuredEvents = computed(() => store.events.filter(e => e.featured));
const raveEvents = computed(() => store.events.filter(e => e.category === 'Raves & Parties' || e.raveParty));
const trendingEvents = computed(() => store.events.filter(e => e.trending));
const lagosEvents = computed(() => store.events.filter(e => e.city === 'Lagos'));
const budgetEvents = computed(() => store.events.filter(e => e.tiers.some(t => t.price <= 10000)));

const citiesList = [
  { name: 'Lagos', count: 124, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80' },
  { name: 'Abuja', count: 68, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80' },
  { name: 'Port Harcourt', count: 42, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80' },
  { name: 'Ibadan', count: 35, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80' },
  { name: 'Enugu', count: 28, image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&auto=format&fit=crop&q=80' },
  { name: 'Kano', count: 19, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80' }
];

const selectCity = (cityName) => {
  store.navigateToView('cities', { city: cityName });
};
</script>

<template>
  <div class="space-y-20 py-8">
    
    <!-- FEATURED EVENTS -->
    <section class="space-y-6">
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#111111] font-sans">Featured events</h2>
          <p class="text-xs sm:text-sm text-[#555555] font-medium mt-1">Events we're excited about right now</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <EventCard 
          v-for="event in featuredEvents.slice(0, 4)" 
          :key="event.id" 
          :event="event" 
        />
      </div>
    </section>

    <!-- RAVES & PARTIES (Horizontal Scrollable) -->
    <section v-if="raveEvents.length > 0" class="space-y-6">
      <div class="flex items-end justify-between">
        <div>
          <div class="flex items-center gap-2">
            <Flame class="w-6 h-6 text-[#FF5000]" />
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#111111] font-sans">Raves & parties</h2>
          </div>
          <p class="text-xs sm:text-sm text-[#555555] font-medium mt-1">Nightlife-first picks</p>
        </div>
        <button 
          @click="store.navigateToView('categories', { category: 'Raves & Parties' })"
          class="text-xs font-bold text-[#FF5000] hover:underline flex items-center gap-1"
        >
          <span>View all</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      </div>

      <div class="flex items-center gap-6 overflow-x-auto pb-4 custom-scrollbar">
        <div 
          v-for="event in raveEvents" 
          :key="event.id" 
          class="w-72 sm:w-80 shrink-0"
        >
          <EventCard :event="event" />
        </div>
      </div>
    </section>

    <!-- TRENDING EVENTS -->
    <section class="space-y-6">
      <div class="flex items-end justify-between">
        <div>
          <div class="flex items-center gap-2">
            <TrendingUp class="w-6 h-6 text-[#FF5000]" />
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#111111] font-sans">Trending events</h2>
          </div>
          <p class="text-xs sm:text-sm text-[#555555] font-medium mt-1">Events people are booking right now</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <EventCard 
          v-for="event in trendingEvents.slice(0, 3)" 
          :key="event.id" 
          :event="event" 
        />
      </div>
    </section>

    <!-- EVENTS IN LAGOS -->
    <section class="space-y-6">
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#111111] font-sans">Events in {{ store.selectedCity === 'All' ? 'Lagos' : store.selectedCity }}</h2>
          <p class="text-xs sm:text-sm text-[#555555] font-medium mt-1">Local experiences happening near you</p>
        </div>
        <button 
          @click="store.navigateToView('cities')"
          class="text-xs font-bold text-[#FF5000] hover:underline"
        >
          Change city
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <EventCard 
          v-for="event in lagosEvents.slice(0, 3)" 
          :key="event.id" 
          :event="event" 
        />
      </div>
    </section>

    <!-- EVENTS UNDER ₦10,000 -->
    <section class="space-y-6">
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#111111] font-sans">Events under ₦10,000</h2>
          <p class="text-xs sm:text-sm text-[#555555] font-medium mt-1">Good experiences don't have to break the bank.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <EventCard 
          v-for="event in budgetEvents.slice(0, 4)" 
          :key="event.id" 
          :event="event" 
        />
      </div>
    </section>

    <!-- BROWSE BY CITY -->
    <section class="space-y-6">
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#111111] font-sans">What's happening around Nigeria?</h2>
          <p class="text-xs sm:text-sm text-[#555555] font-medium mt-1">Explore events in Nigeria's most active cities.</p>
        </div>
        <button 
          @click="store.navigateToView('cities')"
          class="text-xs font-bold text-[#FF5000] hover:underline flex items-center gap-1"
        >
          <span>All Cities</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="c in citiesList"
          :key="c.name"
          @click="selectCity(c.name)"
          class="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-[#EAEAEA] shadow-xs hover:shadow-lg transition-all"
        >
          <img :src="c.image" :alt="c.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
          <div class="absolute bottom-3 left-3 right-3 text-white">
            <h4 class="text-base font-bold font-sans">{{ c.name }}</h4>
            <div class="text-[11px] text-white/80 flex items-center justify-between mt-0.5">
              <span>{{ c.count }} events</span>
              <ChevronRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ORGANIZER BENEFIT SECTION (Soft Orange Tint) -->
    <section class="p-8 sm:p-12 rounded-3xl bg-[#FFF4EE] border border-[#FF5000]/20 space-y-10">
      <div class="max-w-2xl text-left space-y-3">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#111111] font-sans leading-tight">
          Everything you need to sell out your next event.
        </h2>
        <p class="text-sm sm:text-base text-[#555555] font-normal">
          Create your event, sell tickets, manage guests and track performance from one simple dashboard.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="p-6 rounded-2xl bg-white border border-[#EAEAEA] space-y-3 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF5000] flex items-center justify-center">
            <ShieldCheck class="w-5 h-5" />
          </div>
          <h4 class="text-base font-bold text-[#111111] font-sans">Secure Payments</h4>
          <p class="text-xs text-[#555555] font-normal leading-relaxed">
            Accept Nigerian card, bank transfer and USSD payment methods securely via Paystack.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-[#EAEAEA] space-y-3 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF5000] flex items-center justify-center">
            <Zap class="w-5 h-5" />
          </div>
          <h4 class="text-base font-bold text-[#111111] font-sans">Fast Payouts</h4>
          <p class="text-xs text-[#555555] font-normal leading-relaxed">
            Track real-time earnings and request instant payouts directly to your Nigerian bank account.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-[#EAEAEA] space-y-3 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF5000] flex items-center justify-center">
            <QrCode class="w-5 h-5" />
          </div>
          <h4 class="text-base font-bold text-[#111111] font-sans">QR Check-in</h4>
          <p class="text-xs text-[#555555] font-normal leading-relaxed">
            Scan attendee tickets instantly at venue entrance from any smartphone or device.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-[#EAEAEA] space-y-3 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF5000] flex items-center justify-center">
            <Tag class="w-5 h-5" />
          </div>
          <h4 class="text-base font-bold text-[#111111] font-sans">Promo Codes</h4>
          <p class="text-xs text-[#555555] font-normal leading-relaxed">
            Create discount codes, early-bird tickets, and private VIP invitations effortlessly.
          </p>
        </div>

      </div>
    </section>

    <!-- HOW EVENTLY WORKS -->
    <section class="space-y-10 text-center max-w-4xl mx-auto">
      <div class="space-y-2">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#111111] font-sans">Going out just got easier.</h2>
        <p class="text-sm text-[#555555]">3 simple steps to your next experience</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 rounded-2xl bg-white border border-[#EAEAEA] space-y-3 text-left shadow-xs relative">
          <span class="text-3xl font-extrabold text-[#FF5000] font-mono">01</span>
          <h3 class="text-lg font-bold text-[#111111]">Discover</h3>
          <p class="text-xs text-[#555555] leading-relaxed">Find events based on your city, interests, budget, and mood.</p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-[#EAEAEA] space-y-3 text-left shadow-xs relative">
          <span class="text-3xl font-extrabold text-[#FF5000] font-mono">02</span>
          <h3 class="text-lg font-bold text-[#111111]">Book</h3>
          <p class="text-xs text-[#555555] leading-relaxed">Choose your ticket type and pay securely online in Naira (₦).</p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-[#EAEAEA] space-y-3 text-left shadow-xs relative">
          <span class="text-3xl font-extrabold text-[#FF5000] font-mono">03</span>
          <h3 class="text-lg font-bold text-[#111111]">Show up</h3>
          <p class="text-xs text-[#555555] leading-relaxed">Receive your digital QR ticket pass and scan it at the entrance.</p>
        </div>
      </div>
    </section>

    <!-- ORGANIZER CTA (Pitch Black & Orange) -->
    <section class="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] text-white space-y-6 shadow-2xl relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-[#FF5000]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-2xl space-y-4 relative z-10">
        <h2 class="text-3xl sm:text-4xl font-extrabold font-sans">Got an event people should know about?</h2>
        <p class="text-sm text-gray-300">Create your event in minutes and start selling tickets across Nigeria with Evently.</p>
      </div>

      <div class="flex flex-wrap gap-3 relative z-10 pt-2">
        <button
          @click="store.setModal('create-event')"
          class="px-7 py-3.5 rounded-xl text-sm font-bold gradient-orange-btn shadow-lg flex items-center gap-2"
        >
          <span>Create Event</span>
          <ArrowRight class="w-4 h-4" />
        </button>

        <button
          @click="store.navigateToView('organizer')"
          class="px-6 py-3.5 rounded-xl text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-all"
        >
          See Organizer Features
        </button>
      </div>
    </section>

  </div>
</template>
