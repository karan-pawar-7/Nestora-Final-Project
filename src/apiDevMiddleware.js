// In-memory data store shared between Vite dev server and standalone requests
let rooms = [
  {
    id: "room-1",
    title: "The Solarium Loft in SoMa",
    slug: "solarium-loft-soma",
    type: "Studio",
    roomType: "Studio",
    propertyType: "Apartment",
    city: "San Francisco",
    neighborhood: "SoMa / Financial District",
    address: "420 Mission St, San Francisco, CA",
    location: "420 Mission St, San Francisco, CA",
    rentPerMonth: 2850,
    price: 2850,
    deposit: 2000,
    maintenanceCharges: 100,
    sqft: 680,
    bedrooms: 1,
    bathrooms: 1,
    floorNumber: 4,
    numberOfRooms: 1,
    verified: true,
    featured: true,
    rating: 4.96,
    reviewCount: 38,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An open-concept architectural studio flooded with natural light from floor-to-ceiling windows. Features custom oak flooring, minimalist European kitchen, workspace with fiber internet, and quiet courtyard views.",
    amenities: [
      "High-Speed Fiber WiFi",
      "En-suite Bathroom",
      "Dedicated Ergonomic Workspace",
      "In-Unit Washer & Dryer",
      "Central AC & Heating",
      "Keyless Smart Lock",
      "Dishwasher",
      "EV Charging"
    ],
    houseRules: [
      "No smoking anywhere on premises",
      "Quiet hours from 10:00 PM to 7:00 AM",
      "Pets considered with owner approval",
      "Subletting requires prior written consent"
    ],
    host: {
      name: "Elena Vance",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      responseTime: "within an hour",
      memberSince: "March 2022",
      rating: 4.98,
      reviewsCount: 142
    },
    availableFrom: "2026-08-01",
    minLeaseMonths: 3,
    lat: 37.788,
    lng: -122.399,
    status: "Published",
    available: true,
    reviews: [
      {
        id: "rev-1",
        userName: "Marcus Chen",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "June 2026",
        comment: "Living here was absolute perfection. Super quiet despite being right in SoMa, and the light in the mornings is unmatched."
      }
    ]
  },
  {
    id: "room-2",
    title: "Monochrome Minimalist Suite",
    slug: "monochrome-minimalist-suite",
    type: "1-Bedroom",
    roomType: "1-Bedroom",
    propertyType: "Apartment",
    city: "New York",
    neighborhood: "Tribeca / Soho",
    address: "180 Franklin St, New York, NY",
    location: "180 Franklin St, New York, NY",
    rentPerMonth: 3400,
    price: 3400,
    deposit: 2500,
    maintenanceCharges: 150,
    sqft: 750,
    bedrooms: 1,
    bathrooms: 1,
    floorNumber: 8,
    numberOfRooms: 2,
    verified: true,
    featured: true,
    rating: 4.92,
    reviewCount: 29,
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Refined 1-bedroom sanctuary in prime Tribeca. High ceilings, polished concrete finishes, custom acoustic baffling, and state-of-the-art kitchen appliances.",
    amenities: [
      "High-Speed Fiber WiFi",
      "En-suite Bathroom",
      "Doorman & Elevator",
      "Fitness Center Access",
      "Dishwasher",
      "Central AC & Heating"
    ],
    houseRules: [
      "No smoking",
      "No large parties or loud events",
      "Small pets allowed with deposit"
    ],
    host: {
      name: "Julian Thorne",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      responseTime: "within 30 mins",
      memberSince: "January 2021",
      rating: 4.95,
      reviewsCount: 98
    },
    availableFrom: "2026-09-01",
    minLeaseMonths: 6,
    lat: 40.718,
    lng: -74.008,
    status: "Published",
    available: true,
    reviews: []
  },
  {
    id: "room-3",
    title: "Nordic Minimalist Loft",
    slug: "nordic-minimalist-loft",
    type: "Loft",
    roomType: "Loft",
    propertyType: "Loft",
    city: "Austin",
    neighborhood: "East Austin Arts District",
    address: "1100 E 5th St, Austin, TX",
    location: "1100 E 5th St, Austin, TX",
    rentPerMonth: 2100,
    price: 2100,
    deposit: 1500,
    maintenanceCharges: 80,
    sqft: 820,
    bedrooms: 1,
    bathrooms: 1,
    floorNumber: 2,
    numberOfRooms: 1,
    verified: true,
    featured: true,
    rating: 4.98,
    reviewCount: 44,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c21360150?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Light-filled industrial loft with private terrace overlooking downtown skyline. White-washed brick walls, custom pine cabinetry, and Google Fiber gigabit connection.",
    amenities: [
      "Gigabit Fiber WiFi",
      "Private Skyline Balcony",
      "In-Unit Laundry",
      "Reserved Garage Parking",
      "Pet Friendly"
    ],
    houseRules: [
      "No smoking",
      "Respect community quiet hours after 10 PM"
    ],
    host: {
      name: "Hannah Lindqvist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      responseTime: "within a few hours",
      memberSince: "August 2023",
      rating: 4.99,
      reviewsCount: 86
    },
    availableFrom: "2026-08-15",
    minLeaseMonths: 1,
    lat: 30.264,
    lng: -97.728,
    status: "Published",
    available: true,
    reviews: []
  },
  {
    id: "room-4",
    title: "Zen Garden Studio",
    slug: "zen-garden-studio",
    type: "Studio",
    roomType: "Studio",
    propertyType: "Studio",
    city: "San Francisco",
    neighborhood: "Presidio Heights",
    address: "3200 Clay St, San Francisco, CA",
    location: "3200 Clay St, San Francisco, CA",
    rentPerMonth: 2450,
    price: 2450,
    deposit: 1800,
    maintenanceCharges: 90,
    sqft: 520,
    bedrooms: 1,
    bathrooms: 1,
    floorNumber: 1,
    numberOfRooms: 1,
    verified: true,
    featured: false,
    rating: 4.88,
    reviewCount: 19,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Serene garden level studio opening directly into a private Japanese maple courtyard. Ultra quiet neighborhood near Presidio trails.",
    amenities: [
      "Private Garden Patio",
      "High-Speed Fiber WiFi",
      "All Utilities Included",
      "Keyless Entry"
    ],
    houseRules: ["No smoking", "No pets"],
    host: {
      name: "Elena Vance",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      responseTime: "within an hour",
      memberSince: "March 2022",
      rating: 4.98,
      reviewsCount: 142
    },
    availableFrom: "2026-09-01",
    minLeaseMonths: 3,
    lat: 37.789,
    lng: -122.446,
    status: "Published",
    available: true,
    reviews: []
  },
  {
    id: "room-5",
    title: "The Glass House Penthouse Suite",
    slug: "glass-house-penthouse-suite",
    type: "Penthouse Suite",
    roomType: "Penthouse Suite",
    propertyType: "Penthouse",
    city: "London",
    neighborhood: "Shoreditch / City",
    address: "88 Commercial St, London, UK",
    location: "88 Commercial St, London, UK",
    rentPerMonth: 3800,
    price: 3800,
    deposit: 3000,
    maintenanceCharges: 200,
    sqft: 950,
    bedrooms: 2,
    bathrooms: 2,
    floorNumber: 15,
    numberOfRooms: 3,
    verified: true,
    featured: true,
    rating: 4.97,
    reviewCount: 52,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Panoramic top-floor suite featuring floor-to-ceiling double-glazed glass, private roof deck, floor heating, and bespoke Italian furnishings.",
    amenities: [
      "Private Rooftop Deck",
      "Underfloor Heating",
      "24/7 Concierge",
      "High-Speed Fiber WiFi",
      "En-suite Bathrooms"
    ],
    houseRules: ["No smoking", "Quiet hours after 11 PM"],
    host: {
      name: "Alistair Sterling",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      responseTime: "within 15 mins",
      memberSince: "November 2020",
      rating: 4.97,
      reviewsCount: 210
    },
    availableFrom: "2026-08-01",
    minLeaseMonths: 3,
    lat: 51.518,
    lng: -0.075,
    status: "Published",
    available: true,
    reviews: []
  }
];

