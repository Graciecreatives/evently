<script setup>
import { defineProps } from 'vue';
import { store } from '../store/eventStore';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Clock, 
  Sparkles,
  Ticket
} from 'lucide-vue-next';

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

const openEventDetails = () => {
  store.navigateToView('event-details', { event: props.event });
};

const toggleSave = (e) => {
  e.stopPropagation();
  store.toggleSaveEvent(props.event.id);
};
</script>

<template>
  <div 
    @click="openEventDetails"
    class="group bg-white rounded-2xl border border-[#EAEAEA] hover:border-[#FF5000]/50 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 cursor-pointer flex flex-col h-full relative"
  >
    <!-- Event Image Header -->
    <div class="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100 shrink-0">
      <img 
        :src="event.image" 
        :alt="event.title"
        class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        loading="lazy"
      />
      
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

      <!-- Category Pill (Top Left) -->
      <div class="absolute top-3 left-3">
        <span class="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-extrabold text-[#FF5000] shadow-xs">
          {{ event.category }}
        </span>
      </div>

      <!-- Heart Save Button (Top Right) -->
      <button 
        @click="toggleSave"
        class="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#111111] hover:text-[#FF5000] hover:scale-110 transition-all shadow-xs"
        title="Save Event"
      >
        <Heart 
          class="w-4 h-4 transition-colors" 
          :class="store.savedEventIds.has(event.id) ? 'fill-[#FF5000] text-[#FF5000]' : 'text-[#111111]'" 
        />
      </button>

      <!-- Ranking Badge (If Trending) -->
      <div v-if="event.ranking" class="absolute bottom-3 left-3">
        <span class="px-2.5 py-0.5 rounded-md bg-[#111111] text-white text-[10px] font-bold shadow-xs">
          #{{ event.ranking }} Trending
        </span>
      </div>

    </div>

    <!-- Event Body Content -->
    <div class="p-5 flex flex-col justify-between flex-1 space-y-4">
      
      <div class="space-y-2">
        <!-- Title -->
        <h3 class="text-lg sm:text-[19px] font-bold text-[#111111] font-sans leading-snug group-hover:text-[#FF5000] transition-colors line-clamp-2">
          {{ event.title }}
        </h3>

        <!-- Metadata List -->
        <div class="space-y-1.5 text-xs text-[#555555]">
          <!-- Date & Time -->
          <div class="flex items-center gap-2">
            <Calendar class="w-3.5 h-3.5 text-[#FF5000] shrink-0" />
            <span class="font-semibold text-[#111111]">{{ event.formattedDate || event.date }}</span>
          </div>

          <!-- Location & City -->
          <div class="flex items-center gap-2 truncate">
            <MapPin class="w-3.5 h-3.5 text-[#FF5000] shrink-0" />
            <span class="truncate">{{ event.location }}</span>
          </div>
        </div>
      </div>

      <!-- Card Footer: Price & Action CTA -->
      <div class="pt-3 border-t border-[#F2F2F2] flex items-center justify-between">
        <div>
          <span class="text-[10px] uppercase font-bold text-[#888888] block">Price</span>
          <span class="text-base font-extrabold text-[#111111] font-sans">
            <template v-if="event.tiers && event.tiers[0]">
              {{ event.tiers[0].price === 0 ? 'Free' : `From ${store.formatPrice(event.tiers[0].price)}` }}
            </template>
            <template v-else>
              From ₦5,000
            </template>
          </span>
        </div>

        <button 
          @click.stop="store.setModal('checkout', event)"
          class="px-3.5 py-2 rounded-xl text-xs font-bold text-[#FF5000] bg-[#FFF4EE] hover:bg-[#FF5000] hover:text-white transition-all shadow-xs flex items-center gap-1"
        >
          <Ticket class="w-3.5 h-3.5" />
          <span>Get Ticket</span>
        </button>
      </div>

    </div>
  </div>
</template>
