<script setup>
import { ref } from 'vue';
import { store } from '../store/eventStore';
import { X, Search, Ticket, Mail, CheckCircle2 } from 'lucide-vue-next';

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
  <div 
    v-if="store.activeModal === 'retrieve-tickets'"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-lg bg-white border border-[#E8E8E8] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      
      <!-- Close Button -->
      <button 
        @click="store.closeModal()"
        class="absolute top-5 right-5 p-2 rounded-full bg-[#FAFAFC] border border-[#E8E8E8] text-[#111111] hover:bg-[#F6F3FF]"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="space-y-2">
        <div class="w-12 h-12 rounded-2xl bg-[#F6F3FF] text-[#6C3BFF] flex items-center justify-center">
          <Ticket class="w-6 h-6" />
        </div>
        <h3 class="text-2xl font-extrabold text-[#111111] font-sans">Find your tickets</h3>
        <p class="text-xs text-[#676767]">Enter the email address you used when making your purchase.</p>
      </div>

      <div class="space-y-4">
        <div class="space-y-1">
          <label class="block text-xs font-bold text-[#111111]">Email Address</label>
          <div class="relative">
            <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D8D8D]" />
            <input 
              v-model="searchEmail"
              type="email"
              placeholder="e.g. alex.morgan@evently.ng"
              class="w-full pl-10 pr-3 py-2.5 rounded-xl glass-input text-xs text-[#111111] font-semibold"
            />
          </div>
        </div>

        <button
          @click="handleSearch"
          class="w-full py-3 rounded-xl text-xs font-bold gradient-purple-btn shadow-md flex items-center justify-center gap-2"
        >
          <Search class="w-4 h-4" />
          <span>Retrieve Tickets</span>
        </button>
      </div>

      <!-- Search Results -->
      <div v-if="hasSearched" class="space-y-3 pt-2">
        <div v-if="retrievedBookings.length > 0" class="space-y-2">
          <div class="text-xs font-bold text-[#16A34A] flex items-center gap-1">
            <CheckCircle2 class="w-4 h-4" /> Tickets Found!
          </div>
          
          <div 
            v-for="b in retrievedBookings" 
            :key="b.id"
            class="p-4 rounded-xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-2"
          >
            <div class="flex justify-between items-center text-xs font-bold text-[#111111]">
              <span>{{ b.eventTitle }}</span>
              <span class="text-[#6C3BFF]">{{ b.tierName }}</span>
            </div>
            <div class="text-[11px] text-[#676767] font-mono">Pass ID: {{ b.id }} · Status: {{ b.status }}</div>
            <button 
              @click="store.setModal('my-tickets')"
              class="w-full py-2 rounded-lg bg-[#6C3BFF] text-white text-xs font-bold shadow-xs mt-1"
            >
              Open Ticket Pass
            </button>
          </div>
        </div>

        <div v-else class="text-center py-4 text-xs text-[#676767]">
          No ticket bookings found matching this email.
        </div>
      </div>

    </div>
  </div>
</template>
