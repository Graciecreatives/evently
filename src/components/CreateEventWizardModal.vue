<script setup>
import { ref } from 'vue';
import { store } from '../store/eventStore';
import { X, Calendar, MapPin, Ticket, Sparkles, Image, ArrowRight, ArrowLeft } from 'lucide-vue-next';

const step = ref(1);

const form = ref({
  title: '',
  category: 'Raves & Parties',
  city: 'Lagos',
  location: '',
  date: '',
  time: '19:00 WAT',
  description: '',
  image: '/images/neon_music_festival.png',
  totalCapacity: 1000,
  basePrice: 5000,
  tiers: [
    { id: 't1', name: 'Regular Entry', price: 5000, description: 'Standard arena gate access' },
    { id: 't2', name: 'VIP Pass', price: 20000, description: 'VIP line fast-track & lounge entry' }
  ]
});

const handlePublish = () => {
  if (!form.value.title || !form.value.location || !form.value.date) {
    store.addToast('Please complete event name, location and date', 'error');
    return;
  }

  store.addEvent({
    title: form.value.title,
    category: form.value.category,
    city: form.value.city,
    location: form.value.location,
    date: form.value.date,
    formattedDate: `${form.value.date} · ${form.value.time}`,
    time: form.value.time,
    description: form.value.description || 'Join us for an incredible experience on Evently!',
    image: form.value.image,
    totalCapacity: form.value.totalCapacity,
    tiers: form.value.tiers,
    organizer: store.currentUser.name || 'Evently Host'
  });
};
</script>

<template>
  <div 
    v-if="store.activeModal === 'create-event'"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-2xl bg-white border border-[#EAEAEA] rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]">
      
      <!-- Header -->
      <div class="p-5 sm:p-6 bg-[#FFF4EE] border-b border-[#EAEAEA] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-[#FF5000] text-white">
            <Sparkles class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-lg font-extrabold text-[#111111] font-sans">Host Event & Sell Tickets</h3>
            <div class="text-xs text-[#FF5000] font-medium">Create your event in minutes on Evently</div>
          </div>
        </div>

        <button
          @click="store.closeModal()"
          class="p-2 rounded-full bg-white border border-[#EAEAEA] text-[#111111] hover:bg-[#FFF4EE]"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Stepper Progress Bar -->
      <div class="px-6 py-3 bg-white border-b border-[#EAEAEA] flex items-center justify-around text-xs font-bold text-[#888888]">
        <div :class="step >= 1 ? 'text-[#FF5000]' : ''">1. Basic Info</div>
        <div :class="step >= 2 ? 'text-[#FF5000]' : ''">2. Date & Venue</div>
        <div :class="step >= 3 ? 'text-[#FF5000]' : ''">3. Ticket Tiers</div>
        <div :class="step >= 4 ? 'text-[#FF5000]' : ''">4. Publish</div>
      </div>

      <!-- Step Content Body -->
      <div class="p-6 sm:p-8 space-y-4 overflow-y-auto custom-scrollbar flex-1">
        
        <!-- STEP 1 -->
        <div v-if="step === 1" class="space-y-4">
          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#111111]">Event Name *</label>
            <input 
              v-model="form.title"
              type="text" 
              placeholder="e.g. Lagos Neon Rave 2026"
              class="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-bold"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="block text-xs font-bold text-[#111111]">Category</label>
              <select v-model="form.category" class="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-bold">
                <option value="Raves & Parties">Raves & Parties</option>
                <option value="Concerts">Concerts</option>
                <option value="Conferences">Conferences</option>
                <option value="Comedy">Comedy</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Campus Events">Campus Events</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-bold text-[#111111]">City</label>
              <select v-model="form.city" class="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-bold">
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Port Harcourt">Port Harcourt</option>
                <option value="Ibadan">Ibadan</option>
                <option value="Enugu">Enugu</option>
              </select>
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#111111]">Event Description</label>
            <textarea 
              v-model="form.description"
              rows="3" 
              placeholder="Describe your event..."
              class="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
            ></textarea>
          </div>
        </div>

        <!-- STEP 2 -->
        <div v-if="step === 2" class="space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="block text-xs font-bold text-[#111111]">Date *</label>
              <input 
                v-model="form.date"
                type="date" 
                class="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-bold"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-bold text-[#111111]">Start Time</label>
              <input 
                v-model="form.time"
                type="text" 
                placeholder="19:00 WAT"
                class="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-bold"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#111111]">Full Venue Address *</label>
            <input 
              v-model="form.location"
              type="text" 
              placeholder="e.g. Landmark Beach, Victoria Island, Lagos"
              class="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-bold"
            />
          </div>
        </div>

        <!-- STEP 3 -->
        <div v-if="step === 3" class="space-y-4">
          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#111111]">Regular Ticket Price (₦) *</label>
            <input 
              v-model="form.tiers[0].price"
              type="number" 
              class="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-bold"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#111111]">VIP Ticket Price (₦)</label>
            <input 
              v-model="form.tiers[1].price"
              type="number" 
              class="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-bold"
            />
          </div>
        </div>

        <!-- STEP 4 -->
        <div v-if="step === 4" class="space-y-4 text-center py-4">
          <div class="p-4 rounded-2xl bg-[#FFF4EE] border border-[#FF5000]/20 space-y-2 text-left text-xs">
            <div class="font-bold text-[#111111] text-base">{{ form.title || 'Untitled Event' }}</div>
            <div class="text-[#FF5000] font-bold">{{ form.category }} · {{ form.city }}</div>
            <div>Date: {{ form.date }} at {{ form.time }}</div>
            <div>Venue: {{ form.location }}</div>
            <div>Regular Ticket: {{ store.formatPrice(form.tiers[0].price) }}</div>
          </div>
        </div>

      </div>

      <!-- Footer Action Buttons -->
      <div class="p-4 sm:p-6 bg-white border-t border-[#EAEAEA] flex items-center justify-between">
        <button
          v-if="step > 1"
          @click="step--"
          class="px-4 py-2 rounded-xl text-xs font-bold text-[#111111] bg-[#FAFAFA] border border-[#EAEAEA] flex items-center gap-1"
        >
          <ArrowLeft class="w-4 h-4" /> Back
        </button>
        <div v-else></div>

        <button
          v-if="step < 4"
          @click="step++"
          class="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md flex items-center gap-1.5"
        >
          <span>Continue</span>
          <ArrowRight class="w-4 h-4" />
        </button>

        <button
          v-else
          @click="handlePublish"
          class="px-8 py-3 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-lg flex items-center gap-2"
        >
          <Sparkles class="w-4 h-4" />
          <span>Publish Event Live</span>
        </button>
      </div>

    </div>
  </div>
</template>
