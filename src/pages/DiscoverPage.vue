<script setup>
import { ref } from 'vue';
import { store, filteredEvents } from '../store/eventStore';
import EventCard from '../components/EventCard.vue';
import { 
  Search, 
  MapPin, 
  Grid, 
  Filter, 
  ArrowUpDown, 
  X, 
  Calendar, 
  Tag, 
  SlidersHorizontal 
} from 'lucide-vue-next';

const categories = ['All', 'Raves & Parties', 'Concerts', 'Conferences', 'Comedy', 'Food & Drink', 'Festivals & Beach', 'Campus Events', 'Sports', 'Arts'];
const cities = ['All', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kano'];
const budgetOptions = [
  { label: 'All Prices', value: 'All' },
  { label: 'Free Passes', value: 'free' },
  { label: 'Under ₦5,000', value: 'under-5k' },
  { label: 'Under ₦10,000', value: 'under-10k' },
  { label: '₦10,000 – ₦25,000', value: '10k-25k' },
  { label: 'Premium (₦25k+)', value: 'premium' }
];

const resetFilters = () => {
  store.searchQuery = '';
  store.selectedCategory = 'All';
  store.selectedCity = 'All';
  store.selectedDateFilter = 'All';
  store.selectedBudgetFilter = 'All';
  store.sortBy = 'featured';
};
</script>

<template>
  <div class="py-8 bg-white min-h-screen">
    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Page Header -->
      <div class="space-y-2 text-left border-b border-[#EAEAEA] pb-6">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#111111] font-sans">
          Discover All Events <span class="text-[#FF5000]">in Nigeria</span>
        </h1>
        <p class="text-xs sm:text-sm text-[#555555]">
          Find concerts, parties, raves, business summits, and comedy shows across Lagos, Abuja, Port Harcourt and beyond.
        </p>
      </div>

      <!-- Main Layout: Sidebar Filters (3 cols) + Event Grid (9 cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- LEFT SIDEBAR FILTERS (3 cols) -->
        <aside class="lg:col-span-3 space-y-6">
          <div class="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] space-y-6 shadow-xs">
            
            <div class="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
              <div class="flex items-center gap-2 text-sm font-extrabold text-[#111111]">
                <SlidersHorizontal class="w-4 h-4 text-[#FF5000]" />
                <span>Filters</span>
              </div>
              <button 
                @click="resetFilters" 
                class="text-xs text-[#FF5000] font-bold hover:underline"
              >
                Reset All
              </button>
            </div>

            <!-- Search Keyword -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-[#111111]">Search Query</label>
              <div class="relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input
                  v-model="store.searchQuery"
                  type="text"
                  placeholder="Keyword, artist, venue..."
                  class="w-full pl-9 pr-3 py-2 rounded-xl text-xs glass-input bg-white"
                />
              </div>
            </div>

            <!-- City Filter -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-[#111111]">Nigerian City</label>
              <select
                v-model="store.selectedCity"
                class="w-full px-3 py-2 rounded-xl text-xs font-bold glass-input bg-white text-[#111111]"
              >
                <option v-for="c in cities" :key="c" :value="c">{{ c === 'All' ? 'All Cities in Nigeria' : c }}</option>
              </select>
            </div>

            <!-- Category Filter -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-[#111111]">Event Category</label>
              <select
                v-model="store.selectedCategory"
                class="w-full px-3 py-2 rounded-xl text-xs font-bold glass-input bg-white text-[#111111]"
              >
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <!-- Budget Filter -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-[#111111]">Ticket Budget (₦)</label>
              <div class="space-y-1">
                <button
                  v-for="b in budgetOptions"
                  :key="b.value"
                  @click="store.selectedBudgetFilter = b.value"
                  class="w-full px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between border"
                  :class="store.selectedBudgetFilter === b.value ? 'bg-[#FFF4EE] text-[#FF5000] border-[#FF5000] font-extrabold' : 'bg-white text-[#111111] border-[#EAEAEA] hover:bg-[#FAFAFA]'"
                >
                  <span>{{ b.label }}</span>
                  <span v-if="store.selectedBudgetFilter === b.value" class="text-xs">✓</span>
                </button>
              </div>
            </div>

          </div>
        </aside>

        <!-- RIGHT RESULTS GRID (9 cols) -->
        <main class="lg:col-span-9 space-y-6">
          
          <!-- Results Header & Sorting -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFF4EE] border border-[#FF5000]/20">
            <div class="text-xs font-bold text-[#111111]">
              Showing <span class="text-[#FF5000] text-sm font-extrabold">{{ filteredEvents.length }}</span> verified events
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs text-[#555555] font-semibold">Sort:</span>
              <select
                v-model="store.sortBy"
                class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-[#111111] border border-[#EAEAEA]"
              >
                <option value="featured">Recommended</option>
                <option value="soonest">Soonest Date</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <!-- Cards Grid -->
          <div v-if="filteredEvents.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard v-for="event in filteredEvents" :key="event.id" :event="event" />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-20 bg-[#FAFAFA] rounded-3xl border border-[#EAEAEA] space-y-3">
            <Grid class="w-12 h-12 text-[#888888] mx-auto opacity-40" />
            <h3 class="text-lg font-bold text-[#111111]">No matching events found</h3>
            <p class="text-xs text-[#555555]">Try broadening your search query or resetting filters.</p>
            <button @click="resetFilters" class="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md">
              Reset Filters
            </button>
          </div>

        </main>

      </div>

    </div>
  </div>
</template>