let users = [
  {
    id: "usr-tenant-1",
    name: "Alexandre Mercer",
    email: "alexandre@nestora.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "tenant",
    phone: "+1 (415) 890-2101",
    bio: "Design engineer residing in SF. Looking for minimalist lofts with fiber internet.",
    wishlist: ["room-1", "room-3"],
    isVerifiedOwner: false,
    propertyCount: 0,
  },
  {
    id: "usr-owner-1",
    name: "Elena Vance",
    email: "elena@nestora.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    role: "owner",
    phone: "+1 (415) 555-0199",
    bio: "Architect & Property Owner specializing in high-end minimalist urban suites.",
    isVerifiedOwner: true,
    propertyCount: 2,
    wishlist: [],
  }
];

let bookings = [
  {
    id: "bk-101",
    refCode: "NES-892102",
    roomId: "room-1",
    userId: "usr-tenant-1",
    roomTitle: "The Solarium Loft in SoMa",
    roomImage: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    moveInDate: "2026-08-01",
    leaseDurationMonths: 6,
    monthlyRent: 2850,
    deposit: 2000,
    status: "Approved",
    createdAt: "2026-07-20",
    applicantName: "Alexandre Mercer",
    applicantEmail: "alexandre@nestora.com",
  }
];

let contactSubmissions = [];

