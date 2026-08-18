import { reactive, computed } from 'vue'
import { INITIAL_EVENTS, INITIAL_BOOKINGS } from '../data/mockEvents'

const PROMO_CODES = {
  'EARLYBIRD20': { discountPercent: 20, name: '20% Early Bird Discount', code: 'EARLYBIRD20', uses: 45, maxUses: 100 },
  'VIP10K': { discountAmount: 10000, name: '₦10,000 Off VIP Access', code: 'VIP10K', uses: 12, maxUses: 50 },
  'WELCOME10': { discountPercent: 10, name: '10% Welcome Gift', code: 'WELCOME10', uses: 89, maxUses: 500 },
};

export const store = reactive({
  events: [...INITIAL_EVENTS],
  myBookings: [...INITIAL_BOOKINGS],
  savedEventIds: new Set(['evt-1', 'evt-4']),
  
  // Navigation View Router State
  // Views: 'home' | 'discover' | 'event-details' | 'categories' | 'cities' | 'organizer' | 'dashboard' | 'admin' | 'my-tickets' | 'retrieve-tickets' | 'help'
  currentView: 'home',
  
  // Filter & Search state
  searchQuery: '',
  selectedCategory: 'All',
  selectedCity: 'All',
  selectedDateFilter: 'All', // 'All', 'Today', 'This Weekend', 'Free', 'Under ₦10k', 'Lagos', 'Abuja'
  selectedBudgetFilter: 'All', // 'All', 'free', 'under-5k', 'under-10k', '10k-25k', 'premium'
  sortBy: 'featured', // 'featured', 'soonest', 'popular', 'price-low', 'price-high', 'rating'
  
  // Active Event Selection for Details Page/Modal
  selectedEvent: INITIAL_EVENTS[0],
  selectedTier: INITIAL_EVENTS[0].tiers[0],
  ticketQuantity: 1,
  promoCodeInput: '',
  appliedPromo: null,
  latestBooking: null,

  // Modals
  activeModal: null, // null | 'checkout' | 'success' | 'create-event' | 'login' | 'register'

  // User Authentication
  currentUser: {
    name: 'Alex Morgan',
    email: 'alex.morgan@evently.ng',
    role: 'Organizer',
    isLoggedIn: true
  },

  // Promo Codes & Payouts
  promoCodes: { ...PROMO_CODES },
  payoutsHistory: [
    { id: 'PAY-9012', amount: 350000, date: '2026-08-01', bank: 'Zenith Bank', status: 'Completed' },
    { id: 'PAY-8821', amount: 180000, date: '2026-07-15', bank: 'GTBank', status: 'Completed' }
  ],

  toasts: [],

  // Helper method for switching pages
  navigateToView(viewName, payload = null) {
    this.currentView = viewName;
    if (payload && payload.event) {
      this.selectedEvent = payload.event;
      this.selectedTier = (payload.event.tiers && payload.event.tiers[0]) || null;
    }
    if (payload && payload.category) {
      this.selectedCategory = payload.category;
    }
    if (payload && payload.city) {
      this.selectedCity = payload.city;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setModal(modalName, event = null, tier = null) {
    this.activeModal = modalName;
    if (event) {
      this.selectedEvent = event;
      this.selectedTier = tier || (event.tiers && event.tiers[0]) || null;
    }
    if (modalName === 'checkout') {
      this.ticketQuantity = 1;
      this.appliedPromo = null;
      this.promoCodeInput = '';
    }
  },

  closeModal() {
    this.activeModal = null;
  },

  toggleSaveEvent(eventId) {
    if (this.savedEventIds.has(eventId)) {
      this.savedEventIds.delete(eventId);
      this.addToast('Removed from Saved Events', 'info');
    } else {
      this.savedEventIds.add(eventId);
      this.addToast('Saved to your Evently Wishlist!', 'success');
    }
  },

  applyPromoCode(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) return;

    if (this.promoCodes[cleanCode]) {
      this.appliedPromo = { ...this.promoCodes[cleanCode] };
      this.addToast(`Promo Code "${cleanCode}" applied!`, 'success');
    } else {
      this.addToast('Invalid promo code. Try "EARLYBIRD20" or "VIP10K"', 'error');
    }
  },

  removePromoCode() {
    this.appliedPromo = null;
    this.addToast('Promo code removed', 'info');
  },

  formatPrice(priceInNaira) {
    if (priceInNaira === 0) return 'Free';
    if (priceInNaira === undefined || priceInNaira === null || isNaN(priceInNaira)) return '₦0';
    return '₦' + Math.round(priceInNaira).toLocaleString('en-NG');
  },

  processBooking(attendeeInfo) {
    if (!this.selectedEvent || !this.selectedTier) return false;

    const pricePerTicket = this.selectedTier.price;
    const subtotal = pricePerTicket * this.ticketQuantity;
    let discount = 0;

    if (this.appliedPromo) {
      if (this.appliedPromo.discountPercent) {
        discount = (subtotal * this.appliedPromo.discountPercent) / 100;
      } else if (this.appliedPromo.discountAmount) {
        discount = Math.min(subtotal, this.appliedPromo.discountAmount);
      }
    }

    const finalTotal = Math.max(0, subtotal - discount);
    const bookingId = 'BK-' + Math.floor(10000 + Math.random() * 90000);

    const newBooking = {
      id: bookingId,
      eventId: this.selectedEvent.id,
      eventTitle: this.selectedEvent.title,
      eventCategory: this.selectedEvent.category,
      eventDate: this.selectedEvent.date,
      eventTime: this.selectedEvent.time,
      location: this.selectedEvent.location,
      tierName: this.selectedTier.name,
      pricePerTicket: pricePerTicket,
      quantity: this.ticketQuantity,
      subtotal: subtotal,
      discount: discount,
      totalPrice: finalTotal,
      currency: '₦',
      purchaseDate: new Date().toISOString().split('T')[0],
      attendeeName: attendeeInfo.name,
      attendeeEmail: attendeeInfo.email,
      attendeePhone: attendeeInfo.phone || '+234 803 123 4567',
      paymentMethod: attendeeInfo.paymentMethod || 'Paystack',
      qrCodeValue: `EVENTLY-${bookingId}-${this.selectedTier.id}-${this.selectedEvent.date.replace(/-/g, '')}`,
      status: 'Confirmed',
      checkedIn: false,
      image: this.selectedEvent.image
    };

    const targetEvent = this.events.find(e => e.id === this.selectedEvent.id);
    if (targetEvent && targetEvent.availableTickets >= this.ticketQuantity) {
      targetEvent.availableTickets -= this.ticketQuantity;
    }

    this.myBookings.unshift(newBooking);
    this.latestBooking = newBooking;

    this.activeModal = 'success';
    this.addToast('Booking Confirmed! Your QR Ticket is ready.', 'success');
    return true;
  },

  addEvent(newEventData) {
    const id = 'evt-' + (this.events.length + 1);
    const slug = newEventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const eventObj = {
      id,
      slug,
      ...newEventData,
      rating: 5.0,
      reviewsCount: 1,
      availableTickets: newEventData.totalCapacity || 500,
      organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      tiers: newEventData.tiers || [
        { id: 't1', name: 'Regular Entry', price: newEventData.basePrice || 10000, description: 'Standard admission pass', benefits: ['Standard Gate Entry Pass'] }
      ]
    };
    this.events.unshift(eventObj);
    this.addToast('Event published on Evently!', 'success');
    this.closeModal();
  },

  createPromoCode(codeData) {
    const code = codeData.code.toUpperCase();
    this.promoCodes[code] = {
      code,
      name: codeData.name,
      discountPercent: codeData.discountPercent ? Number(codeData.discountPercent) : null,
      discountAmount: codeData.discountAmount ? Number(codeData.discountAmount) : null,
      uses: 0,
      maxUses: Number(codeData.maxUses) || 100
    };
    this.addToast(`Promo Code "${code}" created!`, 'success');
  },

  requestPayout(amount, bankName, accountNo) {
    const id = 'PAY-' + Math.floor(1000 + Math.random() * 9000);
    this.payoutsHistory.unshift({
      id,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      bank: bankName,
      status: 'Pending'
    });
    this.addToast(`Payout of ${this.formatPrice(amount)} requested!`, 'success');
  },

  scanTicketQR(qrString) {
    const foundBooking = this.myBookings.find(b => b.qrCodeValue === qrString || b.id === qrString);
    if (!foundBooking) {
      return { success: false, message: 'Invalid or Fraudulent Ticket QR Code!' };
    }
    if (foundBooking.checkedIn) {
      return { success: false, message: `Ticket ${foundBooking.id} ALREADY CHECKED IN!` };
    }
    foundBooking.checkedIn = true;
    foundBooking.checkInTime = new Date().toLocaleTimeString();
    return { success: true, booking: foundBooking, message: `Valid Pass! Checked in ${foundBooking.attendeeName} (${foundBooking.tierName})` };
  },

  addToast(message, type = 'info') {
    const id = Date.now() + Math.random();
    this.toasts.push({ id, message, type });
    setTimeout(() => {
      this.removeToast(id);
    }, 4000);
  },

  removeToast(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
});

// Computed filtered events list
export const filteredEvents = computed(() => {
  let list = [...store.events];

  if (store.searchQuery.trim()) {
    const q = store.searchQuery.toLowerCase().trim();
    list = list.filter(e => 
      e.title.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      (e.tags && e.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (store.selectedCategory !== 'All') {
    list = list.filter(e => e.category.toLowerCase().includes(store.selectedCategory.toLowerCase()) || store.selectedCategory.toLowerCase().includes(e.category.toLowerCase()));
  }

  if (store.selectedCity !== 'All') {
    list = list.filter(e => e.city.toLowerCase() === store.selectedCity.toLowerCase() || e.location.toLowerCase().includes(store.selectedCity.toLowerCase()));
  }

  if (store.selectedDateFilter !== 'All') {
    if (store.selectedDateFilter === 'Free') {
      list = list.filter(e => e.tiers.some(t => t.price === 0));
    } else if (store.selectedDateFilter === 'Under ₦10k') {
      list = list.filter(e => e.tiers.some(t => t.price < 10000));
    } else if (store.selectedDateFilter === 'Lagos') {
      list = list.filter(e => e.city === 'Lagos');
    } else if (store.selectedDateFilter === 'Abuja') {
      list = list.filter(e => e.city === 'Abuja');
    }
  }

  if (store.selectedBudgetFilter !== 'All') {
    if (store.selectedBudgetFilter === 'free') {
      list = list.filter(e => e.tiers.some(t => t.price === 0));
    } else if (store.selectedBudgetFilter === 'under-5k') {
      list = list.filter(e => e.tiers.some(t => t.price <= 5000));
    } else if (store.selectedBudgetFilter === 'under-10k') {
      list = list.filter(e => e.tiers.some(t => t.price <= 10000));
    } else if (store.selectedBudgetFilter === '10k-25k') {
      list = list.filter(e => e.tiers.some(t => t.price > 10000 && t.price <= 25000));
    } else if (store.selectedBudgetFilter === 'premium') {
      list = list.filter(e => e.tiers.some(t => t.price > 25000));
    }
  }

  if (store.sortBy === 'soonest') {
    list.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (store.sortBy === 'popular') {
    list.sort((a, b) => b.reviewsCount - a.reviewsCount);
  } else if (store.sortBy === 'price-low') {
    list.sort((a, b) => (a.tiers[0]?.price || 0) - (b.tiers[0]?.price || 0));
  } else if (store.sortBy === 'price-high') {
    list.sort((a, b) => (b.tiers[0]?.price || 0) - (a.tiers[0]?.price || 0));
  } else if (store.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else {
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return list;
});
