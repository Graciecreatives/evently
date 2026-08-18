<script setup>
import { ref, computed } from 'vue';
import { store } from '../store/eventStore';
import { 
  X, 
  CreditCard, 
  Building2, 
  Phone, 
  Lock, 
  ShieldCheck, 
  Ticket, 
  Tag, 
  ArrowRight,
  CheckCircle2
} from 'lucide-vue-next';

const step = ref(1); // 1: Attendee Info, 2: Payment Method, 3: Processing

const name = ref(store.currentUser.name || '');
const email = ref(store.currentUser.email || '');
const phone = ref('+234 803 123 4567');
const paymentMethod = ref('paystack'); // 'paystack' | 'transfer' | 'ussd'

const pricePerTicket = computed(() => store.selectedTier ? store.selectedTier.price : 0);
const subtotal = computed(() => pricePerTicket.value * store.ticketQuantity);

const discountAmount = computed(() => {
  if (!store.appliedPromo) return 0;
  if (store.appliedPromo.discountPercent) {
    return (subtotal.value * store.appliedPromo.discountPercent) / 100;
  }
  if (store.appliedPromo.discountAmount) {
    return Math.min(subtotal.value, store.appliedPromo.discountAmount);
  }
  return 0;
});

const finalTotal = computed(() => Math.max(0, subtotal.value - discountAmount.value));

const close = () => {
  store.closeModal();
};

const handleApplyPromo = () => {
  store.applyPromoCode(store.promoCodeInput);
};

const handleRemovePromo = () => {
  store.removePromoCode();
};

const handlePaymentSubmit = () => {
  if (!name.value || !email.value) {
    store.addToast('Please provide your full name and email address', 'error');
    return;
  }

  step.value = 3; // Processing spinner state

  setTimeout(() => {
    store.processBooking({
      name: name.value,
      email: email.value,
      phone: phone.value,
      paymentMethod: paymentMethod.value
    });
  }, 1200);
};
</script>

