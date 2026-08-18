<script setup>
import { computed } from 'vue';
import { store } from '../store/eventStore';
import EventCard from '../components/EventCard.vue';
import { 
  Flame, 
  Music, 
  Briefcase, 
  Laugh, 
  Utensils, 
  GraduationCap, 
  Trophy, 
  Palette,
  ArrowRight
} from 'lucide-vue-next';

const categoryList = [
  { name: 'Raves & Parties', description: 'Nightlife, beach raves, club nights & DJ sets', icon: Flame, color: 'bg-orange-50 text-[#FF5000]' },
  { name: 'Concerts', description: 'Afrobeats live performances, music festivals & tours', icon: Music, color: 'bg-stone-50 text-[#111111]' },
  { name: 'Conferences', description: 'Tech summits, business expos & creator workshops', icon: Briefcase, color: 'bg-orange-50 text-[#FF5000]' },
  { name: 'Comedy', description: 'Stand-up comedy specials & uncensored live shows', icon: Laugh, color: 'bg-amber-50 text-amber-600' },
  { name: 'Food & Drink', description: 'Food tasting galas, wine festivals & culinary popups', icon: Utensils, color: 'bg-[#FFF4EE] text-[#FF5000]' },
  { name: 'Campus Events', description: 'University concerts, student summits & sports games', icon: GraduationCap, color: 'bg-stone-50 text-[#111111]' },
  { name: 'Sports', description: 'Football matches, marathons & athletic tournaments', icon: Trophy, color: 'bg-orange-50 text-[#FF5000]' },
  { name: 'Arts', description: 'Art gallery exhibitions, fashion shows & theater', icon: Palette, color: 'bg-stone-50 text-[#111111]' }
];

const selectCat = (catName) => {
  store.navigateToView('discover', { category: catName });
};
</script>

<template>
  <div class="py-10 bg-white min-h-screen">
    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <!-- Page Header -->
      <div class="text-left space-y-2 border-b border-[#EAEAEA] pb-6">
        <span class="px-3.5 py-1 rounded-full bg-[#FFF4EE] border border-[#FF5000]/20 text-xs font-bold text-[#FF5000]">Event Directory</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#111111] font-sans">
          Browse by <span class="text-[#FF5000]">Category</span>
        </h1>
        <p class="text-xs sm:text-sm text-[#555555]">
          Explore events by mood and interest across Nigeria.
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="c in categoryList"
          :key="c.name"
          @click="selectCat(c.name)"
          class="p-6 rounded-3xl border border-[#EAEAEA] bg-white hover:border-[#FF5000] hover:shadow-xl transition-all cursor-pointer space-y-4 group flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center font-bold" :class="c.color">
              <component :is="c.icon" class="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <h3 class="text-xl font-extrabold text-[#111111] font-sans group-hover:text-[#FF5000] transition-colors">{{ c.name }}</h3>
            <p class="text-xs text-[#555555] leading-relaxed">{{ c.description }}</p>
          </div>

          <div class="pt-4 border-t border-[#F2F2F2] flex items-center justify-between text-xs font-bold text-[#FF5000]">
            <span>Explore {{ c.name }}</span>
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      <!-- Featured Category Spotlight Section -->
      <div class="pt-8 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-extrabold text-[#111111] font-sans">Trending Parties & Raves</h2>
          <button @click="selectCat('Raves & Parties')" class="text-xs font-bold text-[#FF5000] hover:underline">View All</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <EventCard 
            v-for="e in store.events.filter(x => x.category === 'Raves & Parties').slice(0, 3)" 
            :key="e.id" 
            :event="e" 
          />
        </div>
      </div>

    </div>
  </div>
</template>
