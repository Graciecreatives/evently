<script setup>
import { ref, computed } from 'vue';
import { store } from '../store/eventStore';
import { 
  X, 
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
  Send,
  Sparkles,
  TrendingUp,
  Camera
} from 'lucide-vue-next';

const activeTab = ref('overview'); // 'overview' | 'create' | 'scanner' | 'promos' | 'payouts' | 'analytics'

// Scanner Simulation Input
const scanInput = ref('');
const scanResult = ref(null);

// Promo Code Form
const promoForm = ref({
  code: '',
  name: '',
  discountPercent: 20,
  maxUses: 100
});

// Payout Form
const payoutAmount = ref(150000);
const bankName = ref('Zenith Bank');

const totalBookingsCount = computed(() => store.myBookings.reduce((sum, b) => sum + b.quantity, 0) + 1240);

const totalGrossRevenue = computed(() => {
  const userRevenue = store.myBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  return 47800000 + userRevenue;
});

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
  <div 
    v-if="store.activeModal === 'dashboard'"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-5xl bg-white border border-[#E8E8E8] rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[92vh]">
      
      <!-- Header -->
      <div class="p-5 sm:p-6 bg-[#F6F3FF] border-b border-[#E8E8E8] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-[#6C3BFF] text-white">
            <BarChart3 class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-xl font-extrabold text-[#111111] font-sans">Organizer Control Dashboard</h3>
            <div class="text-xs text-[#6C3BFF] font-medium">Manage events, ticket sales, QR check-ins & payouts</div>
          </div>
        </div>

        <button
          @click="store.closeModal()"
          class="p-2 rounded-full bg-white border border-[#E8E8E8] text-[#111111] hover:bg-[#F6F3FF]"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Dashboard Navigation Tabs -->
      <div class="px-6 py-3 bg-white border-b border-[#E8E8E8] flex items-center gap-3 text-xs font-bold overflow-x-auto no-scrollbar">
        <button 
          @click="activeTab = 'overview'"
          class="px-4 py-2 rounded-xl transition-all"
          :class="activeTab === 'overview' ? 'bg-[#6C3BFF] text-white shadow-xs' : 'text-[#676767] hover:bg-[#FAFAFC]'"
        >
          Overview
        </button>
        <button 
          @click="activeTab = 'scanner'"
          class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
          :class="activeTab === 'scanner' ? 'bg-[#6C3BFF] text-white shadow-xs' : 'text-[#676767] hover:bg-[#FAFAFC]'"
        >
          <QrCode class="w-3.5 h-3.5" />
          <span>QR Check-in</span>
        </button>
        <button 
          @click="activeTab = 'promos'"
          class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
          :class="activeTab === 'promos' ? 'bg-[#6C3BFF] text-white shadow-xs' : 'text-[#676767] hover:bg-[#FAFAFC]'"
        >
          <Tag class="w-3.5 h-3.5" />
          <span>Promo Codes</span>
        </button>
        <button 
          @click="activeTab = 'payouts'"
          class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
          :class="activeTab === 'payouts' ? 'bg-[#6C3BFF] text-white shadow-xs' : 'text-[#676767] hover:bg-[#FAFAFC]'"
        >
          <Building2 class="w-3.5 h-3.5" />
          <span>Payouts</span>
        </button>
        <button 
          @click="store.setModal('create-event')"
          class="px-4 py-2 rounded-xl bg-[#F6F3FF] text-[#6C3BFF] hover:bg-[#6C3BFF] hover:text-white transition-all flex items-center gap-1.5 ml-auto"
        >
          <PlusCircle class="w-3.5 h-3.5" />
          <span>+ Create New Event</span>
        </button>
      </div>

      <!-- Dashboard Content Body -->
      <div class="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
        
        <!-- TAB 1: OVERVIEW -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          
          <!-- Key Metrics -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-1">
              <div class="text-[10px] font-extrabold uppercase text-[#6C3BFF]">Gross Revenue</div>
              <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ store.formatPrice(totalGrossRevenue) }}</div>
              <div class="text-[11px] text-[#16A34A] font-bold">100% Paystack Direct</div>
            </div>

            <div class="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-1">
              <div class="text-[10px] font-extrabold uppercase text-[#6C3BFF]">Tickets Issued</div>
              <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ totalBookingsCount }}</div>
              <div class="text-[11px] text-[#16A34A] font-bold">98% Gate Scan Rate</div>
            </div>

            <div class="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-1">
              <div class="text-[10px] font-extrabold uppercase text-[#6C3BFF]">Active Events</div>
              <div class="text-2xl font-extrabold text-[#111111] font-sans">{{ store.events.length }}</div>
              <div class="text-[11px] text-[#676767]">Across Nigerian Cities</div>
            </div>

            <div class="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-1">
              <div class="text-[10px] font-extrabold uppercase text-[#6C3BFF]">Avg Rating</div>
              <div class="text-2xl font-extrabold text-[#111111] font-sans">4.92 / 5</div>
              <div class="text-[11px] text-[#676767]">Based on 3,680 reviews</div>
            </div>
          </div>

          <!-- Events Breakdown Table -->
          <div class="space-y-3">
            <h4 class="text-sm font-bold text-[#111111]">Event Sales Breakdown</h4>
            <div class="rounded-2xl bg-white border border-[#E8E8E8] overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#FAFAFC] text-[#676767] uppercase font-bold border-b border-[#E8E8E8]">
                    <tr>
                      <th class="p-3.5">Event Name</th>
                      <th class="p-3.5">City</th>
                      <th class="p-3.5">Date</th>
                      <th class="p-3.5 text-right">Passes Remaining</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E8E8E8] text-[#111111]">
                    <tr v-for="e in store.events" :key="e.id" class="hover:bg-[#F6F3FF]/40">
                      <td class="p-3.5 font-bold font-sans">{{ e.title }}</td>
                      <td class="p-3.5 font-semibold text-[#6C3BFF]">{{ e.city }}</td>
                      <td class="p-3.5 font-mono text-[#676767]">{{ e.date }}</td>
                      <td class="p-3.5 text-right font-mono font-bold">{{ e.availableTickets }} / {{ e.totalCapacity || 500 }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <!-- TAB 2: QR CHECK-IN SCANNER -->
        <div v-if="activeTab === 'scanner'" class="space-y-5 max-w-xl mx-auto text-center py-4">
          <div class="w-16 h-16 rounded-full bg-[#F6F3FF] text-[#6C3BFF] flex items-center justify-center mx-auto">
            <Camera class="w-8 h-8" />
          </div>

          <div class="space-y-1">
            <h4 class="text-xl font-extrabold text-[#111111] font-sans">Event Ticket QR Check-in</h4>
            <p class="text-xs text-[#676767]">Enter or scan an attendee's digital QR ticket ID to validate gate entrance.</p>
          </div>

          <div class="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-3">
            <div class="flex gap-2">
              <input 
                v-model="scanInput"
                type="text" 
                placeholder="Scan or enter QR Code e.g. EVENTLY-BK-89412..."
                class="flex-1 px-4 py-3 rounded-xl glass-input text-xs font-mono font-bold"
              />
              <button
                @click="handleScan"
                class="px-6 py-3 rounded-xl text-xs font-bold gradient-purple-btn shadow-md"
              >
                Validate QR
              </button>
            </div>

            <!-- Demo Quick Test Buttons -->
            <div class="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#676767]">
              <span>Quick Test:</span>
              <button @click="scanInput = 'EVENTLY-BK-89412-VIP-20260822'; handleScan()" class="text-[#6C3BFF] underline font-bold">BK-89412</button>
            </div>
          </div>

          <!-- Scan Result Notification -->
          <div v-if="scanResult" class="p-4 rounded-2xl border text-left text-xs font-semibold space-y-1" :class="scanResult.success ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'">
            <div class="font-bold text-sm flex items-center gap-1.5">
              <Check v-if="scanResult.success" class="w-4 h-4 text-emerald-600" />
              <AlertCircle v-else class="w-4 h-4 text-rose-600" />
              <span>{{ scanResult.message }}</span>
            </div>
            <div v-if="scanResult.booking" class="text-xs pt-1 border-t border-emerald-200">
              Attendee: <span class="font-bold">{{ scanResult.booking.attendeeName }}</span> · Pass: {{ scanResult.booking.tierName }}
            </div>
          </div>
        </div>

        <!-- TAB 3: PROMO CODES -->
        <div v-if="activeTab === 'promos'" class="space-y-6">
          <div class="p-5 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-4">
            <h4 class="text-sm font-bold text-[#111111]">Create New Discount Promo Code</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input 
                v-model="promoForm.code"
                type="text" 
                placeholder="PROMO CODE (e.g. SUMMER20)"
                class="px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold uppercase"
              />
              <input 
                v-model="promoForm.discountPercent"
                type="number" 
                placeholder="Discount % (e.g. 20)"
                class="px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold"
              />
              <button
                @click="handleCreatePromo"
                class="py-2.5 rounded-xl text-xs font-bold gradient-purple-btn shadow-md"
              >
                Create Promo Code
              </button>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="text-sm font-bold text-[#111111]">Active Discount Codes</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div v-for="(p, code) in store.promoCodes" :key="code" class="p-4 rounded-xl bg-white border border-[#E8E8E8] space-y-1">
                <div class="flex justify-between items-center text-xs font-bold">
                  <span class="text-[#6C3BFF] uppercase">{{ p.code }}</span>
                  <span class="px-2 py-0.5 rounded bg-purple-50 text-[10px] text-[#6C3BFF] font-bold">{{ p.discountPercent ? p.discountPercent + '%' : store.formatPrice(p.discountAmount) }} OFF</span>
                </div>
                <div class="text-[11px] text-gray-500">{{ p.name }}</div>
                <div class="text-[10px] text-gray-400 font-mono">Used {{ p.uses }} / {{ p.maxUses }} times</div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 4: PAYOUTS -->
        <div v-if="activeTab === 'payouts'" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-5 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-2">
              <div class="text-xs font-extrabold text-[#6C3BFF] uppercase">Available Payout Balance</div>
              <div class="text-3xl font-extrabold text-[#111111] font-sans">₦14,850,000</div>
              <div class="text-xs text-[#16A34A] font-bold">Ready for instant settlement</div>
            </div>

            <div class="p-5 rounded-2xl bg-[#FAFAFC] border border-[#E8E8E8] space-y-3">
              <h4 class="text-xs font-bold text-[#111111] uppercase">Request Payout To Bank</h4>
              <div class="flex gap-2">
                <input 
                  v-model="payoutAmount"
                  type="number" 
                  class="flex-1 px-3 py-2 rounded-xl glass-input text-xs font-bold"
                />
                <button
                  @click="handleRequestPayoutSubmit"
                  class="px-4 py-2 rounded-xl text-xs font-bold gradient-purple-btn shadow-md"
                >
                  Request Payout
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="text-sm font-bold text-[#111111]">Payout History</h4>
            <div v-for="p in store.payoutsHistory" :key="p.id" class="p-4 rounded-xl bg-white border border-[#E8E8E8] flex justify-between items-center text-xs">
              <div>
                <div class="font-bold text-[#111111]">{{ p.id }} · {{ store.formatPrice(p.amount) }}</div>
                <div class="text-gray-500 font-mono">Bank: {{ p.bank }} · {{ p.date }}</div>
              </div>
              <span class="px-2.5 py-1 rounded font-bold text-[10px]" :class="p.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'">
                {{ p.status }}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
