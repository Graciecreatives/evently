<script setup>
import { store } from '../store/eventStore';
import { Ticket, Calendar, MapPin, QrCode, Download, Share2, ArrowRight } from 'lucide-vue-next';

const handleDownload = (booking) => {
  store.addToast(`Downloaded E-Ticket Pass ${booking.id} as PDF!`, 'success');
};
</script>

<template>
  <div class="py-10 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Header -->
      <div class="text-left space-y-2 border-b border-[#EAEAEA] pb-6">
        <span class="px-3.5 py-1 rounded-full bg-[#FFF4EE] border border-[#FF5000]/20 text-xs font-bold text-[#FF5000]">Ticket Wallet</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#111111] font-sans">
          My Digital <span class="text-[#FF5000]">E-Tickets</span>
        </h1>
        <p class="text-xs sm:text-sm text-[#555555]">
          All your active passes, scannable gate QR codes, and booking history in one place.
        </p>
      </div>

      <!-- Bookings List -->
      <div v-if="store.myBookings.length > 0" class="space-y-6">
        <div 
          v-for="b in store.myBookings" 
          :key="b.id"
          class="p-6 rounded-3xl bg-[#FAFAFA] border border-[#EAEAEA] shadow-md space-y-6"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAEAEA] pb-4 gap-2">
            <div>
              <span class="text-[10px] font-extrabold uppercase text-[#FF5000]">Pass ID: {{ b.id }}</span>
              <h3 class="text-xl font-extrabold text-[#111111] font-sans">{{ b.eventTitle }}</h3>
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-100 text-[#16A34A] text-xs font-extrabold self-start sm:self-auto">
              ✓ VERIFIED GATE PASS
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div class="p-3.5 rounded-2xl bg-white border border-[#EAEAEA]">
              <span class="text-[10px] text-[#888888] uppercase font-bold block">Ticket Tier</span>
              <span class="font-extrabold text-[#111111] text-sm">{{ b.tierName }} ({{ b.quantity }}x)</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-[#EAEAEA]">
              <span class="text-[10px] text-[#888888] uppercase font-bold block">Date & Time</span>
              <span class="font-bold text-[#111111]">{{ b.eventDate }} · {{ b.eventTime }}</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-white border border-[#EAEAEA]">
              <span class="text-[10px] text-[#888888] uppercase font-bold block">Venue Location</span>
              <span class="font-bold text-[#111111] truncate block">{{ b.location }}</span>
            </div>
          </div>

          <!-- QR Box -->
          <div class="p-5 rounded-2xl bg-white border border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-4 text-left">
              <img 
                :src="`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(b.qrCodeValue)}`" 
                alt="QR Pass Code"
                class="w-20 h-20 object-contain border p-1 rounded-xl shrink-0"
              />
              <div class="space-y-1">
                <div class="text-xs font-bold text-[#111111]">Scannable Entry QR Code</div>
                <div class="text-[11px] font-mono text-[#555555]">{{ b.qrCodeValue }}</div>
                <div class="text-[10px] text-[#16A34A] font-bold">Present at venue entrance for gate scan</div>
              </div>
            </div>

            <div class="flex gap-2 w-full sm:w-auto">
              <button 
                @click="handleDownload(b)"
                class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md flex items-center justify-center gap-1.5"
              >
                <Download class="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-[#FAFAFA] rounded-3xl border border-[#EAEAEA] space-y-4">
        <Ticket class="w-16 h-16 text-[#888888] mx-auto opacity-30" />
        <h3 class="text-xl font-bold text-[#111111]">No active tickets in your wallet</h3>
        <p class="text-xs text-[#555555]">Discover concerts, raves, and conferences around Nigeria to get your first ticket.</p>
        <button 
          @click="store.navigateToView('discover')"
          class="px-7 py-3 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md"
        >
          Explore Events
        </button>
      </div>

    </div>
  </div>
</template>
