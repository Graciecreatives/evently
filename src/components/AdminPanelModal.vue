<script setup>
import { ref, computed } from 'vue';
import { store } from '../store/eventStore';
import { 
  X, 
  ShieldCheck, 
  Users, 
  Ticket, 
  DollarSign, 
  AlertTriangle,
  Building,
  BarChart3,
  CheckCircle2,
  Lock
} from 'lucide-vue-next';

const adminTab = ref('overview');

const totalPlatformRevenue = computed(() => {
  return store.myBookings.reduce((sum, b) => sum + b.totalPrice, 0) + 145000000;
});
</script>

<template>
  <div 
    v-if="store.activeModal === 'admin'"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-5xl bg-white border border-[#E8E8E8] rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]">
      
      <!-- Admin Header -->
      <div class="p-5 sm:p-6 bg-[#F6F3FF] border-b border-[#E8E8E8] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-[#6C3BFF] text-white">
            <ShieldCheck class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-xl font-extrabold text-[#111111] font-sans">Evently Platform Admin Control</h3>
            <div class="text-xs text-[#6C3BFF] font-medium">Super Administrator Governance Portal</div>
          </div>
        </div>

        <button
          @click="store.closeModal()"
          class="p-2 rounded-full bg-white border border-[#E8E8E8] text-[#111111] hover:bg-[#F6F3FF]"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Admin Navigation Bar -->
      <div class="px-6 py-3 bg-white border-b border-[#E8E8E8] flex items-center gap-4 text-xs font-bold overflow-x-auto no-scrollbar">
        <button 
          @click="adminTab = 'overview'"
          class="px-3.5 py-1.5 rounded-xl transition-all"
          :class="adminTab === 'overview' ? 'bg-[#6C3BFF] text-white' : 'text-[#676767] hover:bg-[#FAFAFC]'"
        >
          Overview
        </button>
        <button 
          @click="adminTab = 'events'"
          class="px-3.5 py-1.5 rounded-xl transition-all"
          :class="adminTab === 'events' ? 'bg-[#6C3BFF] text-white' : 'text-[#676767] hover:bg-[#FAFAFC]'"
        >
          Manage Events ({{ store.events.length }})
        </button>
        <button 
          @click="adminTab = 'payouts'"
          class="px-3.5 py-1.5 rounded-xl transition-all"
          :class="adminTab === 'payouts' ? 'bg-[#6C3BFF] text-white' : 'text-[#676767] hover:bg-[#FAFAFC]'"
        >
          Pending Payouts
        </button>
        <button 
          @click="adminTab = 'users'"
          class="px-3.5 py-1.5 rounded-xl transition-all"
          :class="adminTab === 'users' ? 'bg-[#6C3BFF] text-white' : 'text-[#676767] hover:bg-[#FAFAFC]'"
        >
          Users & Organizers
        </button>
      </div>

      <!-- Admin Body Content -->
      <div class="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
        
        <!-- OVERVIEW TAB -->
        <div v-if="adminTab === 'overview'" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-1">
              <div class="text-[10px] uppercase font-bold text-[#6C3BFF]">Total Volume Transacted</div>
              <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ store.formatPrice(totalPlatformRevenue) }}</div>
              <div class="text-[11px] text-[#16A34A] font-bold">100% Paystack Secured</div>
            </div>

            <div class="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-1">
              <div class="text-[10px] uppercase font-bold text-[#6C3BFF]">Active Nigerian Events</div>
              <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ store.events.length }}</div>
              <div class="text-[11px] text-[#676767]">Across 10 Cities</div>
            </div>

            <div class="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-1">
              <div class="text-[10px] uppercase font-bold text-[#6C3BFF]">Registered Partygoers</div>
              <div class="text-2xl font-extrabold text-[#111111] font-sans">142,500</div>
              <div class="text-[11px] text-[#16A34A] font-bold">+1,240 this week</div>
            </div>

            <div class="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-1">
              <div class="text-[10px] uppercase font-bold text-[#6C3BFF]">Verified Organizers</div>
              <div class="text-2xl font-extrabold text-[#111111] font-sans">520</div>
              <div class="text-[11px] text-[#676767]">Lagos & Abuja leading</div>
            </div>
          </div>

          <!-- Platform System Health -->
          <div class="p-5 rounded-2xl bg-white border border-[#E8E8E8] space-y-3">
            <h4 class="text-sm font-bold text-[#111111]">Platform Security & Gateway Health</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-600" />
                <span>Paystack API: Operational (99.9%)</span>
              </div>
              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-600" />
                <span>QR Scanner Engine: Active</span>
              </div>
              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-600" />
                <span>SMS Pass Gateway: Operational</span>
              </div>
            </div>
          </div>
        </div>

        <!-- EVENTS TAB -->
        <div v-if="adminTab === 'events'" class="space-y-4">
          <h4 class="text-sm font-bold text-[#111111]">Published Nigerian Events Catalog</h4>
          <div class="rounded-2xl bg-white border border-[#E8E8E8] overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-[#FAFAFC] text-[#676767] uppercase font-bold border-b border-[#E8E8E8]">
                  <tr>
                    <th class="p-3.5">Event Title</th>
                    <th class="p-3.5">Category</th>
                    <th class="p-[#3.5]">City</th>
                    <th class="p-3.5">Organizer</th>
                    <th class="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#E8E8E8] text-[#111111]">
                  <tr v-for="e in store.events" :key="e.id" class="hover:bg-[#F6F3FF]/40">
                    <td class="p-3.5 font-bold font-sans">{{ e.title }}</td>
                    <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-[#F6F3FF] text-[#6C3BFF] font-bold">{{ e.category }}</span></td>
                    <td class="p-3.5 font-semibold">{{ e.city }}</td>
                    <td class="p-3.5 text-gray-500">{{ e.organizer }}</td>
                    <td class="p-3.5 text-right">
                      <button @click="store.addToast(`Toggled feature status for ${e.title}`, 'success')" class="px-2.5 py-1 rounded bg-[#6C3BFF] text-white font-bold">Feature</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- PAYOUTS TAB -->
        <div v-if="adminTab === 'payouts'" class="space-y-4">
          <h4 class="text-sm font-bold text-[#111111]">Organizer Bank Payout Queue</h4>
          <div v-for="p in store.payoutsHistory" :key="p.id" class="p-4 rounded-xl bg-[#FAFAFC] border border-[#E8E8E8] flex justify-between items-center text-xs">
            <div>
              <div class="font-bold text-[#111111]">Payout {{ p.id }} · {{ store.formatPrice(p.amount) }}</div>
              <div class="text-gray-500 font-mono">Bank: {{ p.bank }} · Date: {{ p.date }}</div>
            </div>
            <span class="px-2.5 py-1 rounded font-bold" :class="p.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'">
              {{ p.status }}
            </span>
          </div>
        </div>

        <!-- USERS TAB -->
        <div v-if="adminTab === 'users'" class="space-y-4">
          <h4 class="text-sm font-bold text-[#111111]">Platform Users & Permissions</h4>
          <div class="p-4 rounded-xl bg-[#FAFAFC] border border-[#E8E8E8] text-xs font-semibold text-[#111111] flex items-center justify-between">
            <div>
              <div class="font-bold">Alex Morgan (alex.morgan@evently.ng)</div>
              <div class="text-gray-500">Role: Super Organizer & Administrator</div>
            </div>
            <span class="px-2.5 py-1 rounded bg-[#6C3BFF] text-white font-bold">Active</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