export function handleApiRequest(req, res, pathname, query, body) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return true;
  }

  // Health
  if (pathname === '/api/health') {
    res.statusCode = 200;
    res.end(JSON.stringify({ status: 'ok', totalRooms: rooms.length, timestamp: new Date().toISOString() }));
    return true;
  }

  // Auth: Register
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    const { name, email, role } = body || {};
    const newUser = {
      id: 'usr-' + Date.now(),
      name: name || 'Nestora Resident',
      email: email || `user-${Date.now()}@nestora.com`,
      avatar: role === 'owner'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: role || 'tenant',
      phone: '+1 (415) 555-0100',
      bio: 'Verified member of Nestora community.',
      wishlist: [],
      isVerifiedOwner: role === 'owner',
      propertyCount: role === 'owner' ? 1 : 0,
    };
    users.push(newUser);
    const token = `nestora_jwt_${newUser.id}_${Date.now()}`;
    res.statusCode = 201;
    res.end(JSON.stringify({ success: true, message: 'Account created successfully', token, user: newUser }));
    return true;
  }

  // Auth: Login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const { email, role } = body || {};
    let existing = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    if (!existing) {
      existing = {
        id: 'usr-' + Date.now(),
        name: email ? email.split('@')[0] : (role === 'owner' ? 'Property Owner' : 'Nestora Resident'),
        email: email || 'user@nestora.com',
        avatar: role === 'owner' || (email && email.includes('owner'))
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: role || (email && email.includes('owner') ? 'owner' : 'tenant'),
        phone: '+1 (415) 555-0100',
        bio: 'Verified Nestora Member',
        wishlist: [],
        isVerifiedOwner: role === 'owner',
        propertyCount: role === 'owner' ? 1 : 0,
      };
      users.push(existing);
    }
    const token = `nestora_jwt_${existing.id}_${Date.now()}`;
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, message: 'Login successful', token, user: existing }));
    return true;
  }

  // Rooms: Owner My Rooms
  if (pathname === '/api/rooms/owner/my' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, count: rooms.length, rooms: rooms, data: rooms }));
    return true;
  }

  // Rooms: Get All
  if (pathname === '/api/rooms' && req.method === 'GET') {
    const { city, type, maxPrice, verifiedOnly, searchQuery, sortBy } = query || {};
    let result = [...rooms];

    if (city && typeof city === 'string' && city.trim() !== '') {
      result = result.filter(r => r.city.toLowerCase() === city.toLowerCase());
    }
    if (type && typeof type === 'string' && type.trim() !== '') {
      result = result.filter(r => r.type === type || r.roomType === type);
    }
    if (maxPrice && !isNaN(Number(maxPrice))) {
      result = result.filter(r => (r.rentPerMonth || r.price || 0) <= Number(maxPrice));
    }
    if (verifiedOnly === 'true') {
      result = result.filter(r => r.verified);
    }
    if (searchQuery && typeof searchQuery === 'string' && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        r =>
          r.title.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          (r.neighborhood && r.neighborhood.toLowerCase().includes(q)) ||
          (r.description && r.description.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'price-asc') {
      result.sort((a, b) => (a.rentPerMonth || a.price || 0) - (b.rentPerMonth || b.price || 0));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => (b.rentPerMonth || b.price || 0) - (a.rentPerMonth || a.price || 0));
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, count: result.length, data: result, rooms: result }));
    return true;
  }

  // Rooms: Create Room
  if (pathname === '/api/rooms' && req.method === 'POST') {
    const rent = Number(body?.rentPerMonth || body?.price || 2500);
    const title = body?.title || 'Nestora Urban Suite';
    const city = body?.city || 'San Francisco';
    const type = body?.roomType || body?.type || 'Studio';

    const newRoom = {
      id: 'room-' + Date.now(),
      _id: 'room-' + Date.now(),
      title: title,
      slug: (title || 'room').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: type,
      roomType: type,
      propertyType: body?.propertyType || 'Apartment',
      city: city,
      neighborhood: body?.neighborhood || body?.location || 'Central District',
      address: body?.address || body?.location || `${city}, CA`,
      location: body?.location || body?.address || `${city}, CA`,
      rentPerMonth: rent,
      price: rent,
      deposit: Number(body?.deposit) || Math.round(rent * 0.8),
      maintenanceCharges: Number(body?.maintenanceCharges || 100),
      sqft: Number(body?.sqft) || 600,
      bedrooms: Number(body?.bedrooms) || 1,
      bathrooms: Number(body?.bathrooms) || 1,
      floorNumber: Number(body?.floorNumber) || 2,
      numberOfRooms: Number(body?.numberOfRooms) || 1,
      verified: true,
      featured: body?.featured || false,
      rating: 5.0,
      reviewCount: 0,
      images: Array.isArray(body?.images) && body.images.length > 0
        ? body.images
        : ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'],
      description: body?.description || 'Modern, clean minimalist space with high speed internet.',
      amenities: Array.isArray(body?.amenities) ? body.amenities : ['High-Speed WiFi', 'Keyless Entry', 'Central AC'],
      houseRules: Array.isArray(body?.houseRules) ? body.houseRules : ['No smoking on premises'],
      host: body?.host || {
        name: 'Elena Vance',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        isSuperhost: true,
        responseTime: 'within an hour',
        memberSince: 'March 2022',
        rating: 4.98,
        reviewsCount: 142
      },
      availableFrom: body?.availableFrom || new Date().toISOString().split('T')[0],
      minLeaseMonths: Number(body?.minLeaseMonths) || 3,
      lat: body?.lat || 37.788,
      lng: body?.lng || -122.399,
      status: body?.available === false ? 'Paused' : 'Published',
      available: body?.available !== false,
      reviews: []
    };

    rooms.unshift(newRoom);
    res.statusCode = 201;
    res.end(JSON.stringify({ success: true, message: 'Room listing created successfully', data: newRoom, room: newRoom }));
    return true;
  }

  // Rooms: Single Room, Update, Delete
  const roomMatch = pathname.match(/^\/api\/rooms\/([^/]+)$/);
  if (roomMatch) {
    const roomId = roomMatch[1];
    if (req.method === 'GET') {
      const found = rooms.find(r => r.id === roomId || r._id === roomId);
      if (!found) {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, message: 'Room not found' }));
        return true;
      }
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, data: found, room: found }));
      return true;
    }
    if (req.method === 'PUT') {
      const idx = rooms.findIndex(r => r.id === roomId || r._id === roomId);
      if (idx === -1) {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, message: 'Room not found' }));
        return true;
      }
      rooms[idx] = { ...rooms[idx], ...(body || {}) };
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, message: 'Room updated successfully', data: rooms[idx], room: rooms[idx] }));
      return true;
    }
    if (req.method === 'DELETE') {
      const idx = rooms.findIndex(r => r.id === roomId || r._id === roomId);
      if (idx === -1) {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, message: 'Room not found' }));
        return true;
      }
      const deleted = rooms.splice(idx, 1);
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, message: 'Room deleted successfully', data: deleted[0] }));
      return true;
    }
  }

  // Bookings: GET & POST
  if (pathname === '/api/bookings' && req.method === 'GET') {
    const { userId } = query || {};
    let result = [...bookings];
    if (userId) {
      result = result.filter(b => b.userId === userId);
    }
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, count: result.length, data: result, bookings: result }));
    return true;
  }

  if (pathname === '/api/bookings' && req.method === 'POST') {
    const { roomId, roomTitle, roomImage, moveInDate, leaseDurationMonths, monthlyRent, deposit, applicantName, applicantEmail, userId } = body || {};
    const refCode = 'NES-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: 'bk-' + Date.now(),
      refCode,
      roomId: roomId || 'room-1',
      userId: userId || 'usr-tenant-1',
      roomTitle: roomTitle || 'Nestora Studio',
      roomImage: roomImage || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      moveInDate: moveInDate || new Date().toISOString().split('T')[0],
      leaseDurationMonths: Number(leaseDurationMonths) || 3,
      monthlyRent: Number(monthlyRent || 2500),
      deposit: Number(deposit) || 2000,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
      applicantName: applicantName || 'Resident Applicant',
      applicantEmail: applicantEmail || 'applicant@nestora.com',
    };
    bookings.unshift(newBooking);
    res.statusCode = 201;
    res.end(JSON.stringify({ success: true, message: 'Application submitted to host', data: newBooking, booking: newBooking }));
    return true;
  }

  // Booking status update
  const bookingStatusMatch = pathname.match(/^\/api\/bookings\/([^/]+)\/status$/);
  if (bookingStatusMatch && req.method === 'PUT') {
    const bId = bookingStatusMatch[1];
    const target = bookings.find(b => b.id === bId);
    if (!target) {
      res.statusCode = 404;
      res.end(JSON.stringify({ success: false, message: 'Booking not found' }));
      return true;
    }
    target.status = body?.status || target.status;
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, message: `Booking status updated to ${target.status}`, data: target }));
    return true;
  }

  // Contact POST
  if (pathname === '/api/contact' && req.method === 'POST') {
    const { name, email, topic, message } = body || {};
    const newSubmission = {
      id: 'cnt-' + Date.now(),
      name: name || 'Anonymous',
      email: email || 'user@nestora.com',
      topic: topic || 'General Inquiry',
      message: message || '',
      createdAt: new Date().toISOString(),
    };
    contactSubmissions.unshift(newSubmission);
    res.statusCode = 201;
    res.end(JSON.stringify({ success: true, message: 'Message received! Nestora Concierge team will respond shortly.', data: newSubmission }));
    return true;
  }

  // AI Assistant POST
  if (pathname === '/api/ai/assistant' && req.method === 'POST') {
    const { message } = body || {};
    const lower = (message || '').toLowerCase();
    let replyText = "Nestora features verified minimalist lofts and studios across San Francisco, New York, Austin, and London with 100% Escrow Protection.";
    let matchedRooms = rooms.slice(0, 2);

    if (lower.includes("san francisco") || lower.includes("sf")) {
      matchedRooms = rooms.filter(r => r.city === "San Francisco");
      replyText = `Found ${matchedRooms.length} verified listings in San Francisco with fiber internet and flexible leases.`;
    } else if (lower.includes("new york") || lower.includes("nyc")) {
      matchedRooms = rooms.filter(r => r.city === "New York");
      replyText = `Here are luxury Tribeca & Soho suites available in New York City with doorman access.`;
    } else if (lower.includes("escrow") || lower.includes("deposit") || lower.includes("security")) {
      replyText = "Nestora Escrow holds your deposit safely until move-in day. The host receives payment only after you inspect the property.";
    } else if (lower.includes("owner") || lower.includes("host") || lower.includes("list")) {
      replyText = "To list your space as a Property Owner: Sign in -> Select Owner Role -> Click 'Add New Room' on your Owner Dashboard.";
    }

    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      replyText,
      matchedRooms,
      actionLink: { label: 'Explore All Listings', page: 'browse' }
    }));
    return true;
  }

  return false;
}
