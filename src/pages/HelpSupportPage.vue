<script setup>
import { store } from '../store/eventStore';
import { HelpCircle, Mail, Phone, ShieldCheck, ChevronDown, MessageSquare } from 'lucide-vue-next';
import { ref } from 'vue';

const openFaq = ref(0);

const faqs = [
  { q: "How do I receive my event ticket after payment?", a: "Once your payment is completed via Paystack (Card, Transfer, or USSD), your digital QR ticket pass is generated instantly and sent to your email address and WhatsApp number." },
  { q: "Can I get a refund if an event is cancelled?", a: "Yes! Evently provides a 100% money-back guarantee for any event cancelled by the event organizer. Funds are returned directly to your original bank account." },
  { q: "How do organizers get paid in Nigeria?", a: "Organizers can request payouts at any time directly from their dashboard. Funds are transferred directly to any verified Nigerian bank account (Zenith, GTBank, Kuda, Access, etc.)." },
  { q: "How do gate check-ins work at the venue?", a: "Simply open your ticket on your phone and present the scannable QR code to event security at the entrance. The organizer scans the code using the Evently Scanner app." },
  { q: "Can I transfer my ticket to a friend?", a: "Yes, you can share your digital ticket PDF or QR code link with anyone via WhatsApp or Email." }
];
</script>

<template>
  <div class="py-12 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <!-- Header -->
      <div class="text-center space-y-2">
        <span class="px-3.5 py-1 rounded-full bg-[#FFF4EE] border border-[#FF5000]/20 text-xs font-bold text-[#FF5000]">Support Hub</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#111111] font-sans">
          Evently <span class="text-[#FF5000]">Help Centre</span>
        </h1>
        <p class="text-xs sm:text-sm text-[#555555]">
          Frequently asked questions about tickets, payments, refunds and organizer payouts.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-4">
        <div 
          v-for="(faq, idx) in faqs" 
          :key="idx"
          class="rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden transition-all"
        >
          <button
            @click="openFaq = openFaq === idx ? null : idx"
            class="w-full p-5 text-left font-bold text-sm text-[#111111] flex items-center justify-between gap-4"
          >
            <span>{{ faq.q }}</span>
            <ChevronDown class="w-4 h-4 text-[#FF5000] shrink-0 transition-transform" :class="openFaq === idx ? 'rotate-180' : ''" />
          </button>

          <div v-if="openFaq === idx" class="px-5 pb-5 text-xs text-[#555555] leading-relaxed border-t border-[#EAEAEA] pt-3 bg-white">
            {{ faq.a }}
          </div>
        </div>
      </div>

      <!-- Contact Card -->
      <div class="p-8 rounded-3xl bg-[#FFF4EE] border border-[#FF5000]/20 space-y-4 text-center">
        <MessageSquare class="w-8 h-8 text-[#FF5000] mx-auto" />
        <h3 class="text-xl font-extrabold text-[#111111] font-sans">Need additional assistance?</h3>
        <p class="text-xs text-[#555555]">Our Nigerian support team is available 24/7 via Email or Live Chat.</p>
        <button 
          @click="store.addToast('Connecting to Evently Support Live Chat...', 'info')"
          class="px-6 py-3 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md inline-block"
        >
          Contact Support Team
        </button>
      </div>

    </div>
  </div>
</template>
