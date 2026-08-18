<script setup>
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import CategoryFilter from './components/CategoryFilter.vue';
import EventCard from './components/EventCard.vue';
import HomepageSections from './components/HomepageSections.vue';
import FooterSection from './components/FooterSection.vue';

// Page Views
import DiscoverPage from './pages/DiscoverPage.vue';
import EventDetailPage from './pages/EventDetailPage.vue';
import CategoriesPage from './pages/CategoriesPage.vue';
import CitiesPage from './pages/CitiesPage.vue';
import MyTicketsPage from './pages/MyTicketsPage.vue';
import RetrieveTicketsPage from './pages/RetrieveTicketsPage.vue';
import HelpSupportPage from './pages/HelpSupportPage.vue';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage.vue';
import AdminPanelPage from './pages/AdminPanelPage.vue';

// Modals
import EventDetailModal from './components/EventDetailModal.vue';
import CheckoutModal from './components/CheckoutModal.vue';
import BookingSuccessModal from './components/BookingSuccessModal.vue';
import MyTicketsModal from './components/MyTicketsModal.vue';
import RetrieveTicketsModal from './components/RetrieveTicketsModal.vue';
import AuthModal from './components/AuthModal.vue';
import OrganizerDashboardModal from './components/OrganizerDashboardModal.vue';
import AdminPanelModal from './components/AdminPanelModal.vue';
import CreateEventWizardModal from './components/CreateEventWizardModal.vue';
import ToastNotification from './components/ToastNotification.vue';

import { store, filteredEvents } from './store/eventStore';
</script>

<template>
  <div class="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#FF5000] selection:text-white flex flex-col">
    
    <!-- Navbar Navigation Header -->
    <Navbar />

    <!-- Main Dynamic Pages View Router -->
    <main class="flex-1">
      
      <!-- PAGE 1: HOMEPAGE -->
      <div v-if="store.currentView === 'home'">
        <HeroSection />
        <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <CategoryFilter />
          <HomepageSections />
        </div>
      </div>

      <!-- PAGE 2: DISCOVER EVENTS / SEARCH (/events) -->
      <DiscoverPage v-else-if="store.currentView === 'discover'" />

      <!-- PAGE 3: EVENT DETAILS FULL PAGE (/events/:id) -->
      <EventDetailPage v-else-if="store.currentView === 'event-details'" />

      <!-- PAGE 4: CATEGORIES DIRECTORY (/categories) -->
      <CategoriesPage v-else-if="store.currentView === 'categories'" />

      <!-- PAGE 5: CITIES DIRECTORY (/cities) -->
      <CitiesPage v-else-if="store.currentView === 'cities'" />

      <!-- PAGE 6: MY DIGITAL E-TICKETS WALLET (/my-tickets) -->
      <MyTicketsPage v-else-if="store.currentView === 'my-tickets'" />

      <!-- PAGE 7: RETRIEVE TICKETS TOOL (/tickets/retrieve) -->
      <RetrieveTicketsPage v-else-if="store.currentView === 'retrieve-tickets'" />

      <!-- PAGE 8: HELP & SUPPORT HUB (/help) -->
      <HelpSupportPage v-else-if="store.currentView === 'help'" />

      <!-- PAGE 9: ORGANIZER CONTROL DASHBOARD (/dashboard) -->
      <OrganizerDashboardPage v-else-if="store.currentView === 'dashboard'" />

      <!-- PAGE 10: ADMIN GOVERNANCE PORTAL (/admin) -->
      <AdminPanelPage v-else-if="store.currentView === 'admin'" />

      <!-- PAGE 11: FOR ORGANIZERS LANDING (/organizer) -->
      <div v-else-if="store.currentView === 'organizer'" class="py-12 bg-white">
        <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div class="text-center max-w-2xl mx-auto space-y-4">
            <span class="px-3.5 py-1.5 rounded-full bg-[#FFF4EE] border border-[#FF5000]/20 text-xs font-bold text-[#FF5000]">Organize & Sell Out</span>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-[#111111] font-sans">The ticketing platform built for African event creators.</h1>
            <p class="text-sm text-[#555555]">Low ticketing fees, instant Paystack settlements to Nigerian banks, and gate QR check-ins.</p>
            
            <div class="flex items-center justify-center gap-3 pt-2">
              <button 
                @click="store.setModal('create-event')"
                class="px-7 py-3.5 rounded-xl text-xs font-bold text-white gradient-orange-btn shadow-lg"
              >
                Host an Event Now
              </button>
              <button 
                @click="store.navigateToView('dashboard')"
                class="px-6 py-3.5 rounded-xl text-xs font-bold text-[#111111] bg-white border border-[#EAEAEA] hover:bg-[#FFF4EE]"
              >
                Open Organizer Dashboard
              </button>
            </div>
          </div>

          <HomepageSections />

        </div>
      </div>

    </main>

    <!-- Footer -->
    <FooterSection />

    <!-- Overlaid Modals & Drawers -->
    <EventDetailModal />
    <CheckoutModal />
    <BookingSuccessModal />
    <MyTicketsModal />
    <RetrieveTicketsModal />
    <AuthModal />
    <OrganizerDashboardModal />
    <AdminPanelModal />
    <CreateEventWizardModal />

    <!-- Toast Notifications -->
    <ToastNotification />

  </div>
</template>
