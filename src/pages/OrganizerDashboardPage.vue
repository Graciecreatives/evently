<script setup>
import { ref, computed } from 'vue';
import { store } from '../store/eventStore';
import { 
  BarChart3, 
  DollarSign, 
  Ticket, 
  Calendar, 
  PlusCircle, 
  QrCode, 
  Tag, 
  Building2, 
  Check, 
  AlertCircle,
  Users,
  Camera,
  TrendingUp,
  Sparkles
} from 'lucide-vue-next';

const activeTab = ref('overview'); // 'overview' | 'scanner' | 'promos' | 'payouts' | 'analytics'

const scanInput = ref('');
const scanResult = ref(null);

const promoForm = ref({
  code: '',
  name: '',
  discountPercent: 20,
  maxUses: 100
});

const payoutAmount = ref(150000);
const bankName = ref('Zenith Bank');

const totalBookingsCount = computed(() => store.myBookings.reduce((sum, b) => sum + b.quantity, 0) + 1240);
const totalGrossRevenue = computed(() => 47800000 + store.myBookings.reduce((sum, b) => sum + b.totalPrice, 0));

const handleScan = () => {
  if (!scanInput.value.trim()) return;
  scanResult.value = store.scanTicketQR(scanInput.value.trim().toUpperCase());
};

const handleCreatePromo = () => {
  if (!promoForm.value.code) {
    store.addToast('Please enter a promo code name', 'error');
    return;
  }
  store.createPromoCode(promoForm.value);
  promoForm.value.code = '';
};

const handleRequestPayoutSubmit = () => {
  if (payoutAmount.value <= 0) return;
  store.requestPayout(payoutAmount.value, bankName.value, '0123456789');
};
</script>

