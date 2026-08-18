<script setup>
import { ref } from 'vue';
import { store } from '../store/eventStore';
import { 
  Ticket, 
  Search, 
  Heart, 
  PlusCircle, 
  User, 
  Menu, 
  X,
  Sparkles,
  MapPin,
  Grid
} from 'lucide-vue-next';

const isMobileMenuOpen = ref(false);

const navTo = (view, payload = null) => {
  store.navigateToView(view, payload);
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header class="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] shadow-xs">
    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      
      <!-- LEFT: Logo -->
      <div 
        @click="navTo('home')"
        class="flex items-center gap-2.5 cursor-pointer group"
      >
        <div class="w-9.5 h-9.5 rounded-xl bg-[#FF5000] flex items-center justify-center text-white shadow-md shadow-[#FF5000]/25 group-hover:scale-105 transition-transform duration-200">
          <Ticket class="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </div>
        <span class="text-2xl font-extrabold tracking-tight text-[#111111] font-sans">
          evently<span class="text-[#FF5000]">.</span>
        </span>
      </div>

      <!-- CENTER: Navigation Links -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-[#555555]">
        <button 
          @click="navTo('home')"
          class="hover:text-[#FF5000] transition-colors py-1 relative"
          :class="store.currentView === 'home' ? 'text-[#FF5000] font-extrabold' : ''"
        >
          Discover
          <span v-if="store.currentView === 'home'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5000] rounded-full"></span>
        </button>

        <button 
          @click="navTo('categories')"
          class="hover:text-[#FF5000] transition-colors py-1 relative"
          :class="store.currentView === 'categories' ? 'text-[#FF5000] font-extrabold' : ''"
        >
          Categories
          <span v-if="store.currentView === 'categories'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5000] rounded-full"></span>
        </button>

        <button 
          @click="navTo('cities')"
          class="hover:text-[#FF5000] transition-colors py-1 relative"
          :class="store.currentView === 'cities' ? 'text-[#FF5000] font-extrabold' : ''"
        >
          Cities
          <span v-if="store.currentView === 'cities'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5000] rounded-full"></span>
        </button>

        <button 
          @click="navTo('organizer')"
          class="hover:text-[#FF5000] transition-colors py-1 relative"
          :class="store.currentView === 'organizer' ? 'text-[#FF5000] font-extrabold' : ''"
        >
          For Organizers
          <span v-if="store.currentView === 'organizer'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5000] rounded-full"></span>
        </button>
      </nav>

      <!-- RIGHT: Search & Action Buttons -->
      <div class="hidden lg:flex items-center gap-3">
        
        <!-- Search Field -->
        <div class="relative w-48 xl:w-56">
          <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          <input
            v-model="store.searchQuery"
            @focus="navTo('discover')"
            type="text"
            placeholder="Search events..."
            class="w-full pl-9 pr-3 py-2 rounded-xl text-xs glass-input bg-[#FAFAFA] border-[#EAEAEA] text-[#111111] focus:bg-white"
          />
        </div>

        <!-- Saved Wishlist -->
        <button
          @click="navTo('discover')"
          class="relative p-2.5 rounded-xl border border-[#EAEAEA] bg-white text-[#111111] hover:bg-[#FFF4EE] hover:border-[#FF5000]/30 transition-all"
          title="Saved Events"
        >
          <Heart class="w-4 h-4 text-[#FF5000]" :class="{ 'fill-[#FF5000]': store.savedEventIds.size > 0 }" />
          <span v-if="store.savedEventIds.size > 0" class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF5000] text-white text-[9px] font-bold flex items-center justify-center">
            {{ store.savedEventIds.size }}
          </span>
        </button>

        <!-- My Tickets Wallet Page -->
        <button
          @click="navTo('my-tickets')"
          class="relative px-3.5 py-2 rounded-xl border border-[#EAEAEA] text-xs font-bold text-[#111111] bg-white hover:bg-[#FFF4EE] transition-all flex items-center gap-1.5"
          :class="store.currentView === 'my-tickets' ? 'border-[#FF5000] bg-[#FFF4EE]' : ''"
        >
          <Ticket class="w-4 h-4 text-[#FF5000]" />
          <span>My Tickets</span>
          <span v-if="store.myBookings.length > 0" class="px-1.5 py-0.5 rounded-full bg-[#111111] text-white text-[10px] font-bold">
            {{ store.myBookings.length }}
          </span>
        </button>

        <!-- Create Event Button (Outlined Orange) -->
        <button
          @click="store.setModal('create-event')"
          class="px-4 py-2 rounded-xl border border-[#FF5000] text-xs font-bold text-[#FF5000] hover:bg-[#FFF4EE] transition-all flex items-center gap-1.5"
        >
          <PlusCircle class="w-4 h-4" />
          <span>Create Event</span>
        </button>

        <!-- Log In -->
        <button
          v-if="!store.currentUser.isLoggedIn"
          @click="store.setModal('login')"
          class="text-xs font-bold text-[#111111] hover:text-[#FF5000] px-2 py-2"
        >
          Log in
        </button>

        <!-- Sign Up / Dashboard (Vibrant Orange CTA Button) -->
        <button
          @click="navTo(store.currentUser.isLoggedIn ? 'dashboard' : 'home')"
          class="px-5 py-2 rounded-xl text-xs font-bold gradient-orange-btn shadow-md shadow-[#FF5000]/25 flex items-center gap-1.5"
        >
          <User class="w-3.5 h-3.5" />
          <span>{{ store.currentUser.isLoggedIn ? 'Dashboard' : 'Sign Up' }}</span>
        </button>

      </div>

      <!-- Mobile Controls -->
      <div class="flex lg:hidden items-center gap-2">
        <button
          @click="navTo('my-tickets')"
          class="p-2 rounded-xl border border-[#EAEAEA] text-[#FF5000] relative"
        >
          <Ticket class="w-5 h-5" />
          <span v-if="store.myBookings.length > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-[#FF5000] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {{ store.myBookings.length }}
          </span>
        </button>

        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-2.5 rounded-xl border border-[#EAEAEA] text-[#111111] bg-white"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

    </div>

    <!-- Mobile Navigation Drawer -->
    <div v-if="isMobileMenuOpen" class="lg:hidden bg-white border-b border-[#EAEAEA] px-4 py-4 space-y-3 shadow-xl">
      <div class="relative w-full">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
        <input
          v-model="store.searchQuery"
          @focus="navTo('discover')"
          type="text"
          placeholder="Search events, artists..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm glass-input bg-[#FAFAFA]"
        />
      </div>

      <div class="grid grid-cols-2 gap-2 text-xs font-bold pt-2">
        <button @click="navTo('home')" class="p-3 rounded-xl bg-[#FFF4EE] text-[#FF5000] text-center">Home</button>
        <button @click="navTo('discover')" class="p-3 rounded-xl bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] text-center">Discover</button>
        <button @click="navTo('categories')" class="p-3 rounded-xl bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] text-center">Categories</button>
        <button @click="navTo('cities')" class="p-3 rounded-xl bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] text-center">Cities</button>
        <button @click="navTo('my-tickets')" class="p-3 rounded-xl bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] text-center">My Tickets ({{ store.myBookings.length }})</button>
        <button @click="navTo('dashboard')" class="p-3 rounded-xl bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] text-center">Dashboard</button>
      </div>

      <div class="flex gap-2 pt-2">
        <button
          @click="store.setModal('create-event'); isMobileMenuOpen = false"
          class="flex-1 py-3 rounded-xl text-xs font-bold text-[#FF5000] border border-[#FF5000] text-center"
        >
          Create Event
        </button>
        <button
          @click="store.setModal('login'); isMobileMenuOpen = false"
          class="flex-1 py-3 rounded-xl text-xs font-bold text-white gradient-orange-btn text-center"
        >
          Log In / Sign Up
        </button>
      </div>
    </div>
  </header>
</template>