<template>
  <div 
    v-if="store.activeModal === 'checkout' && store.selectedEvent"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-2xl bg-white border border-[#EAEAEA] rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[92vh]">
      
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 bg-[#FFF4EE] border-b border-[#EAEAEA] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-[#FF5000] text-white">
            <Ticket class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-lg font-extrabold text-[#111111] font-sans">Complete Ticket Checkout</h3>
            <div class="text-xs text-[#FF5000] font-medium">{{ store.selectedEvent.title }}</div>
          </div>
        </div>

        <button
          @click="close"
          class="p-2 rounded-full bg-white border border-[#EAEAEA] text-[#111111] hover:bg-[#FFF4EE]"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Checkout Body Grid -->
      <div class="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
        
        <!-- STEP 3: Processing Loader -->
        <div v-if="step === 3" class="py-12 text-center space-y-4">
          <div class="w-16 h-16 rounded-full border-4 border-[#FF5000] border-t-transparent animate-spin mx-auto"></div>
          <h4 class="text-xl font-extrabold text-[#111111] font-sans">Processing Paystack Payment...</h4>
          <p class="text-xs text-[#555555]">Securing your digital QR ticket pass in Naira (₦)</p>
        </div>

        <!-- STEP 1 & 2 CONTENT -->
        <div v-else class="space-y-6">
          
          <!-- Selected Tier Banner -->
          <div class="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-between text-xs">
            <div>
              <span class="text-[10px] uppercase font-bold text-[#FF5000] block">Selected Ticket Tier</span>
              <span class="font-extrabold text-[#111111] text-sm">{{ store.selectedTier?.name }}</span>
              <span class="text-[#555555] block">Quantity: {{ store.ticketQuantity }}x Pass</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold text-[#888888] block">Price</span>
              <span class="text-base font-extrabold text-[#FF5000] font-sans">{{ store.formatPrice(subtotal) }}</span>
            </div>
          </div>

          <!-- Attendee Personal Information -->
          <div class="space-y-3">
            <h4 class="text-xs font-extrabold text-[#111111] uppercase tracking-wider">1. Attendee Contact Details</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="block text-xs font-bold text-[#111111]">Full Name *</label>
                <input 
                  v-model="name"
                  type="text" 
                  placeholder="e.g. Alex Morgan"
                  class="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-semibold text-[#111111]"
                />
              </div>

              <div class="space-y-1">
                <label class="block text-xs font-bold text-[#111111]">Email Address *</label>
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="alex.morgan@evently.ng"
                  class="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-semibold text-[#111111]"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-bold text-[#111111]">WhatsApp Phone Number (For Pass SMS)</label>
              <input 
                v-model="phone"
                type="tel" 
                placeholder="+234 803 123 4567"
                class="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-semibold text-[#111111]"
              />
            </div>
          </div>

          <!-- Promo Code Input -->
          <div class="space-y-2">
            <h4 class="text-xs font-extrabold text-[#111111] uppercase tracking-wider">2. Promo / Discount Code</h4>
            
            <div v-if="!store.appliedPromo" class="flex gap-2">
              <input 
                v-model="store.promoCodeInput"
                type="text" 
                placeholder="Enter promo code (e.g. EARLYBIRD20)"
                class="flex-1 px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold uppercase text-[#111111]"
              />
              <button 
                @click="handleApplyPromo"
                class="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#111111] text-white hover:bg-[#000000] transition-colors"
              >
                Apply
              </button>
            </div>

            <div v-else class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 text-emerald-800 font-bold">
                <CheckCircle2 class="w-4 h-4 text-emerald-600" />
                <span>Promo Applied: {{ store.appliedPromo.code }} ({{ store.formatPrice(discountAmount) }} OFF)</span>
              </div>
              <button @click="handleRemovePromo" class="text-rose-600 font-bold hover:underline">Remove</button>
            </div>
          </div>

          <!-- Payment Options in Nigeria -->
          <div class="space-y-3">
            <h4 class="text-xs font-extrabold text-[#111111] uppercase tracking-wider">3. Select Payment Gateway</h4>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div 
                @click="paymentMethod = 'paystack'"
                class="p-3.5 rounded-2xl border cursor-pointer text-xs space-y-1 transition-all"
                :class="paymentMethod === 'paystack' ? 'border-[#FF5000] bg-[#FFF4EE] font-bold ring-2 ring-[#FF5000]/20' : 'border-[#EAEAEA] bg-white'"
              >
                <div class="flex items-center justify-between text-[#111111]">
                  <span>Paystack</span>
                  <CreditCard class="w-4 h-4 text-[#FF5000]" />
                </div>
                <div class="text-[10px] text-[#555555]">Cards, Transfer & USSD</div>
              </div>

              <div 
                @click="paymentMethod = 'transfer'"
                class="p-3.5 rounded-2xl border cursor-pointer text-xs space-y-1 transition-all"
                :class="paymentMethod === 'transfer' ? 'border-[#FF5000] bg-[#FFF4EE] font-bold ring-2 ring-[#FF5000]/20' : 'border-[#EAEAEA] bg-white'"
              >
                <div class="flex items-center justify-between text-[#111111]">
                  <span>Bank Transfer</span>
                  <Building2 class="w-4 h-4 text-[#FF5000]" />
                </div>
                <div class="text-[10px] text-[#555555]">Instant Virtual Account</div>
              </div>

              <div 
                @click="paymentMethod = 'ussd'"
                class="p-3.5 rounded-2xl border cursor-pointer text-xs space-y-1 transition-all"
                :class="paymentMethod === 'ussd' ? 'border-[#FF5000] bg-[#FFF4EE] font-bold ring-2 ring-[#FF5000]/20' : 'border-[#EAEAEA] bg-white'"
              >
                <div class="flex items-center justify-between text-[#111111]">
                  <span>USSD Code</span>
                  <Phone class="w-4 h-4 text-[#FF5000]" />
                </div>
                <div class="text-[10px] text-[#555555]">GTB, Zenith, FirstBank</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- Checkout Footer Total & Action CTA -->
      <div v-if="step !== 3" class="p-5 sm:p-6 bg-white border-t border-[#EAEAEA] flex items-center justify-between">
        <div>
          <span class="text-[10px] uppercase font-bold text-[#888888] block">Total Payable</span>
          <span class="text-2xl font-extrabold text-[#111111] font-sans">{{ store.formatPrice(finalTotal) }}</span>
        </div>

        <button
          @click="handlePaymentSubmit"
          class="px-8 py-3.5 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-lg flex items-center gap-2"
        >
          <Lock class="w-4 h-4" />
          <span>Pay {{ store.formatPrice(finalTotal) }}</span>
        </button>
      </div>

    </div>
  </div>
</template>
