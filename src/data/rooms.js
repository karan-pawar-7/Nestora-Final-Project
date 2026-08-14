// import { rooms } from '../types';
import heroImg from '../assets/images/nestora_hero_room_1785175156363.jpg';
import featImg1 from '../assets/images/nestora_featured_1_1785175168836.jpg';

export const INITIAL_ROOMS= [
  {
    id: 'room-1',
    title: 'The Solarium Loft in SoMa',
    slug: 'solarium-loft-soma',
    type: 'Studio',
    city: 'San Francisco',
    neighborhood: 'SoMa / Financial District',
    address: '420 Mission St, San Francisco, CA',
    rentPerMonth: 2850,
    deposit: 2000,
    sqft: 680,
    bedrooms: 1,
    bathrooms: 1,
    verified: true,
    featured: true,
    rating: 4.96,
    reviewCount: 38,
    images: [
      heroImg,
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An open-concept architectural studio flooded with natural light from floor-to-ceiling windows. Features custom oak flooring, minimalist European kitchen, workspace with fiber internet, and quiet courtyard views.',
    amenities: [
      'High-Speed Fiber WiFi',
      'En-suite Bathroom',
      'Dedicated Ergonomic Workspace',
      'In-Unit Washer & Dryer',
      'Central AC & Heating',
      'Keyless Smart Lock',
      'Dishwasher',
      'EV Charging'
    ],
    houseRules: [
      'No smoking anywhere on premises',
      'Quiet hours from 10:00 PM to 7:00 AM',
      'Pets considered with owner approval',
      'Subletting requires prior written consent'
    ],
    host: {
      name: 'Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      responseTime: 'within an hour',
      memberSince: 'March 2022',
      rating: 4.98,
      reviewsCount: 142
    },
    availableFrom: '2026-08-01',
    minLeaseMonths: 3,
    lat: 37.788,
    lng: -122.399,
    reviews: [
      {
        id: 'rev-1',
        userName: 'Marcus Chen',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'June 2026',
        comment: 'Living here was absolute perfection. Super quiet despite being right in SoMa, and the light in the mornings is unmatched.'
      },
      {
        id: 'rev-2',
        userName: 'Sophia Rodriguez',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'May 2026',
        comment: 'Elena is a phenomenal host. Everything feels brand new, clean, and meticulously maintained.'
      }
    ]
  },
  {
    id: 'room-2',
    title: 'Monochrome Minimalist Suite',
    slug: 'monochrome-minimalist-suite',
    type: '1-Bedroom',
    city: 'New York',
    neighborhood: 'Tribeca / Soho',
    address: '180 Franklin St, New York, NY',
    rentPerMonth: 3400,
    deposit: 2500,
    sqft: 750,
    bedrooms: 1,
    bathrooms: 1,
    verified: true,
    featured: true,
    rating: 4.92,
    reviewCount: 29,
    images: [
      featImg1,
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed for quiet contemplation and remote productivity. Custom Japanese minimalist bed frame, matte black fixtures, acoustic insulation, and views of tranquil private cobblestone street.',
    amenities: [
      'High-Speed Fiber WiFi',
      'Private Balcony',
      'Sonos Sound System',
      'En-suite Bathroom',
      '24/7 Doorman Building',
      'Workspace',
      'Central AC'
    ],
    houseRules: [
      'No loud music after 10 PM',
      'No footwear inside (shoe rack provided)',
      'Maximum 2 occupants'
    ],
    host: {
      name: 'Julian Sterling',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      responseTime: 'within a few minutes',
      memberSince: 'January 2021',
      rating: 4.95,
      reviewsCount: 88
    },
    availableFrom: '2026-08-15',
    minLeaseMonths: 1,
    lat: 40.718,
    lng: -74.008,
    reviews: [
      {
        id: 'rev-3',
        userName: 'Hannah Abbott',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'July 2026',
        comment: 'Cleanest place I have ever rented in New York. The bed is incredibly comfortable and Julian made move-in seamless.'
      }
    ]
  },
  {
    id: 'room-3',
    title: 'Nordic Light Studio at Green Pastures',
    slug: 'nordic-light-studio-austin',
    type: 'Studio',
    city: 'Austin',
    neighborhood: 'South Congress (SoCo)',
    address: '1204 S Congress Ave, Austin, TX',
    rentPerMonth: 1950,
    deposit: 1500,
    sqft: 520,
    bedrooms: 1,
    bathrooms: 1,
    verified: true,
    featured: true,
    rating: 4.88,
    reviewCount: 44,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Bright and airy Austin studio featuring sustainable pine millwork, private shaded terrace, standing desk setup, and walkability to Austin’s top coffee roasters and creative spaces.',
    amenities: [
      'High-Speed Fiber WiFi',
      'Private Terrace',
      'Electric Standing Desk',
      'Swimming Pool Access',
      'Reserved Parking Space',
      'Pet Friendly'
    ],
    houseRules: [
      'Well-behaved pets welcome',
      'Pool closes at 10 PM',
      'Respectful noise levels'
    ],
    host: {
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      responseTime: 'within an hour',
      memberSince: 'August 2023',
      rating: 4.91,
      reviewsCount: 65
    },
    availableFrom: '2026-08-01',
    minLeaseMonths: 1,
    lat: 30.248,
    lng: -97.75,
    reviews: [
      {
        id: 'rev-4',
        userName: 'David Miller',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'June 2026',
        comment: 'The location is unbeatable and the workspace allowed me to work remotely without any issues.'
      }
    ]
  },
  {
    id: 'room-4',
    title: 'Minimalist Penthouse Residence',
    slug: 'minimalist-penthouse-london',
    type: 'Penthouse Suite',
    city: 'London',
    neighborhood: 'Shoreditch / Marylebone',
    address: '88 Redchurch St, London, UK',
    rentPerMonth: 3900,
    deposit: 3000,
    sqft: 980,
    bedrooms: 2,
    bathrooms: 2,
    verified: true,
    featured: true,
    rating: 4.97,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Top-floor architectural penthouse with panoramic skyline vistas. Raw concrete accents, floor-to-ceiling glass, custom Boffi kitchen, rainfall showers, and private rooftop lounge access.',
    amenities: [
      'Ultra-Fast 1Gbps WiFi',
      'Private Rooftop Access',
      'Rainfall Shower',
      'Concierge Service',
      'Wine Cooler',
      'Underfloor Heating'
    ],
    houseRules: [
      'No parties or large gatherings',
      'No smoking',
      'Strict guest policy'
    ],
    host: {
      name: 'Oliver Thorne',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      responseTime: 'within 30 mins',
      memberSince: 'November 2020',
      rating: 4.99,
      reviewsCount: 210
    },
    availableFrom: '2026-09-01',
    minLeaseMonths: 6,
    lat: 51.523,
    lng: -0.076,
    reviews: [
      {
        id: 'rev-5',
        userName: 'Claire Dupont',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'July 2026',
        comment: 'Breathtaking London views and unmatched attention to detail in interior design.'
      }
    ]
  },
  {
    id: 'room-5',
    title: 'Zen Sanctuary in Shibuya',
    slug: 'zen-sanctuary-shibuya-tokyo',
    type: 'Private Room',
    city: 'Tokyo',
    neighborhood: 'Shibuya / Daikanyama',
    address: '2-14 Sarugakucho, Shibuya, Tokyo',
    rentPerMonth: 2100,
    deposit: 1500,
    sqft: 480,
    bedrooms: 1,
    bathrooms: 1,
    verified: true,
    featured: true,
    rating: 4.95,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immerse yourself in serenity in Daikanyama. Cedar wood finishes, tatami seating nook, modern automated deep soaking tub, high-speed fiber internet, and immediate proximity to Daikanyama T-Site.',
    amenities: [
      'Fiber WiFi (1Gbps)',
      'Automated Soaking Tub (Ofuro)',
      'Air Purifier & AC',
      'Keyless Smart Entry',
      'Balcony Garden'
    ],
    houseRules: [
      'Shoes off at the genkan entrance',
      'Quiet living environment',
      'Separate trash recycling rules'
    ],
    host: {
      name: 'Kenji Takahashi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      responseTime: 'within an hour',
      memberSince: 'February 2022',
      rating: 4.96,
      reviewsCount: 115
    },
    availableFrom: '2026-08-10',
    minLeaseMonths: 1,
    lat: 35.651,
    lng: 139.702,
    reviews: [
      {
        id: 'rev-6',
        userName: 'Emily Watson',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'May 2026',
        comment: 'Daikanyama is the best neighborhood in Tokyo and this apartment is a peaceful dream.'
      }
    ]
  },
  {
    id: 'room-6',
    title: 'Bauhaus Loft Studio Mitte',
    slug: 'bauhaus-loft-studio-berlin',
    type: 'Loft',
    city: 'Berlin',
    neighborhood: 'Mitte / Torstraße',
    address: ' Torstraße 102, Berlin, Germany',
    rentPerMonth: 1850,
    deposit: 1400,
    sqft: 610,
    bedrooms: 1,
    bathrooms: 1,
    verified: true,
    featured: true,
    rating: 4.89,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Clean Bauhaus-inspired architecture in heart of Berlin Mitte. High ceilings, exposed historic brick, custom Vitra desk furniture, espresso bar setup, and quiet leafy rear garden access.',
    amenities: [
      'High-Speed WiFi',
      'In-unit Washer',
      'Espresso Machine',
      'Courtyard Garden',
      'Bicycle Included'
    ],
    houseRules: [
      'Quiet hours after 10 PM (Ruhezeit)',
      'Non-smoking',
      'Care for plants when needed'
    ],
    host: {
      name: 'Lukas Weber',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
      isSuperhost: false,
      responseTime: 'within a few hours',
      memberSince: 'September 2023',
      rating: 4.88,
      reviewsCount: 42
    },
    availableFrom: '2026-08-01',
    minLeaseMonths: 2,
    lat: 52.529,
    lng: 13.402,
    reviews: [
      {
        id: 'rev-7',
        userName: 'Tariq Al-Mansoor',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'June 2026',
        comment: 'Extremely clean, great neighborhood, and having a bicycle provided made exploring Berlin easy.'
      }
    ]
  },
  {
    id: 'room-7',
    title: 'Pacific Heights Bay View Flat',
    slug: 'pacific-heights-bay-view-flat',
    type: '1-Bedroom',
    city: 'San Francisco',
    neighborhood: 'Pacific Heights',
    address: '2200 Broadway, San Francisco, CA',
    rentPerMonth: 3200,
    deposit: 2400,
    sqft: 790,
    bedrooms: 1,
    bathrooms: 1,
    verified: true,
    featured: false,
    rating: 4.94,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Elegantly curated 1-bedroom flat offering golden views of San Francisco Bay. Features polished concrete hearth, Miele kitchen appliances, walk-in custom closet, and garage parking.',
    amenities: [
      'High-Speed Fiber WiFi',
      'Bay Water Views',
      'Garage Parking',
      'Elevator Building',
      'Workspace',
      'Dishwasher'
    ],
    houseRules: [
      'No pets allowed',
      'Quiet hours 10 PM - 7 AM',
      'No commercial photoshoots without consent'
    ],
    host: {
      name: 'Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      responseTime: 'within an hour',
      memberSince: 'March 2022',
      rating: 4.98,
      reviewsCount: 142
    },
    availableFrom: '2026-08-20',
    minLeaseMonths: 3,
    lat: 37.794,
    lng: -122.435,
    reviews: [
      {
        id: 'rev-8',
        userName: 'Samantha Wu',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'July 2026',
        comment: 'Waking up to the view of the bay every morning was an absolute privilege.'
      }
    ]
  },
  {
    id: 'room-8',
    title: 'High-Line Terrace Loft',
    slug: 'high-line-terrace-loft-nyc',
    type: 'Loft',
    city: 'New York',
    neighborhood: 'Chelsea / Meatpacking',
    address: '512 W 22nd St, New York, NY',
    rentPerMonth: 3600,
    deposit: 2800,
    sqft: 840,
    bedrooms: 1,
    bathrooms: 1.5,
    verified: true,
    featured: false,
    rating: 4.91,
    reviewCount: 36,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Spacious high-ceiling loft overlooking the High Line park. Open plan layout with marble island, high-speed fiber network, motorized shades, and private balcony.',
    amenities: [
      'High-Speed Fiber WiFi',
      'Private Terrace',
      'Smart TV & Audio',
      'In-unit Washer & Dryer',
      '24/7 Security'
    ],
    houseRules: [
      'No smoking',
      'Quiet hours start at 10:30 PM',
      'Move-in hours 9 AM - 6 PM'
    ],
    host: {
      name: 'Julian Sterling',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      responseTime: 'within a few minutes',
      memberSince: 'January 2021',
      rating: 4.95,
      reviewsCount: 88
    },
    availableFrom: '2026-08-01',
    minLeaseMonths: 1,
    lat: 40.748,
    lng: -74.005,
    reviews: [
      {
        id: 'rev-9',
        userName: 'Lucas Meyer',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'June 2026',
        comment: 'High line terrace was wonderful for evening drinks. Flawless stay.'
      }
    ]
  }
];
