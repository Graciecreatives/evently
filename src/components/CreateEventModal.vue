<script setup>
import { ref } from 'vue';
import { store } from '../store/eventStore';
import { 
  X, 
  PlusCircle, 
  Sparkles
} from 'lucide-vue-next';

const form = ref({
  title: '',
  category: 'Music',
  date: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
  time: '19:00 - 23:00 GMT',
  location: 'Metropolis Center, New York, NY',
  venueAddress: '100 Broadway Ave, New York, NY',
  image: '/images/neon_music_festival.png',
  basePrice: 75,
  totalCapacity: 500,
  description: '',
  featured: true,
  trending: true,
  tags: 'Concert, Exclusive, Live'
});

const defaultImages = [
  { name: 'Neon Festival', url: '/images/neon_music_festival.png' },
  { name: 'AI Summit', url: '/images/tech_ai_summit.png' },
  { name: 'Gourmet Gala', url: '/images/gourmet_dining_gala.png' },
  { name: 'Unsplash Concert', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80' },
  { name: 'Unsplash Expo', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80' }
];

const handleSubmit = () => {
  if (!form.value.title || !form.value.description) {
    store.addToast('Please fill out event title and description', 'error');
    return;
  }

  const tagsArr = form.value.tags ? form.value.tags.split(',').map(t => t.trim()) : ['Event'];

  const newEventObj = {
    title: form.value.title,
    category: form.value.category,
    date: form.value.date,
    time: form.value.time,
    location: form.value.location,
    venueAddress: form.value.venueAddress,
    image: form.value.image,
    description: form.value.description,
    featured: form.value.featured,
    trending: form.value.trending,
    totalCapacity: Number(form.value.totalCapacity) || 500,
    tags: tagsArr,
    organizer: 'Verified Organizer',
    tiers: [
      { id: 't1', name: 'General Admission', price: Number(form.value.basePrice) || 50, description: 'Standard event entry pass', benefits: ['Full Event Access', 'Digital Ticket Pass'] },
      { id: 't2', name: 'VIP Pass', price: Math.round(Number(form.value.basePrice) * 1.8), description: 'Express entry + VIP area', benefits: ['Express Lane Entry', 'VIP Seating Section', 'Complimentary Drink'], popular: true }
    ]
  };

  store.addEvent(newEventObj);
};
</script>

<template>
  <div 
    v-if="store.activeModal === 'create-event'"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-brand-950/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-2xl bg-white border border-brand-700/20 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]">
      
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 bg-brand-50/80 border-b border-brand-700/15 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-brand-700 text-white">
            <PlusCircle class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-xl font-extrabold text-brand-950 font-serif">Host & Publish Event</h3>
            <div class="text-xs text-brand-700 font-medium">Create tickets, pricing tiers, and event details</div>
          </div>
        </div>

        <button
          @click="store.closeModal()"
          class="p-2 rounded-full bg-white border border-brand-700/15 text-brand-900 hover:bg-brand-50"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form Body -->
      <div class="p-6 sm:p-8 space-y-5 overflow-y-auto custom-scrollbar flex-1">
        
        <!-- Title & Category -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="sm:col-span-2 space-y-1">
            <label class="block text-xs font-bold text-brand-700 uppercase">Event Title *</label>
            <input 
              v-model="form.title"
              type="text"
              placeholder="e.g. Neon Horizon Electronic Gala 2026"
              class="w-full px-3 py-2.5 rounded-xl glass-input bg-brand-50/50 text-sm text-brand-950 font-bold"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-brand-700 uppercase">Category</label>
            <select
              v-model="form.category"
              class="w-full px-3 py-2.5 rounded-xl glass-input bg-brand-50/50 text-sm text-brand-950 font-semibold"
            >
              <option v-for="c in ['Music', 'Tech & AI', 'Food & Wine', 'Business', 'Sports', 'Arts & Gala']" :key="c" :value="c" class="bg-white text-brand-950">
                {{ c }}
              </option>
            </select>
          </div>
        </div>

        <!-- Date, Time, Location -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-bold text-brand-700 uppercase">Date</label>
            <input 
              v-model="form.date"
              type="date"
              class="w-full px-3 py-2.5 rounded-xl glass-input bg-brand-50/50 text-sm text-brand-950 font-semibold"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-brand-700 uppercase">Time Range</label>
            <input 
              v-model="form.time"
              type="text"
              placeholder="19:00 - 23:00 EST"
              class="w-full px-3 py-2.5 rounded-xl glass-input bg-brand-50/50 text-sm text-brand-950 font-semibold"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-brand-700 uppercase">City & State</label>
            <input 
              v-model="form.location"
              type="text"
              placeholder="New York, NY"
              class="w-full px-3 py-2.5 rounded-xl glass-input bg-brand-50/50 text-sm text-brand-950 font-semibold"
            />
          </div>
        </div>

        <!-- Base Price & Capacity -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-bold text-brand-700 uppercase">Base Ticket Price ($ USD)</label>
            <input 
              v-model="form.basePrice"
              type="number"
              min="0"
              placeholder="75"
              class="w-full px-3 py-2.5 rounded-xl glass-input bg-brand-50/50 text-sm text-brand-950 font-mono font-bold"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-brand-700 uppercase">Total Ticket Capacity</label>
            <input 
              v-model="form.totalCapacity"
              type="number"
              min="10"
              placeholder="500"
              class="w-full px-3 py-2.5 rounded-xl glass-input bg-brand-50/50 text-sm text-brand-950 font-mono font-bold"
            />
          </div>
        </div>

        <!-- Banner Image Preset Selection -->
        <div class="space-y-2">
          <label class="block text-xs font-bold text-brand-700 uppercase">Select Banner Image Preset</label>
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
            <div 
              v-for="img in defaultImages"
              :key="img.name"
              @click="form.image = img.url"
              class="relative h-16 rounded-xl overflow-hidden cursor-pointer border transition-all"
              :class="form.image === img.url ? 'border-brand-700 scale-105 shadow-md ring-2 ring-brand-700' : 'border-brand-700/20 opacity-70 hover:opacity-100'"
            >
              <img :src="img.url" :alt="img.name" class="w-full h-full object-cover" />
              <div class="absolute bottom-0 inset-x-0 bg-brand-950/80 text-[9px] text-center text-white truncate px-1 py-0.5 font-semibold">
                {{ img.name }}
              </div>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="space-y-1">
          <label class="block text-xs font-bold text-brand-700 uppercase">Event Overview Description *</label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Describe what makes this experience special..."
            class="w-full px-3 py-2.5 rounded-xl glass-input bg-brand-50/50 text-sm text-brand-950 font-medium"
          ></textarea>
        </div>

        <!-- Tags -->
        <div class="space-y-1">
          <label class="block text-xs font-bold text-brand-700 uppercase">Tags (comma separated)</label>
          <input 
            v-model="form.tags"
            type="text"
            placeholder="Concert, NYC, Live Music"
            class="w-full px-3 py-2.5 rounded-xl glass-input bg-brand-50/50 text-sm text-brand-950 font-semibold"
          />
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="p-4 sm:p-6 bg-white border-t border-brand-700/15 flex items-center justify-end gap-3">
        <button
          @click="store.closeModal()"
          class="px-5 py-2.5 rounded-xl text-xs font-bold text-brand-900 bg-brand-50 hover:bg-brand-100 border border-brand-700/20"
        >
          Cancel
        </button>

        <button
          @click="handleSubmit"
          class="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-button shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <Sparkles class="w-4 h-4" />
          <span>Publish Event Live</span>
        </button>
      </div>

    </div>
  </div>
</template>
