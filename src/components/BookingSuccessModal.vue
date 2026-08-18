<script setup>
import { ref } from 'vue';
import { store } from '../store/eventStore';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  Download, 
  Calendar, 
  Share2, 
  Ticket, 
  Sparkles,
  ShieldCheck
} from 'lucide-vue-next';

const close = () => {
  store.closeModal();
};

const handleDownload = () => {
  store.addToast('E-Ticket downloaded to device as PDF!', 'success');
};

const handleCalendar = () => {
  store.addToast('Event added to Google & Apple Calendar!', 'success');
};

const handleShare = () => {
  if (navigator.share && store.latestBooking) {
    navigator.share({
      title: store.latestBooking.eventTitle,
      text: `I'm going to ${store.latestBooking.eventTitle} on Evently!`,
      url: window.location.href
    }).catch(() => {});
  } else {
    store.addToast('Pass details copied to clipboard!', 'success');
  }
};
</script>

<template>
  <div 
    v-if="store.activeModal === 'success' && store.latestBooking"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-xl bg-white border border-[#EAEAEA] rounded-3xl overflow-hidden shadow-2xl my-8 p-6 sm:p-8 space-y-6 text-center">
      
      <!-- Close -->
      <button 
        @click="close"
        class="absolute top-4 right-4 p-2 rounded-full bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] hover:bg-[#FFF4EE]"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Celebration Icon -->
      <div class="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 class="w-10 h-10" />
      </div>

      <!-- Headline -->
      <div class="space-y-1">
        <h2 class="text-3xl font-extrabold text-[#111111] font-sans">You're going! 🎉</h2>
        <p class="text-xs text-[#555555]">Your digital ticket has been issued and sent to your email & WhatsApp.</p>
      </div>

      <!-- Ticket Card Box -->
      <div class="p-6 rounded-3xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-5 text-left shadow-xs relative overflow-hidden">
        
        <div class="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#FF5000] text-white flex items-center justify-center font-bold">
              <Ticket class="w-4 h-4" />
            </div>
            <span class="text-base font-extrabold text-[#111111] font-sans">evently<span class="text-[#FF5000]">.</span></span>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#16A34A] text-[10px] font-extrabold">VERIFIED E-PASS</span>
        </div>

        <div class="space-y-1">
          <h4 class="text-lg font-extrabold text-[#111111] font-sans leading-tight">{{ store.latestBooking.eventTitle }}</h4>
          <div class="text-xs text-[#FF5000] font-bold">{{ store.latestBooking.tierName }} ({{ store.latestBooking.quantity }}x Pass)</div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span class="text-[10px] uppercase font-bold text-[#888888] block">Date & Time</span>
            <span class="font-bold text-[#111111]">{{ store.latestBooking.eventDate }} · {{ store.latestBooking.eventTime }}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-[#888888] block">Venue</span>
            <span class="font-bold text-[#111111] truncate block">{{ store.latestBooking.location }}</span>
          </div>
        </div>

        <!-- Scannable QR Code Graphic -->
        <div class="p-4 rounded-2xl bg-white border border-[#EAEAEA] flex flex-col items-center justify-center space-y-2 text-center">
          <div class="p-2 bg-white rounded-xl border border-[#EAEAEA]">
            <img 
              :src="`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(store.latestBooking.qrCodeValue)}`" 
              alt="Scannable QR Pass"
              class="w-32 h-32 object-contain"
            />
          </div>
          <div class="text-[10px] font-mono text-[#555555]">PASS ID: {{ store.latestBooking.qrCodeValue }}</div>
          <div class="text-[10px] text-[#16A34A] font-bold">Present this QR code at event entrance for entry scan</div>
        </div>

      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-3 gap-2">
        <button
          @click="handleDownload"
          class="py-2.5 px-3 rounded-xl bg-[#FF5000] text-white text-xs font-bold shadow-md hover:bg-[#E04600] flex items-center justify-center gap-1.5"
        >
          <Download class="w-3.5 h-3.5" />
          <span>Download PDF</span>
        </button>

        <button
          @click="handleCalendar"
          class="py-2.5 px-3 rounded-xl bg-white border border-[#EAEAEA] text-[#111111] text-xs font-bold hover:bg-[#FFF4EE] flex items-center justify-center gap-1.5"
        >
          <Calendar class="w-3.5 h-3.5 text-[#FF5000]" />
          <span>Add Calendar</span>
        </button>

        <button
          @click="handleShare"
          class="py-2.5 px-3 rounded-xl bg-white border border-[#EAEAEA] text-[#111111] text-xs font-bold hover:bg-[#FFF4EE] flex items-center justify-center gap-1.5"
        >
          <Share2 class="w-3.5 h-3.5 text-[#FF5000]" />
          <span>Share Pass</span>
        </button>
      </div>

    </div>
  </div>
</template>
