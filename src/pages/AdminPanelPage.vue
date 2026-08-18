<script setup>
import { ref, computed } from 'vue';
import { store } from '../store/eventStore';
import { ShieldCheck, Users, Ticket, DollarSign, CheckCircle2, Building } from 'lucide-vue-next';

const adminTab = ref('overview');
const totalPlatformRevenue = computed(() => store.myBookings.reduce((sum, b) => sum + b.totalPrice, 0) + 145000000);
</script>

<template>
  <div class="py-10 bg-white min-h-screen">
    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Banner -->
      <div class="p-6 rounded-3xl bg-[#0D0D0D] text-white flex items-center justify-between shadow-xl">
        <div class="flex items-center gap-3">
          <div class="p-3 rounded-2xl bg-[#FF5000] text-white">
            <ShieldCheck class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-2xl font-extrabold font-sans">Evently Platform Admin Control</h1>
            <div class="text-xs text-gray-400 font-medium">Super Administrator Governance Portal</div>
          </div>
        </div>

        <span class="px-3 py-1 rounded-full bg-[#16A34A] text-white text-xs font-bold">SYSTEM ACTIVE</span>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-[#EAEAEA] pb-3 text-xs font-bold overflow-x-auto no-scrollbar">
        <button 
          @click="adminTab = 'overview'"
          class="px-4 py-2 rounded-xl transition-all"
          :class="adminTab === 'overview' ? 'bg-[#FF5000] text-white' : 'bg-[#FAFAFA] text-[#555555] hover:bg-[#EAEAEA]'"
        >
          Overview
        </button>
        <button 
          @click="adminTab = 'events'"
          class="px-4 py-2 rounded-xl transition-all"
          :class="adminTab === 'events' ? 'bg-[#FF5000] text-white' : 'bg-[#FAFAFA] text-[#555555] hover:bg-[#EAEAEA]'"
        >
          Events ({{ store.events.length }})
        </button>
        <button 
          @click="adminTab = 'payouts'"
          class="px-4 py-2 rounded-xl transition-all"
          :class="adminTab === 'payouts' ? 'bg-[#FF5000] text-white' : 'bg-[#FAFAFA] text-[#555555] hover:bg-[#EAEAEA]'"
        >
          Pending Payouts
        </button>
      </div>

      <!-- TAB 1: OVERVIEW -->
      <div v-if="adminTab === 'overview'" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-1">
            <div class="text-[10px] uppercase font-bold text-[#FF5000]">Total Transacted Volume</div>
            <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ store.formatPrice(totalPlatformRevenue) }}</div>
            <div class="text-[11px] text-[#16A34A] font-bold">100% Paystack Secured</div>
          </div>

          <div class="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-1">
            <div class="text-[10px] uppercase font-bold text-[#FF5000]">Active Events</div>
            <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ store.events.length }}</div>
            <div class="text-[11px] text-[#555555]">Across 10 Cities</div>
          </div>

          <div class="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-1">
            <div class="text-[10px] uppercase font-bold text-[#FF5000]">Registered Users</div>
            <div class="text-2xl font-extrabold text-[#111111] font-sans">142,500</div>
            <div class="text-[11px] text-[#16A34A] font-bold">+1,240 this week</div>
          </div>

          <div class="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-1">
            <div class="text-[10px] uppercase font-bold text-[#FF5000]">Verified Organizers</div>
            <div class="text-2xl font-extrabold text-[#111111] font-sans">520</div>
            <div class="text-[11px] text-[#555555]">Lagos & Abuja leading</div>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-[#EAEAEA] space-y-3 shadow-xs">
          <h3 class="text-sm font-bold text-[#111111]">Platform Security & Gateway Status</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-emerald-600" />
              <span>Paystack API: Operational</span>
            </div>
            <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-emerald-600" />
              <span>Gate QR Scanner: Active</span>
            </div>
            <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-emerald-600" />
              <span>SMS WhatsApp Gateway: Operational</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
