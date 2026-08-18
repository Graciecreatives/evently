<script setup>
import { ref } from 'vue';
import { store } from '../store/eventStore';
import { Search, Mail, Ticket, CheckCircle2, ArrowRight } from 'lucide-vue-next';

const searchEmail = ref('');
const retrievedBookings = ref([]);
const hasSearched = ref(false);

const handleSearch = () => {
  if (!searchEmail.value.includes('@')) {
    store.addToast('Please enter a valid email address', 'error');
    return;
  }

  hasSearched.value = true;
  retrievedBookings.value = store.myBookings.filter(b => 
    b.attendeeEmail.toLowerCase() === searchEmail.value.toLowerCase().trim()
  );

  if (retrievedBookings.value.length === 0) {
    store.addToast('No tickets found for this email address', 'info');
  } else {
    store.addToast(`Found ${retrievedBookings.value.length} active ticket pass(es)!`, 'success');
  }
};
</script>

<template>
  <div class="py-12 bg-white min-h-screen">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
      
      <div class="w-16 h-16 rounded-3xl bg-[#FFF4EE] text-[#FF5000] flex items-center justify-center mx-auto shadow-md">
        <Ticket class="w-8 h-8" />
      </div>

      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#111111] font-sans">
          Retrieve Your <span class="text-[#FF5000]">Event Tickets</span>
        </h1>
        <p class="text-xs sm:text-sm text-[#555555]">
          Lost your booking email? Enter the email address used during ticket purchase to retrieve your digital QR passes instantly.
        </p>
      </div>

      <div class="p-8 rounded-3xl bg-[#FAFAFA] border border-[#EAEAEA] shadow-md space-y-4 text-left">
        <div class="space-y-1">
          <label class="block text-xs font-bold text-[#111111]">Email Address Used for Purchase</label>
          <div class="relative">
            <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <input 
              v-model="searchEmail"
              type="email" 
              placeholder="e.g. alex.morgan@evently.ng"
              class="w-full pl-10 pr-4 py-3 rounded-xl glass-input bg-white text-xs font-bold text-[#111111]"
            />
          </div>
        </div>

        <button
          @click="handleSearch"
          class="w-full py-3.5 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md flex items-center justify-center gap-2"
        >
          <Search class="w-4 h-4" />
          <span>Find My Tickets</span>
        </button>
      </div>

      <!-- Search Results -->
      <div v-if="hasSearched" class="space-y-4 pt-4 text-left">
        <div v-if="retrievedBookings.length > 0" class="space-y-3">
          <div class="text-xs font-bold text-[#16A34A] flex items-center gap-1.5">
            <CheckCircle2 class="w-4 h-4" />
            <span>{{ retrievedBookings.length }} Ticket(s) Found!</span>
          </div>

          <div 
            v-for="b in retrievedBookings" 
            :key="b.id"
            class="p-5 rounded-2xl bg-white border border-[#EAEAEA] shadow-sm space-y-3"
          >
            <div class="flex justify-between items-center text-xs font-bold text-[#111111]">
              <span>{{ b.eventTitle }}</span>
              <span class="text-[#FF5000]">{{ b.tierName }}</span>
            </div>
            <div class="text-xs text-[#555555]">Date: {{ b.eventDate }} · Venue: {{ b.location }}</div>
            <button 
              @click="store.navigateToView('my-tickets')"
              class="w-full py-2.5 rounded-xl bg-[#FF5000] text-white text-xs font-bold shadow-xs"
            >
              Open E-Ticket Pass
            </button>
          </div>
        </div>

        <div v-else class="text-center py-8 text-xs text-[#555555] bg-[#FAFAFA] rounded-2xl border border-[#EAEAEA]">
          No bookings found under <span class="font-bold text-[#111111]">{{ searchEmail }}</span>.
        </div>
      </div>

    </div>
  </div>
</template>
