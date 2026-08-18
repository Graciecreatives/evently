<script setup>
import { ref } from 'vue';
import { store } from '../store/eventStore';
import { Ticket, Send, ShieldCheck, Instagram, Twitter, Linkedin, Video } from 'lucide-vue-next';

const email = ref('');

const handleSubscribe = () => {
  if (email.value.includes('@')) {
    store.addToast('Subscribed to Evently Weekly Drops!', 'success');
    email.value = '';
  } else {
    store.addToast('Please enter a valid email address', 'error');
  }
};
</script>

<template>
  <!-- NEWSLETTER SECTION -->
  <section class="bg-[#FFF4EE] border-t border-b border-[#FF5000]/15 py-14">
    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center space-y-4">
        <h3 class="text-2xl sm:text-3xl font-extrabold text-[#111111] font-sans">Don't miss what's happening.</h3>
        <p class="text-xs sm:text-sm text-[#555555]">Get the best events in your city delivered to your inbox.</p>
        
        <div class="flex gap-2 max-w-md mx-auto pt-2">
          <input 
            v-model="email"
            type="email" 
            placeholder="Your email address"
            class="flex-1 px-4 py-3 rounded-xl glass-input bg-white text-xs font-semibold text-[#111111]"
          />
          <button
            @click="handleSubscribe"
            class="px-6 py-3 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md shrink-0"
          >
            Keep me updated
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER SECTION (PITCH BLACK) -->
  <footer class="bg-[#0D0D0D] text-white pt-16 pb-12 font-sans border-t border-white/10">
    <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        <!-- Brand Info -->
        <div class="lg:col-span-2 space-y-4">
          <div 
            @click="store.navigateToView('home')" 
            class="flex items-center gap-2.5 cursor-pointer group"
          >
            <div class="w-8 h-8 rounded-xl bg-[#FF5000] text-white flex items-center justify-center font-bold">
              <Ticket class="w-4 h-4" />
            </div>
            <span class="text-2xl font-extrabold text-white">evently<span class="text-[#FF5000]">.</span></span>
          </div>

          <p class="text-xs text-gray-400 font-normal max-w-sm leading-relaxed">
            Discover, create and experience the best events across Nigeria. Verified digital QR ticket marketplace in Naira (₦).
          </p>

          <div class="flex items-center gap-3 pt-2 text-gray-400">
            <a href="#" class="p-2 rounded-lg bg-white/5 hover:bg-[#FF5000] hover:text-white transition-all"><Instagram class="w-4 h-4" /></a>
            <a href="#" class="p-2 rounded-lg bg-white/5 hover:bg-[#FF5000] hover:text-white transition-all"><Video class="w-4 h-4" /></a>
            <a href="#" class="p-2 rounded-lg bg-white/5 hover:bg-[#FF5000] hover:text-white transition-all"><Twitter class="w-4 h-4" /></a>
            <a href="#" class="p-2 rounded-lg bg-white/5 hover:bg-[#FF5000] hover:text-white transition-all"><Linkedin class="w-4 h-4" /></a>
          </div>
        </div>

        <!-- Column 1: Discover -->
        <div class="space-y-3 text-xs">
          <h4 class="font-extrabold uppercase text-gray-400 tracking-wider text-[11px]">Discover</h4>
          <ul class="space-y-2 text-gray-300 font-medium">
            <li><button @click="store.navigateToView('discover')" class="hover:text-[#FF5000]">Browse Events</button></li>
            <li><button @click="store.navigateToView('discover')" class="hover:text-[#FF5000]">Trending</button></li>
            <li><button @click="store.navigateToView('categories')" class="hover:text-[#FF5000]">Categories</button></li>
            <li><button @click="store.navigateToView('cities')" class="hover:text-[#FF5000]">Cities</button></li>
            <li><button @click="store.selectedBudgetFilter = 'free'; store.navigateToView('discover')" class="hover:text-[#FF5000]">Free Events</button></li>
          </ul>
        </div>

        <!-- Column 2: Organizers -->
        <div class="space-y-3 text-xs">
          <h4 class="font-extrabold uppercase text-gray-400 tracking-wider text-[11px]">Organizers</h4>
          <ul class="space-y-2 text-gray-300 font-medium">
            <li><button @click="store.setModal('create-event')" class="hover:text-[#FF5000]">Create Event</button></li>
            <li><button @click="store.navigateToView('dashboard')" class="hover:text-[#FF5000]">Organizer Dashboard</button></li>
            <li><button @click="store.navigateToView('organizer')" class="hover:text-[#FF5000]">Pricing & Features</button></li>
            <li><button @click="store.setModal('create-event')" class="hover:text-[#FF5000]">Promote Event</button></li>
            <li><button @click="store.navigateToView('organizer')" class="hover:text-[#FF5000]">Organizer Guide</button></li>
          </ul>
        </div>

        <!-- Column 3: Support -->
        <div class="space-y-3 text-xs">
          <h4 class="font-extrabold uppercase text-gray-400 tracking-wider text-[11px]">Support</h4>
          <ul class="space-y-2 text-gray-300 font-medium">
            <li><button @click="store.navigateToView('help')" class="hover:text-[#FF5000]">Help Centre</button></li>
            <li><button @click="store.navigateToView('retrieve-tickets')" class="hover:text-[#FF5000]">Retrieve Tickets</button></li>
            <li><button @click="store.navigateToView('my-tickets')" class="hover:text-[#FF5000]">My Tickets Wallet</button></li>
            <li><button @click="store.navigateToView('admin')" class="hover:text-[#FF5000]">Admin Governance</button></li>
            <li><span class="hover:text-[#FF5000] cursor-pointer">Terms & Privacy</span></li>
          </ul>
        </div>

      </div>

      <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <div>© 2026 Evently. All rights reserved.</div>
        <div class="flex items-center gap-2 text-[11px] text-gray-400">
          <ShieldCheck class="w-4 h-4 text-[#16A34A]" />
          <span>Paystack Secured Nigerian Ticketing</span>
        </div>
      </div>

    </div>
  </footer>
</template>
