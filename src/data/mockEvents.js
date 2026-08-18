export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    slug: 'afrowave-lagos-2026',
    title: 'AfroWave Lagos 2026: Beach Rave & Concert',
    category: 'Raves & Parties',
    subcategory: 'Afrobeat & Nightlife',
    date: '2026-08-22',
    formattedDate: 'Sat, 22 Aug 2026 · 7:00 PM',
    time: '19:00 - 05:00 WAT',
    city: 'Lagos',
    location: 'Landmark Beach, Victoria Island, Lagos',
    venueAddress: 'Plot 2 & 3 Water Corporation Dr, Victoria Island, Lagos',
    image: '/images/neon_music_festival.png',
    featured: true,
    trending: true,
    raveParty: true,
    ranking: 1,
    budgetTier: 'under-10k',
    rating: 4.9,
    reviewsCount: 1420,
    organizer: 'AfroWave Entertainment',
    organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'Lagos’s biggest beachfront Afro-rave returns! Experience an explosive night with top Afrobeats headliners, 360-degree holographic laser projections, live DJ battles, and seaside fireworks at Landmark Beach.',
    agenda: [
      { time: '19:00', title: 'Beach Gates Open & Warmup Afro-House Set' },
      { time: '21:30', title: 'Headline DJ Showdown & Laser Experience' },
      { time: '00:00', title: 'Midnight Beachfront Fireworks & Main Artist Act' },
      { time: '02:30', title: 'Late Night Afro-Rave After-Party' }
    ],
    speakers: [
      { name: 'DJ Spinall & Friends', role: 'Headliner DJ', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Kinetik Sound', role: 'Electronic Afro Producer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'Regular Access', price: 8000, description: 'Main beach arena access & digital QR e-ticket', benefits: ['Main Arena Access', 'Standard Gate Entry', 'Digital QR Ticket'] },
      { id: 't2', name: 'VIP Beach Pass', price: 25000, description: 'Express VIP fast-track, elevated viewing deck, 2 drinks included', benefits: ['Fast-Track VIP Lane', 'Elevated Viewing Deck', '2 Complimentary Cocktails', 'VIP Wristband'], popular: true },
      { id: 't3', name: 'VVIP Cabana (Seats 8)', price: 250000, description: 'Private beach cabana, 2 bottles of premium spirits, dedicated waiter service', benefits: ['Private Beach Cabana for 8', '2 Bottles of Premium Spirits', 'Dedicated Butler Service', 'Backstage Pass'] }
    ],
    availableTickets: 142,
    totalCapacity: 5000,
    tags: ['AfroWave', 'Lagos', 'Landmark Beach', 'Afrobeats', 'Rave']
  },
  {
    id: 'evt-2',
    slug: 'creator-economy-africa-2026',
    title: 'Creator Economy Africa Summit 2026',
    category: 'Conferences',
    subcategory: 'Digital Media & Tech',
    date: '2026-09-05',
    formattedDate: 'Sat, 5 Sept 2026 · 9:00 AM',
    time: '09:00 - 18:00 WAT',
    city: 'Lagos',
    location: 'Lekki Coliseum, Lekki, Lagos',
    venueAddress: 'Plot 14 Providence St, Lekki Phase 1, Lagos',
    image: '/images/tech_ai_summit.png',
    featured: true,
    trending: true,
    raveParty: false,
    ranking: 2,
    budgetTier: '10k-25k',
    rating: 4.95,
    reviewsCount: 890,
    organizer: 'Tech & Creator Guild West Africa',
    organizerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    description: 'Gathering Africa’s top digital creators, YouTubers, podcasters, startup founders, and brand executives to discuss monetization, AI tools, video editing, and brand partnerships.',
    agenda: [
      { time: '09:00', title: 'Opening Keynote: Monetizing Digital Content in 2026' },
      { time: '11:15', title: 'Panel: Brand Deal Negotiations for African Creators' },
      { time: '14:00', title: 'Masterclass: AI Workflows for Video & Audio Production' },
      { time: '16:30', title: 'Networking Mixer & Pitch Competition' }
    ],
    speakers: [
      { name: 'Fisayo Fosudo', role: 'Tech Creator & Producer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { name: 'Kemi Adetiba', role: 'Filmmaker & Director', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'Creator Pass', price: 12000, description: 'Full access to keynote sessions, expo area, and networking hall', benefits: ['All Keynote Sessions', 'Expo Area Access', 'Digital Certificate'] },
      { id: 't2', name: 'Executive VIP Pass', price: 40000, description: 'Priority front seats, VIP networking lunch, speaker lounge pass', benefits: ['Front Row Priority Seating', 'Executive VIP Buffet Lunch', 'Speaker Lounge Access', 'Workshop Materials'], popular: true }
    ],
    availableTickets: 68,
    totalCapacity: 2500,
    tags: ['Creators', 'Lagos', 'Conferences', 'Lekki', 'Tech']
  },
  {
    id: 'evt-3',
    slug: 'night-shift-abuja',
    title: 'Night Shift: Abuja Midnight Rave & Lights',
    category: 'Raves & Parties',
    subcategory: 'Nightlife & Electronic',
    date: '2026-08-29',
    formattedDate: 'Sat, 29 Aug 2026 · 10:00 PM',
    time: '22:00 - 05:00 WAT',
    city: 'Abuja',
    location: 'Central Park Arena, Wuse 2, Abuja',
    venueAddress: 'Plot 1341 Ahmadu Bello Way, Central Business District, Abuja',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    featured: true,
    trending: true,
    raveParty: true,
    ranking: 3,
    budgetTier: 'under-5k',
    rating: 4.88,
    reviewsCount: 650,
    organizer: 'Abuja Nightlife Society',
    organizerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    description: 'Abuja’s premier nightlife gathering! Neon light installations, deep house soundscapes, Amapiano rhythms, and signature cocktail bars in Wuse 2.',
    agenda: [
      { time: '22:00', title: 'Doors Open & Deep House Warmup' },
      { time: '00:00', title: 'Amapiano vs Afro-Tech DJ Duel' },
      { time: '02:30', title: 'Laser Show & Midnight Surprise Guest' }
    ],
    speakers: [
      { name: 'DJ Neptune', role: 'Celebrity DJ', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'General Entry', price: 4500, description: 'Standard arena entrance & mobile QR pass', benefits: ['Standard Gate Entry', 'Digital QR Pass'] },
      { id: 't2', name: 'VIP Fast-Track', price: 15000, description: 'VIP fast line, access to elevated VIP cocktail deck, 1 welcome drink', benefits: ['No-Queue Entry', 'VIP Lounge Access', 'Welcome Cocktail'], popular: true }
    ],
    availableTickets: 95,
    totalCapacity: 3000,
    tags: ['Abuja', 'Raves', 'Nightlife', 'Wuse']
  },
  {
    id: 'evt-4',
    slug: 'imperial-plum-gala-lagos',
    title: 'The Imperial Plum Culinary & Fine Wine Gala',
    category: 'Food & Drink',
    subcategory: 'Gala & Luxury Dining',
    date: '2026-09-28',
    formattedDate: 'Mon, 28 Sept 2026 · 7:30 PM',
    time: '19:30 - 23:30 WAT',
    city: 'Lagos',
    location: 'The Wheatbaker Hotel, Ikoyi, Lagos',
    venueAddress: '4 Onitolo Rd, Ikoyi, Lagos',
    image: '/images/gourmet_dining_gala.png',
    featured: true,
    trending: false,
    raveParty: false,
    ranking: 4,
    budgetTier: 'premium',
    rating: 4.96,
    reviewsCount: 410,
    organizer: 'Luxe Epicurean Society',
    organizerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    description: 'An opulent 7-course gourmet dinner crafted by Michelin-starred guest chefs, paired with vintage wines, live chamber orchestra, and purple luxury styling in Ikoyi.',
    agenda: [
      { time: '19:30', title: 'Champagne & Caviar Welcome Reception' },
      { time: '20:15', title: '7-Course Gastronomic Experience' },
      { time: '22:00', title: 'Master Sommelier Vintage Wine Presentation' }
    ],
    speakers: [
      { name: 'Chef Laurent Mercier', role: 'Guest Michelin Chef', avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'Gourmet Ticket', price: 120000, description: '7-course dinner with fine wine pairings & orchestra seating', benefits: ['7-Course Gourmet Dinner', 'Wine Pairings', 'Gala Table Seat'] },
      { id: 't2', name: 'Sommelier Reserve VIP', price: 250000, description: 'Chef table seating, vintage reserve wines, meet-the-chef reception', benefits: ['Chef-Table Priority', 'Rare Vintage Wine Pairings', 'Private Champagne Lounge', 'Crystal Gift Glass'], popular: true }
    ],
    availableTickets: 18,
    totalCapacity: 150,
    tags: ['Ikoyi', 'Lagos', 'Gala', 'Food & Drink', 'Luxury']
  },
  {
    id: 'evt-5',
    slug: 'lagos-tech-founders-mixer',
    title: 'Lagos Tech Founders & Investor Mixer',
    category: 'Conferences',
    subcategory: 'Startup & Venture Capital',
    date: '2026-08-28',
    formattedDate: 'Fri, 28 Aug 2026 · 5:00 PM',
    time: '17:00 - 22:00 WAT',
    city: 'Lagos',
    location: 'Civic Centre, Victoria Island, Lagos',
    venueAddress: 'Ozumba Mbadiwe Ave, Victoria Island, Lagos',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    raveParty: false,
    ranking: 5,
    budgetTier: 'under-5k',
    rating: 4.85,
    reviewsCount: 520,
    organizer: 'Lagos VC Alliance',
    organizerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    description: 'An exclusive networking evening connecting seed-stage startup founders with angels, venture capitalists, and tech operators across Nigeria.',
    agenda: [
      { time: '17:00', title: 'Arrival & Welcome Drinks' },
      { time: '18:30', title: '5-Minute Founder Elevator Pitches' },
      { time: '20:00', title: 'Investor Fireside & Open Networking' }
    ],
    speakers: [
      { name: 'Iyinoluwa Aboyeji', role: 'General Partner @ Future Africa', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'Founder Pass', price: 5000, description: 'Standard admission pass with complimentary cocktails & canapes', benefits: ['Networking Arena', 'Pitch Session Access', 'Cocktail & Snack Pass'] }
    ],
    availableTickets: 42,
    totalCapacity: 400,
    tags: ['Lagos', 'Tech', 'Founders', 'Networking']
  },
  {
    id: 'evt-6',
    slug: 'lagos-comedy-uncut-live',
    title: 'Lagos Comedy Uncut: Night of 1000 Laughs',
    category: 'Comedy',
    subcategory: 'Standup & Variety',
    date: '2026-09-18',
    formattedDate: 'Fri, 18 Sept 2026 · 7:00 PM',
    time: '19:00 - 23:00 WAT',
    city: 'Lagos',
    location: 'Muson Centre, Onikan, Lagos',
    venueAddress: '8/9 Marina Road, Onikan, Lagos Island, Lagos',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    raveParty: false,
    ranking: 6,
    budgetTier: '10k-25k',
    rating: 4.91,
    reviewsCount: 780,
    organizer: 'Lagos Laughs Factory',
    organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Get ready for an unscripted night of side-splitting standup comedy featuring Nigeria’s hilarious headliners, live acoustic sessions, and table service at Muson Centre.',
    agenda: [
      { time: '19:00', title: 'Red Carpet & Cocktail Mixer' },
      { time: '20:00', title: 'Opening Comedy Acts & Band Session' },
      { time: '21:30', title: 'Headliner Showcase: Bovi & Friends' }
    ],
    speakers: [
      { name: 'Bovi & Special Guests', role: 'Headliner Comedian', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'Standard Seat', price: 10000, description: 'Auditorium seat with standard hall view', benefits: ['Auditorium Seat', 'Digital QR Ticket'] },
      { id: 't2', name: 'VIP Table Seat', price: 35000, description: 'Front-table seat with complementary snacks and drinks', benefits: ['Front Row Table', 'Snacks & Drink Combo', 'Red Carpet Access'], popular: true }
    ],
    availableTickets: 55,
    totalCapacity: 1200,
    tags: ['Comedy', 'Lagos', 'Muson', 'Shows']
  },
  {
    id: 'evt-7',
    slug: 'port-harcourt-beach-carnival',
    title: 'Port Harcourt Afro-Beach Carnival 2026',
    category: 'Festivals & Beach',
    subcategory: 'Concert & Beach Culture',
    date: '2026-10-10',
    formattedDate: 'Sat, 10 Oct 2026 · 2:00 PM',
    time: '14:00 - 02:00 WAT',
    city: 'Port Harcourt',
    location: 'Tourist Beach Resort, Port Harcourt',
    venueAddress: 'Bonny Waterway, Port Harcourt, Rivers State',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    raveParty: true,
    ranking: 7,
    budgetTier: 'under-5k',
    rating: 4.87,
    reviewsCount: 610,
    organizer: 'Garden City Vibes',
    organizerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    description: 'The biggest beachfront celebration in Port Harcourt! Live Afrobeats performances, barbecue grills, water sports, and evening fireworks over the Bonny waterway.',
    agenda: [
      { time: '14:00', title: 'Beach Volleyball & Barbecue Warmup' },
      { time: '18:00', title: 'Live DJ Battle & Dance Showcases' },
      { time: '21:00', title: 'Headliner Afrobeats Concert' }
    ],
    speakers: [
      { name: 'DJ Soundwave', role: 'Resident Beach DJ', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'Beach Pass', price: 4000, description: 'Full entry to beach carnival & arena', benefits: ['Beach Access', 'Welcome Drink'] },
      { id: 't2', name: 'VIP Lounge Pass', price: 20000, description: 'Elevated VIP deck, barbecue buffet pass, private bar line', benefits: ['Elevated Lounge', 'Barbecue Buffet Pass', 'Express Bar'], popular: true }
    ],
    availableTickets: 110,
    totalCapacity: 3500,
    tags: ['Port Harcourt', 'Beach', 'Carnival', 'Afrobeats']
  },
  {
    id: 'evt-8',
    slug: 'ibadan-arts-food-fair',
    title: 'Ibadan Cultural Arts & Food Fair 2026',
    category: 'Arts',
    subcategory: 'Culture & Gastronomy',
    date: '2026-09-19',
    formattedDate: 'Sat, 19 Sept 2026 · 10:00 AM',
    time: '10:00 - 20:00 WAT',
    city: 'Ibadan',
    location: 'Agodi Gardens, Ibadan, Oyo State',
    venueAddress: 'Secretariat Road, Mokola Hill, Ibadan',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    raveParty: false,
    ranking: 8,
    budgetTier: 'free',
    rating: 4.82,
    reviewsCount: 390,
    organizer: 'Heritage Oyo Collective',
    organizerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    description: 'Celebrate the rich history, art exhibitions, street food delicacies, and traditional acoustic performances amidst the scenic greenery of Agodi Gardens.',
    agenda: [
      { time: '10:00', title: 'Art Gallery Opening & Craft Vendors' },
      { time: '13:00', title: 'Live Culinary Demonstrations & Tasting' },
      { time: '17:00', title: 'Sunset Folk Music & Acoustic Performance' }
    ],
    speakers: [
      { name: 'Morenikeji Adebayo', role: 'Curator & Artist', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'Free Pass', price: 0, description: 'Free entry pass for all attendees', benefits: ['Garden Access', 'Art Exhibition Access', 'Free Workshop Entry'] }
    ],
    availableTickets: 300,
    totalCapacity: 4000,
    tags: ['Ibadan', 'Arts', 'Free', 'Food']
  },
  {
    id: 'evt-9',
    slug: 'unilag-campus-rave-fest',
    title: 'UNILAG Campus Spring Rave & Talent Hunt',
    category: 'Campus Events',
    subcategory: 'Student Music & Fest',
    date: '2026-09-25',
    formattedDate: 'Fri, 25 Sept 2026 · 4:00 PM',
    time: '16:00 - 23:00 WAT',
    city: 'Lagos',
    location: 'Unilag Sports Centre, Akoka, Lagos',
    venueAddress: 'University of Lagos, Akoka, Yaba, Lagos',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    raveParty: true,
    ranking: 9,
    budgetTier: 'under-5k',
    rating: 4.89,
    reviewsCount: 1100,
    organizer: 'Unilag Student Union & Evently',
    organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'The biggest university student rave of the semester! Featuring guest celebrity performances, student talent showcase, gaming zones, and food stalls.',
    agenda: [
      { time: '16:00', title: 'Gaming Zone & Student DJ Warmup' },
      { time: '18:30', title: 'Unilag Got Talent Finals' },
      { time: '21:00', title: 'Headliner Guest Artist Concert' }
    ],
    speakers: [
      { name: 'Shallipopi', role: 'Guest Celebrity Artist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'Student Pass', price: 2000, description: 'Student entry pass with valid ID', benefits: ['Main Arena Access', 'Gaming Hub Access'] },
      { id: 't2', name: 'VIP Stage Front', price: 8000, description: 'Front-stage VIP section access', benefits: ['Front Stage Zone', 'Event T-Shirt'], popular: true }
    ],
    availableTickets: 180,
    totalCapacity: 6000,
    tags: ['Unilag', 'Campus', 'Rave', 'Yaba', 'Lagos']
  },
  {
    id: 'evt-10',
    slug: 'enugu-coal-city-marathon-sports',
    title: 'Enugu Coal City 10K Marathon & Sports Expo',
    category: 'Sports',
    subcategory: 'Athletics & Fitness',
    date: '2026-10-17',
    formattedDate: 'Sat, 17 Oct 2026 · 6:30 AM',
    time: '06:30 - 14:00 WAT',
    city: 'Enugu',
    location: 'Nnamdi Azikiwe Stadium, Enugu',
    venueAddress: 'Ogui Road, Enugu, Enugu State',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    raveParty: false,
    ranking: 10,
    budgetTier: 'under-5k',
    rating: 4.86,
    reviewsCount: 420,
    organizer: 'Coal City Athletics Club',
    organizerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    description: 'Run through the historic hills and streets of Enugu! Open 10K road race followed by a fitness expo, medal presentations, and live music at Azikiwe Stadium.',
    agenda: [
      { time: '06:30', title: 'Warmup & Race Flag-off' },
      { time: '09:30', title: 'Finishers Medal Ceremony & Podium Awards' },
      { time: '11:00', title: 'Fitness Expo & Wellness Workshops' }
    ],
    speakers: [
      { name: 'Coach Chidi', role: 'Marathon Director', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    tiers: [
      { id: 't1', name: 'Runner Bib & Kit', price: 3000, description: 'Official timing bib, race t-shirt, finisher medal & hydration pass', benefits: ['Official Race Bib', 'Finisher Medal', 'Event T-Shirt'] }
    ],
    availableTickets: 250,
    totalCapacity: 3000,
    tags: ['Enugu', 'Sports', 'Marathon', 'Fitness']
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BK-89412',
    eventId: 'evt-1',
    eventTitle: 'AfroWave Lagos 2026: Beach Rave & Concert',
    eventCategory: 'Raves & Parties',
    eventDate: '2026-08-22',
    eventTime: '19:00 - 05:00 WAT',
    location: 'Landmark Beach, Victoria Island, Lagos',
    tierName: 'VIP Beach Pass',
    pricePerTicket: 25000,
    quantity: 2,
    totalPrice: 50000,
    currency: '₦',
    purchaseDate: '2026-08-15',
    attendeeName: 'Alex Morgan',
    attendeeEmail: 'alex.morgan@evently.ng',
    attendeePhone: '+234 803 123 4567',
    qrCodeValue: 'EVENTLY-BK-89412-VIP-20260822',
    status: 'Confirmed',
    checkedIn: false,
    image: '/images/neon_music_festival.png'
  }
];
