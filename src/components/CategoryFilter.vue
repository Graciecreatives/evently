<script setup>
import { store, filteredEvents } from '../store/eventStore';
import { 
  Grid, 
  PartyPopper, 
  Music, 
  Flame, 
  Mic, 
  Briefcase, 
  Trophy, 
  Laugh, 
  Palette, 
  Utensils, 
  GraduationCap,
  ArrowUpDown
} from 'lucide-vue-next';

const filterChips = [
  'All',
  'Today',
  'This Weekend',
  'Free',
  'Under ₦10k',
  'Lagos',
  'Abuja'
];

const categoryCards = [
  { name: 'Raves & Parties', label: '🎉 Parties & Raves', icon: Flame, color: 'bg-orange-50 text-[#FF5000] border-orange-200' },
  { name: 'Concerts', label: '🎵 Concerts', icon: Music, color: 'bg-stone-50 text-[#111111] border-stone-200' },
  { name: 'Conferences', label: '💼 Conferences', icon: Briefcase, color: 'bg-orange-50 text-[#FF5000] border-orange-200' },
  { name: 'Comedy', label: '😂 Comedy', icon: Laugh, color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { name: 'Food & Drink', label: '🍴 Food & Drink', icon: Utensils, color: 'bg-[#FFF4EE] text-[#FF5000] border-orange-200' },
  { name: 'Campus Events', label: '🎓 Campus Events', icon: GraduationCap, color: 'bg-stone-50 text-[#111111] border-stone-200' },
  { name: 'Sports', label: '⚽ Sports', icon: Trophy, color: 'bg-orange-50 text-[#FF5000] border-orange-200' },
  { name: 'Arts', label: '🎨 Arts', icon: Palette, color: 'bg-stone-50 text-[#111111] border-stone-200' }
];

const sortOptions = [
  { label: 'Recommended', value: 'featured' },
  { label: 'Soonest Date', value: 'soonest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Highest Rated', value: 'rating' }
];
</script>

<template>
  <div id="discover-section" class="py-6 space-y-8">
    
    <!-- Section Heading -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#111111] font-sans">Discover events</h2>
        <p class="text-xs sm:text-sm text-[#555555] font-medium mt-1">Find something worth leaving the house for.</p>
      </div>

      <!-- Sorting Selector -->
      <div class="flex items-center gap-3 shrink-0">
        <span class="text-xs text-[#888888] font-medium hidden sm:inline">Sort by:</span>
        <div class="relative flex items-center">
          <ArrowUpDown class="absolute left-3 w-3.5 h-3.5 text-[#FF5000] pointer-events-none" />
          <select
            v-model="store.sortBy"
            class="pl-8 pr-6 py-2 rounded-xl text-xs font-bold bg-white text-[#111111] border border-[#EAEAEA] shadow-xs cursor-pointer focus:outline-none focus:border-[#FF5000]"
          >
            <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Filter Chips Bar -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      <button
        v-for="chip in filterChips"
        :key="chip"
        @click="store.selectedDateFilter = chip"
        class="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border"
        :class="[
          store.selectedDateFilter === chip
            ? 'bg-[#FF5000] text-white border-[#FF5000] shadow-md shadow-[#FF5000]/20'
            : 'bg-white text-[#111111] border-[#EAEAEA] hover:border-[#FF5000]/40 hover:bg-[#FFF4EE]'
        ]"
      >
        {{ chip }}
      </button>
    </div>

    <!-- Category Discovery Cards Grid -->
    <div class="space-y-3">
      <div class="text-xs font-bold text-[#888888] uppercase tracking-wider">Explore By Category</div>
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div
          v-for="cat in categoryCards"
          :key="cat.name"
          @click="store.navigateToView('categories', { category: cat.name })"
          class="p-3 rounded-2xl border text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-xs group"
          :class="[
            store.selectedCategory === cat.name
              ? 'bg-[#FF5000] text-white border-[#FF5000] scale-105 shadow-md shadow-[#FF5000]/20'
              : `${cat.color} hover:scale-105 hover:shadow-md`
          ]"
        >
          <component :is="cat.icon" class="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span class="text-xs font-bold truncate max-w-full">{{ cat.name }}</span>
        </div>
      </div>
    </div>

  </div>
</template>
