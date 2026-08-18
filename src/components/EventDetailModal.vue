<script setup>
import { store } from '../store/eventStore';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Share2, 
  Heart, 
  ShieldCheck, 
  Ticket, 
  User, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-vue-next';

const close = () => {
  store.closeModal();
};

const handleSelectTier = (tier) => {
  store.selectedTier = tier;
};

const proceedToCheckout = () => {
  store.activeModal = 'checkout';
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
  <div 
    v-if="store.activeModal === 'detail' && store.selectedEvent"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-4xl bg-white border border-[#E8E8E8] rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[92vh]">
      
      <!-- Sticky Banner Header -->
      <div class="relative h-64 sm:h-80 w-full overflow-hidden bg-gray-900 shrink-0">
        <img 
          :src="store.selectedEvent.image" 
          :alt="store.selectedEvent.title" 
          class="w-full h-full object-cover" 
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <!-- Close & Share Buttons -->
        <div class="absolute top-4 right-4 flex items-center gap-2">
          <button 
            @click="handleShare"
            class="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#111111] hover:bg-white transition-all shadow-md"
            title="Share Event"
          >
            <Share2 class="w-4 h-4" />
          </button>
          
          <button 
            @click="close"
            class="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#111111] hover:bg-white transition-all shadow-md"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Banner Overlay Text -->
        <div class="absolute bottom-6 left-6 right-6 text-white space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-[#6C3BFF] text-white text-[11px] font-extrabold shadow-sm">
              {{ store.selectedEvent.category }}
            </span>
            <span class="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">
              {{ store.selectedEvent.city }}, Nigeria
            </span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-extrabold font-sans leading-tight">
            {{ store.selectedEvent.title }}
          </h2>
        </div>
      </div>

      <!-- Main Body Grid: LEFT (Details 60%), RIGHT (Sticky Tickets 40%) -->
      <div class="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto custom-scrollbar flex-1">
        
        <!-- LEFT COLUMN: Info, Agenda, Performers (7 cols) -->
        <div class="lg:col-span-7 space-y-8 text-left">
          
          <!-- Organizer Row -->
          <div class="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8]">
            <img 
              :src="store.selectedEvent.organizerAvatar" 
              :alt="store.selectedEvent.organizer" 
              class="w-10 h-10 rounded-full object-cover border border-[#6C3BFF]/20" 
            />
            <div>
              <div class="text-[10px] font-extrabold uppercase text-[#6C3BFF]">Hosted by</div>
              <div class="text-xs font-bold text-[#111111] font-sans flex items-center gap-1">
                <span>{{ store.selectedEvent.organizer }}</span>
                <CheckCircle2 class="w-3.5 h-3.5 text-[#16A34A]" />
              </div>
            </div>
          </div>

          <!-- Date & Location Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="p-4 rounded-2xl bg-white border border-[#E8E8E8] space-y-1">
              <div class="flex items-center gap-2 text-[#6C3BFF] font-bold">
                <Calendar class="w-4 h-4" />
                <span>Date & Time</span>
              </div>
              <div class="font-bold text-[#111111] text-sm">{{ store.selectedEvent.formattedDate }}</div>
              <div class="text-[#676767]">{{ store.selectedEvent.time }}</div>
            </div>

            <div class="p-4 rounded-2xl bg-white border border-[#E8E8E8] space-y-1">
              <div class="flex items-center gap-2 text-[#6C3BFF] font-bold">
                <MapPin class="w-4 h-4" />
                <span>Venue Location</span>
              </div>
              <div class="font-bold text-[#111111] text-sm truncate">{{ store.selectedEvent.location }}</div>
              <div class="text-[#676767] truncate">{{ store.selectedEvent.venueAddress }}</div>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <h4 class="text-sm font-extrabold text-[#111111] font-sans uppercase tracking-wider">About This Event</h4>
            <p class="text-xs sm:text-sm text-[#676767] leading-relaxed font-normal">
              {{ store.selectedEvent.description }}
            </p>
          </div>

          <!-- Agenda Schedule -->
          <div v-if="store.selectedEvent.agenda" class="space-y-3">
            <h4 class="text-sm font-extrabold text-[#111111] font-sans uppercase tracking-wider">Event Schedule</h4>
            <div class="space-y-2">
              <div 
                v-for="item in store.selectedEvent.agenda" 
                :key="item.time"
                class="p-3 rounded-xl bg-[#FAFAFC] border border-[#E8E8E8] flex items-center gap-3 text-xs"
              >
                <span class="px-2.5 py-1 rounded-md bg-[#F6F3FF] text-[#6C3BFF] font-mono font-bold">{{ item.time }}</span>
                <span class="font-bold text-[#111111]">{{ item.title }}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: Sticky Ticket Purchase Card (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
          
          <div class="p-6 rounded-3xl bg-white border border-[#E8E8E8] shadow-xl space-y-6 sticky top-0">
            
            <div class="space-y-1 border-b border-[#E8E8E8] pb-4">
              <span class="text-[10px] uppercase font-bold text-[#6C3BFF] tracking-wider">Select Ticket Tier</span>
              <h3 class="text-lg font-extrabold text-[#111111] font-sans">Available Passes</h3>
            </div>

            <!-- Tier Selection Cards -->
            <div class="space-y-3">
              <div 
                v-for="tier in store.selectedEvent.tiers"
                :key="tier.id"
                @click="handleSelectTier(tier)"
                class="p-4 rounded-2xl border cursor-pointer transition-all duration-200 space-y-2 relative"
                :class="[
                  store.selectedTier?.id === tier.id 
                    ? 'border-[#6C3BFF] bg-[#F6F3FF] ring-2 ring-[#6C3BFF]/20 shadow-md' 
                    : 'border-[#E8E8E8] bg-white hover:border-[#6C3BFF]/40'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-extrabold text-[#111111] font-sans">{{ tier.name }}</span>
                  <span class="text-base font-extrabold text-[#6C3BFF] font-sans">{{ store.formatPrice(tier.price) }}</span>
                </div>
                
                <p class="text-xs text-[#676767] font-normal">{{ tier.description }}</p>

                <div v-if="tier.benefits" class="space-y-1 pt-1">
                  <div v-for="b in tier.benefits" :key="b" class="text-[11px] text-[#16A34A] font-semibold flex items-center gap-1">
                    ✓ <span>{{ b }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quantity Controls -->
            <div class="p-3.5 rounded-xl bg-[#FAFAFC] border border-[#E8E8E8] flex items-center justify-between text-xs">
              <span class="font-bold text-[#111111]">Quantity</span>
              <div class="flex items-center gap-3">
                <button 
                  @click="store.ticketQuantity = Math.max(1, store.ticketQuantity - 1)"
                  class="w-7 h-7 rounded-lg bg-white border text-[#111111] font-bold"
                >-</button>
                <span class="font-extrabold font-mono text-sm">{{ store.ticketQuantity }}</span>
                <button 
                  @click="store.ticketQuantity = Math.min(10, store.ticketQuantity + 1)"
                  class="w-7 h-7 rounded-lg bg-white border text-[#111111] font-bold"
                >+</button>
              </div>
            </div>

            <!-- Total & Checkout Button -->
            <div class="space-y-3 pt-2">
              <div class="flex items-center justify-between text-xs text-[#676767]">
                <span>Total Amount</span>
                <span class="text-xl font-extrabold text-[#111111] font-sans">
                  {{ store.formatPrice((store.selectedTier ? store.selectedTier.price : 0) * store.ticketQuantity) }}
                </span>
              </div>

              <button
                @click="proceedToCheckout"
                class="w-full py-3.5 rounded-xl text-xs font-bold text-white gradient-purple-btn shadow-lg flex items-center justify-center gap-2"
              >
                <Ticket class="w-4 h-4" />
                <span>Get Tickets</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>
