<script setup>
import { store } from '../store/eventStore';
import EventCard from '../components/EventCard.vue';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Share2, 
  Heart, 
  ShieldCheck, 
  Ticket, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft
} from 'lucide-vue-next';

const handleSelectTier = (tier) => {
  store.selectedTier = tier;
};

const proceedToCheckout = () => {
  store.setModal('checkout', store.selectedEvent, store.selectedTier);
};

const handleShare = () => {
  if (navigator.share && store.selectedEvent) {
    navigator.share({
      title: store.selectedEvent.title,
      text: `Check out ${store.selectedEvent.title} on Evently!`,
      url: window.location.href
    }).catch(() => {});
  } else {
    store.addToast('Event link copied to clipboard!', 'success');
  }
};
</script>

<template>
  <div v-if="store.selectedEvent" class="bg-white min-h-screen pb-16">
    
    <!-- Top Back Breadcrumb Bar -->
    <div class="bg-[#FAFAFA] border-b border-[#EAEAEA] py-3">
      <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button 
          @click="store.navigateToView('discover')"
          class="text-xs font-bold text-[#111111] hover:text-[#FF5000] flex items-center gap-1.5"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to Discover Events</span>
        </button>

        <div class="flex items-center gap-2">
          <button 
            @click="store.toggleSaveEvent(store.selectedEvent.id)"
            class="p-2 rounded-xl bg-white border border-[#EAEAEA] text-[#111111] hover:text-[#FF5000] text-xs font-bold flex items-center gap-1"
          >
            <Heart class="w-4 h-4" :class="store.savedEventIds.has(store.selectedEvent.id) ? 'fill-[#FF5000] text-[#FF5000]' : ''" />
            <span>{{ store.savedEventIds.has(store.selectedEvent.id) ? 'Saved' : 'Save Event' }}</span>
          </button>

          <button 
            @click="handleShare"
            class="p-2 rounded-xl bg-white border border-[#EAEAEA] text-[#111111] hover:text-[#FF5000] text-xs font-bold flex items-center gap-1"
          >
            <Share2 class="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Hero Banner -->
    <div class="relative h-80 sm:h-96 w-full overflow-hidden bg-gray-900">
      <img 
        :src="store.selectedEvent.image" 
        :alt="store.selectedEvent.title" 
        class="w-full h-full object-cover" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div class="absolute bottom-8 left-0 right-0">
        <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-3">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-[#FF5000] text-white text-xs font-extrabold shadow-sm">
              {{ store.selectedEvent.category }}
            </span>
            <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
              {{ store.selectedEvent.city }}, Nigeria
            </span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-extrabold font-sans leading-tight">
            {{ store.selectedEvent.title }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Main Content Layout: LEFT (Details 65%), RIGHT (Sticky Tickets Panel 35%) -->
    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- LEFT COLUMN (7 cols) -->
        <div class="lg:col-span-7 space-y-8 text-left">
          
          <!-- Organizer Row -->
          <div class="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF4EE] border border-[#FF5000]/20">
            <img 
              :src="store.selectedEvent.organizerAvatar" 
              :alt="store.selectedEvent.organizer" 
              class="w-12 h-12 rounded-full object-cover border border-[#FF5000]/30" 
            />
            <div>
              <div class="text-[10px] font-extrabold uppercase text-[#FF5000]">Hosted by Verified Organizer</div>
              <div class="text-sm font-bold text-[#111111] font-sans flex items-center gap-1.5">
                <span>{{ store.selectedEvent.organizer }}</span>
                <CheckCircle2 class="w-4 h-4 text-[#16A34A]" />
              </div>
            </div>
          </div>

          <!-- Key Info Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="p-5 rounded-2xl bg-white border border-[#EAEAEA] space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-[#FF5000] font-bold">
                <Calendar class="w-4 h-4" />
                <span>Date & Time</span>
              </div>
              <div class="font-extrabold text-[#111111] text-base">{{ store.selectedEvent.formattedDate }}</div>
              <div class="text-[#555555]">{{ store.selectedEvent.time }}</div>
            </div>

            <div class="p-5 rounded-2xl bg-white border border-[#EAEAEA] space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-[#FF5000] font-bold">
                <MapPin class="w-4 h-4" />
                <span>Venue Location</span>
              </div>
              <div class="font-extrabold text-[#111111] text-base truncate">{{ store.selectedEvent.location }}</div>
              <div class="text-[#555555] truncate">{{ store.selectedEvent.venueAddress }}</div>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-3">
            <h3 class="text-base font-extrabold text-[#111111] font-sans uppercase tracking-wider">About This Event</h3>
            <p class="text-sm text-[#555555] leading-relaxed font-normal">
              {{ store.selectedEvent.description }}
            </p>
          </div>

          <!-- Agenda Schedule -->
          <div v-if="store.selectedEvent.agenda" class="space-y-3">
            <h3 class="text-base font-extrabold text-[#111111] font-sans uppercase tracking-wider">Event Agenda Schedule</h3>
            <div class="space-y-2">
              <div 
                v-for="item in store.selectedEvent.agenda" 
                :key="item.time"
                class="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] flex items-center gap-4 text-xs"
              >
                <span class="px-3 py-1 rounded-lg bg-[#FFF4EE] text-[#FF5000] font-mono font-bold">{{ item.time }}</span>
                <span class="font-bold text-[#111111] text-sm">{{ item.title }}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: Sticky Ticket Purchase Card (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAEAEA] shadow-xl space-y-6 sticky top-24">
            
            <div class="space-y-1 border-b border-[#EAEAEA] pb-4">
              <span class="text-[10px] uppercase font-bold text-[#FF5000] tracking-wider">Select Ticket Tier</span>
              <h3 class="text-xl font-extrabold text-[#111111] font-sans">Available Passes</h3>
            </div>

            <!-- Tiers Selection Cards -->
            <div class="space-y-3">
              <div 
                v-for="tier in store.selectedEvent.tiers"
                :key="tier.id"
                @click="handleSelectTier(tier)"
                class="p-4 rounded-2xl border cursor-pointer transition-all duration-200 space-y-2"
                :class="[
                  store.selectedTier?.id === tier.id 
                    ? 'border-[#FF5000] bg-[#FFF4EE] ring-2 ring-[#FF5000]/20 shadow-md' 
                    : 'border-[#EAEAEA] bg-white hover:border-[#FF5000]/40'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-extrabold text-[#111111] font-sans">{{ tier.name }}</span>
                  <span class="text-base font-extrabold text-[#FF5000] font-sans">{{ store.formatPrice(tier.price) }}</span>
                </div>
                
                <p class="text-xs text-[#555555] font-normal">{{ tier.description }}</p>

                <div v-if="tier.benefits" class="space-y-1 pt-1">
                  <div v-for="b in tier.benefits" :key="b" class="text-[11px] text-[#16A34A] font-semibold flex items-center gap-1">
                    ✓ <span>{{ b }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="p-4 rounded-xl bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-between text-xs">
              <span class="font-bold text-[#111111]">Quantity</span>
              <div class="flex items-center gap-3">
                <button 
                  @click="store.ticketQuantity = Math.max(1, store.ticketQuantity - 1)"
                  class="w-8 h-8 rounded-lg bg-white border border-[#EAEAEA] text-[#111111] font-bold hover:bg-[#FFF4EE]"
                >-</button>
                <span class="font-extrabold font-mono text-base">{{ store.ticketQuantity }}</span>
                <button 
                  @click="store.ticketQuantity = Math.min(10, store.ticketQuantity + 1)"
                  class="w-8 h-8 rounded-lg bg-white border border-[#EAEAEA] text-[#111111] font-bold hover:bg-[#FFF4EE]"
                >+</button>
              </div>
            </div>

            <!-- Total & Checkout Button -->
            <div class="space-y-3 pt-2">
              <div class="flex items-center justify-between text-xs text-[#555555]">
                <span>Total Amount</span>
                <span class="text-2xl font-extrabold text-[#111111] font-sans">
                  {{ store.formatPrice((store.selectedTier ? store.selectedTier.price : 0) * store.ticketQuantity) }}
                </span>
              </div>

              <button
                @click="proceedToCheckout"
                class="w-full py-4 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-lg flex items-center justify-center gap-2"
              >
                <Ticket class="w-4 h-4" />
                <span>Get Tickets Now</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
