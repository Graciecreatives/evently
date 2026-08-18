<script setup>
import { store } from '../store/eventStore';
import { X, Ticket, Calendar, MapPin, QrCode, Download, Share2 } from 'lucide-vue-next';

const close = () => {
  store.closeModal();
};

const handleDownload = (booking) => {
  store.addToast(`Downloaded E-Ticket ${booking.id}!`, 'success');
};
</script>

<template>
  <div 
    v-if="store.activeModal === 'my-tickets'"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-2xl bg-white border border-[#E8E8E8] rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]">
      
      <!-- Header -->
      <div class="p-5 sm:p-6 bg-[#F6F3FF] border-b border-[#E8E8E8] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-[#6C3BFF] text-white">
            <Ticket class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-lg font-extrabold text-[#111111] font-sans">My E-Ticket Wallet</h3>
            <div class="text-xs text-[#6C3BFF] font-medium">Your active digital QR passes</div>
          </div>
        </div>

        <button
          @click="close"
          class="p-2 rounded-full bg-white border border-[#E8E8E8] text-[#111111] hover:bg-[#F6F3FF]"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Tickets List -->
      <div class="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
        <div v-if="store.myBookings.length > 0" class="space-y-4">
          <div 
            v-for="b in store.myBookings" 
            :key="b.id"
            class="p-5 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-4 shadow-xs"
          >
            <div class="flex items-center justify-between border-b border-[#E8E8E8] pb-3">
              <div>
                <span class="text-[10px] font-extrabold uppercase text-[#6C3BFF]">Pass ID: {{ b.id }}</span>
                <h4 class="text-base font-extrabold text-[#111111] font-sans">{{ b.eventTitle }}</h4>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-[#16A34A] text-[10px] font-extrabold">CONFIRMED</span>
            </div>

            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span class="text-[10px] text-[#8D8D8D] uppercase font-bold block">Tier</span>
                <span class="font-bold text-[#111111]">{{ b.tierName }} ({{ b.quantity }}x)</span>
              </div>
              <div>
                <span class="text-[10px] text-[#8D8D8D] uppercase font-bold block">Date</span>
                <span class="font-bold text-[#111111]">{{ b.eventDate }} · {{ b.eventTime }}</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-white border border-[#E8E8E8] flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img 
                  :src="`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(b.qrCodeValue)}`" 
                  alt="QR Code"
                  class="w-14 h-14 object-contain border p-1 rounded"
                />
                <div>
                  <div class="text-xs font-bold text-[#111111]">Scannable Gate Pass</div>
                  <div class="text-[10px] text-[#16A34A] font-bold">Status: Ready for Scanner</div>
                </div>
              </div>

              <button 
                @click="handleDownload(b)"
                class="px-3 py-1.5 rounded-lg bg-[#6C3BFF] text-white text-xs font-bold shadow-xs hover:bg-[#5930D9]"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12 space-y-3">
          <Ticket class="w-12 h-12 text-[#8D8D8D] mx-auto opacity-50" />
          <div class="text-sm font-bold text-[#111111]">No active tickets found</div>
          <p class="text-xs text-[#676767]">Explore events around Nigeria and book your first experience!</p>
          <button @click="close" class="px-6 py-2.5 rounded-xl bg-[#6C3BFF] text-white text-xs font-bold shadow-md">
            Explore Events
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
