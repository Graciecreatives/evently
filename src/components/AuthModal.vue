<script setup>
import { ref } from 'vue';
import { store } from '../store/eventStore';
import { X, Mail, Lock, User, ArrowRight, Ticket } from 'lucide-vue-next';

const email = ref('');
const password = ref('');
const name = ref('');

const handleSubmit = () => {
  if (!email.value || !password.value) {
    store.addToast('Please fill out all required fields', 'error');
    return;
  }

  store.currentUser = {
    name: name.value || 'Alex Morgan',
    email: email.value,
    role: 'Organizer',
    isLoggedIn: true
  };

  store.addToast(store.activeModal === 'register' ? 'Account created! Welcome to Evently.' : 'Successfully logged in!', 'success');
  store.closeModal();
};
</script>

<template>
  <div 
    v-if="store.activeModal === 'login' || store.activeModal === 'register'"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-fade-in"
  >
    <div class="relative w-full max-w-3xl bg-white border border-[#EAEAEA] rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col md:flex-row min-h-[500px]">
      
      <!-- Close Button -->
      <button 
        @click="store.closeModal()"
        class="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 border border-[#EAEAEA] text-[#111111] hover:bg-[#FFF4EE]"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- LEFT COLUMN: Image & Branding -->
      <div class="md:w-1/2 relative bg-[#0D0D0D] text-white p-8 flex flex-col justify-between overflow-hidden">
        <img 
          src="/images/neon_music_festival.png" 
          alt="Evently" 
          class="absolute inset-0 w-full h-full object-cover opacity-40" 
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent"></div>

        <div class="relative z-10 flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-[#FF5000] text-white flex items-center justify-center font-bold">
            <Ticket class="w-4 h-4" />
          </div>
          <span class="text-xl font-extrabold text-white">evently<span class="text-[#FF5000]">.</span></span>
        </div>

        <div class="relative z-10 space-y-2 mt-20 md:mt-0">
          <span class="px-2.5 py-0.5 rounded-full bg-[#FF5000] text-[10px] font-bold uppercase text-white inline-block">Nigeria’s Event Marketplace</span>
          <h3 class="text-2xl font-extrabold font-sans leading-tight">Discover & book experiences in seconds.</h3>
          <p class="text-xs text-gray-300">Join over 100,000 partygoers and organizers across Nigeria.</p>
        </div>
      </div>

      <!-- RIGHT COLUMN: Form -->
      <div class="md:w-1/2 p-6 sm:p-8 space-y-6 flex flex-col justify-center bg-white">
        
        <div class="space-y-1">
          <h3 class="text-xl font-extrabold text-[#111111] font-sans">
            {{ store.activeModal === 'register' ? 'Create your Evently account' : 'Welcome back' }}
          </h3>
          <p class="text-xs text-[#555555]">
            {{ store.activeModal === 'register' ? 'Start booking tickets & hosting events' : 'Log in to access your tickets & dashboard' }}
          </p>
        </div>

        <div class="space-y-3">
          
          <div v-if="store.activeModal === 'register'" class="space-y-1">
            <label class="block text-xs font-bold text-[#111111]">Full Name</label>
            <div class="relative">
              <User class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
              <input 
                v-model="name"
                type="text" 
                placeholder="Alex Morgan"
                class="w-full pl-10 pr-3 py-2.5 rounded-xl glass-input text-xs font-semibold text-[#111111]"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#111111]">Email Address</label>
            <div class="relative">
              <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
              <input 
                v-model="email"
                type="email" 
                placeholder="alex.morgan@evently.ng"
                class="w-full pl-10 pr-3 py-2.5 rounded-xl glass-input text-xs font-semibold text-[#111111]"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#111111]">Password</label>
            <div class="relative">
              <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
              <input 
                v-model="password"
                type="password" 
                placeholder="••••••••"
                class="w-full pl-10 pr-3 py-2.5 rounded-xl glass-input text-xs font-semibold text-[#111111]"
              />
            </div>
          </div>

          <button
            @click="handleSubmit"
            class="w-full py-3 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>{{ store.activeModal === 'register' ? 'Create Account' : 'Log In' }}</span>
            <ArrowRight class="w-4 h-4" />
          </button>

        </div>

        <div class="text-center text-xs text-[#555555] pt-2 border-t border-[#EAEAEA]">
          <span v-if="store.activeModal === 'login'">Don't have an account? </span>
          <span v-else>Already have an account? </span>
          
          <button 
            @click="store.activeModal = (store.activeModal === 'login' ? 'register' : 'login')"
            class="text-[#FF5000] font-bold hover:underline"
          >
            {{ store.activeModal === 'login' ? 'Sign Up' : 'Log In' }}
          </button>
        </div>

      </div>

    </div>
  </div>
</template>