<template>
  <div class="py-10 bg-white min-h-screen">
    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Dashboard Top Banner -->
      <div class="p-6 sm:p-8 rounded-3xl bg-[#FFF4EE] border border-[#FF5000]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div class="space-y-1">
          <span class="px-3 py-1 rounded-full bg-[#FF5000] text-white text-[10px] font-extrabold uppercase">ORGANIZER CONTROL CENTRE</span>
          <h1 class="text-3xl font-extrabold text-[#111111] font-sans">
            Welcome back, <span class="text-[#FF5000]">{{ store.currentUser.name }}</span>!
          </h1>
          <p class="text-xs text-[#555555]">Manage your events, ticket volume, gate QR check-ins, and bank payouts.</p>
        </div>

        <button 
          @click="store.setModal('create-event')"
          class="px-6 py-3.5 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md flex items-center gap-2 shrink-0"
        >
          <PlusCircle class="w-4 h-4" />
          <span>Host New Event</span>
        </button>
      </div>

      <!-- Navigation Bar Tabs -->
      <div class="flex items-center gap-2 border-b border-[#EAEAEA] pb-3 text-xs font-bold overflow-x-auto no-scrollbar">
        <button 
          @click="activeTab = 'overview'"
          class="px-4 py-2.5 rounded-xl transition-all"
          :class="activeTab === 'overview' ? 'bg-[#FF5000] text-white shadow-xs' : 'bg-white text-[#555555] hover:bg-[#FAFAFA] border border-[#EAEAEA]'"
        >
          Overview
        </button>
        <button 
          @click="activeTab = 'scanner'"
          class="px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
          :class="activeTab === 'scanner' ? 'bg-[#FF5000] text-white shadow-xs' : 'bg-white text-[#555555] hover:bg-[#FAFAFA] border border-[#EAEAEA]'"
        >
          <QrCode class="w-3.5 h-3.5" />
          <span>QR Gate Scanner</span>
        </button>
        <button 
          @click="activeTab = 'promos'"
          class="px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
          :class="activeTab === 'promos' ? 'bg-[#FF5000] text-white shadow-xs' : 'bg-white text-[#555555] hover:bg-[#FAFAFA] border border-[#EAEAEA]'"
        >
          <Tag class="w-3.5 h-3.5" />
          <span>Promo Codes</span>
        </button>
        <button 
          @click="activeTab = 'payouts'"
          class="px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
          :class="activeTab === 'payouts' ? 'bg-[#FF5000] text-white shadow-xs' : 'bg-white text-[#555555] hover:bg-[#FAFAFA] border border-[#EAEAEA]'"
        >
          <Building2 class="w-3.5 h-3.5" />
          <span>Bank Payouts</span>
        </button>
      </div>

      <!-- TAB 1: OVERVIEW -->
      <div v-if="activeTab === 'overview'" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-1">
            <div class="text-[10px] font-extrabold uppercase text-[#FF5000]">Gross Sales Volume</div>
            <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ store.formatPrice(totalGrossRevenue) }}</div>
            <div class="text-[11px] text-[#16A34A] font-bold">✓ Paystack Direct Account</div>
          </div>

          <div class="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-1">
            <div class="text-[10px] font-extrabold uppercase text-[#FF5000]">Tickets Issued</div>
            <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ totalBookingsCount }}</div>
            <div class="text-[11px] text-[#16A34A] font-bold">98% Gate Check-in Rate</div>
          </div>

          <div class="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-1">
            <div class="text-[10px] font-extrabold uppercase text-[#FF5000]">Active Events</div>
            <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ store.events.length }}</div>
            <div class="text-[11px] text-[#555555]">Across Nigerian Cities</div>
          </div>

          <div class="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-1">
            <div class="text-[10px] font-extrabold uppercase text-[#FF5000]">Attendee Satisfaction</div>
            <div class="text-2xl font-extrabold text-[#111111] font-sans">4.92 / 5</div>
            <div class="text-[11px] text-[#555555]">Based on 3,680 reviews</div>
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-extrabold text-[#111111] font-sans">Published Events Status</h3>
          <div class="rounded-2xl bg-white border border-[#EAEAEA] overflow-hidden shadow-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-[#FAFAFA] text-[#555555] uppercase font-bold border-b border-[#EAEAEA]">
                  <tr>
                    <th class="p-4">Event Name</th>
                    <th class="p-4">City</th>
                    <th class="p-4">Date</th>
                    <th class="p-4 text-right">Tickets Issued</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EAEAEA] text-[#111111]">
                  <tr v-for="e in store.events" :key="e.id" class="hover:bg-[#FFF4EE]/50 transition-colors">
                    <td class="p-4 font-bold font-sans">{{ e.title }}</td>
                    <td class="p-4 font-bold text-[#FF5000]">{{ e.city }}</td>
                    <td class="p-4 font-mono text-[#555555]">{{ e.date }}</td>
                    <td class="p-4 text-right font-mono font-bold">{{ e.availableTickets }} / {{ e.totalCapacity || 500 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: QR GATE SCANNER -->
      <div v-if="activeTab === 'scanner'" class="space-y-6 max-w-xl mx-auto text-center py-6">
        <div class="w-16 h-16 rounded-full bg-[#FFF4EE] text-[#FF5000] flex items-center justify-center mx-auto shadow-md">
          <Camera class="w-8 h-8" />
        </div>

        <div class="space-y-1">
          <h3 class="text-2xl font-extrabold text-[#111111] font-sans">Event Ticket QR Check-in Scanner</h3>
          <p class="text-xs text-[#555555]">Scan or enter attendee's ticket ID to validate gate entrance.</p>
        </div>

        <div class="p-6 rounded-3xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-4 shadow-sm">
          <div class="flex gap-2">
            <input 
              v-model="scanInput"
              type="text" 
              placeholder="Scan or enter QR Code e.g. EVENTLY-BK-89412..."
              class="flex-1 px-4 py-3 rounded-xl glass-input bg-white text-xs font-mono font-bold"
            />
            <button
              @click="handleScan"
              class="px-6 py-3 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md"
            >
              Validate QR Pass
            </button>
          </div>

          <div class="flex items-center justify-center gap-2 text-xs text-[#555555]">
            <span>Quick Demo Code:</span>
            <button @click="scanInput = 'EVENTLY-BK-89412-VIP-20260822'; handleScan()" class="text-[#FF5000] font-bold underline">BK-89412</button>
          </div>
        </div>

        <div v-if="scanResult" class="p-5 rounded-2xl border text-left text-xs font-semibold space-y-2" :class="scanResult.success ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'">
          <div class="font-bold text-sm flex items-center gap-2">
            <Check v-if="scanResult.success" class="w-5 h-5 text-emerald-600" />
            <AlertCircle v-else class="w-5 h-5 text-rose-600" />
            <span>{{ scanResult.message }}</span>
          </div>
        </div>
      </div>

      <!-- TAB 3: PROMO CODES -->
      <div v-if="activeTab === 'promos'" class="space-y-6">
        <div class="p-6 rounded-3xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-4 shadow-xs">
          <h3 class="text-sm font-bold text-[#111111]">Create Discount Promo Code</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input 
              v-model="promoForm.code"
              type="text" 
              placeholder="CODE (e.g. SUMMER20)"
              class="px-4 py-3 rounded-xl glass-input bg-white text-xs font-bold uppercase"
            />
            <input 
              v-model="promoForm.discountPercent"
              type="number" 
              placeholder="Discount % (e.g. 20)"
              class="px-4 py-3 rounded-xl glass-input bg-white text-xs font-bold"
            />
            <button
              @click="handleCreatePromo"
              class="py-3 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md"
            >
              Generate Code
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="text-sm font-bold text-[#111111]">Active Promo Codes</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="(p, code) in store.promoCodes" :key="code" class="p-5 rounded-2xl bg-white border border-[#EAEAEA] space-y-2 shadow-xs">
              <div class="flex justify-between items-center text-xs font-bold">
                <span class="text-[#FF5000] uppercase text-sm font-extrabold">{{ p.code }}</span>
                <span class="px-2.5 py-0.5 rounded-full bg-[#FFF4EE] text-[10px] text-[#FF5000] font-extrabold">{{ p.discountPercent ? p.discountPercent + '%' : store.formatPrice(p.discountAmount) }} OFF</span>
              </div>
              <div class="text-xs text-[#555555] font-medium">{{ p.name }}</div>
              <div class="text-[10px] text-[#888888] font-mono">Used {{ p.uses }} / {{ p.maxUses }} times</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: BANK PAYOUTS -->
      <div v-if="activeTab === 'payouts'" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="p-6 rounded-3xl bg-[#FFF4EE] border border-[#FF5000]/20 space-y-2">
            <div class="text-xs font-extrabold text-[#FF5000] uppercase">Available Payout Balance</div>
            <div class="text-3xl font-extrabold text-[#111111] font-sans">₦14,850,000</div>
            <div class="text-xs text-[#16A34A] font-bold">✓ Ready for instant transfer to Nigerian Bank</div>
          </div>

          <div class="p-6 rounded-3xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-3">
            <h3 class="text-xs font-bold text-[#111111] uppercase">Request Payout to Bank Account</h3>
            <div class="flex gap-2">
              <input 
                v-model="payoutAmount"
                type="number" 
                class="flex-1 px-4 py-2.5 rounded-xl glass-input bg-white text-xs font-bold"
              />
              <button
                @click="handleRequestPayoutSubmit"
                class="px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md"
              >
                Request Payout
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
