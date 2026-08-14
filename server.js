import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

// Initial In-Memory Seed Data for Rooms
let rooms = [
  {
    id: "room-1",
    title: "The Solarium Loft in SoMa",
    slug: "solarium-loft-soma",
    type: "Studio",
    city: "San Francisco",
    neighborhood: "SoMa / Financial District",
    address: "420 Mission St, San Francisco, CA",
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
    reviews: [
      {
        id: "rev-1",
        userName: "Marcus Chen",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "June 2026",
        comment: "Living here was absolute perfection. Super quiet despite being right in SoMa, and the light in the mornings is unmatched."
      },
      {
        id: "rev-2",
        userName: "Sophia Rodriguez",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "May 2026",
        comment: "Elena is a phenomenal host. Everything feels brand new, clean, and meticulously maintained."
      }
    ]
  },
  {
    id: "room-2",
    title: "Monochrome Minimalist Suite",
    slug: "monochrome-minimalist-suite",
    type: "1-Bedroom",
    city: "New York",
    neighborhood: "Tribeca / Soho",
    address: "180 Franklin St, New York, NY",
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
    reviews: [
      {
        id: "rev-3",
        userName: "David Kim",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "April 2026",
        comment: "Top notch property in NYC. Very secure, spotless clean, and quiet street."
      }
    ]
  },
  {
    id: "room-3",
    title: "Nordic Minimalist Loft",
    slug: "nordic-minimalist-loft",
    type: "Loft",
    city: "Austin",
    neighborhood: "East Austin Arts District",
    address: "1100 E 5th St, Austin, TX",
    rentPerMonth: 2100,
    deposit: 1500,
    sqft: 820,
    bedrooms: 1,
    bathrooms: 1,
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
    reviews: [
      {
        id: "rev-4",
        userName: "Chloe Bennett",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "May 2026",
        comment: "Fabulous location in East Austin! The gigabit internet made remote work effortless."
      }
    ]
  },
  {
    id: "room-4",
    title: "Zen Garden Studio",
    slug: "zen-garden-studio",
    type: "Studio",
    city: "San Francisco",
    neighborhood: "Presidio Heights",
    address: "3200 Clay St, San Francisco, CA",
    rentPerMonth: 2450,
    deposit: 1800,
    sqft: 520,
    bedrooms: 1,
    bathrooms: 1,
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
    reviews: []
  },
  {
    id: "room-5",
    title: "The Glass House Penthouse Suite",
    slug: "glass-house-penthouse-suite",
    type: "Penthouse Suite",
    city: "London",
    neighborhood: "Shoreditch / City",
    address: "88 Commercial St, London, UK",
    rentPerMonth: 3800,
    deposit: 3000,
    sqft: 950,
    bedrooms: 2,
    bathrooms: 2,
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
    reviews: []
  }
];

// In-memory Bookings / Applications Store
let bookings = [
  {
    id: "bk-101",
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

// In-memory Users Store
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

// In-memory Contact Submissions
let contactSubmissions = [];

// API ROUTES

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Nestora Full-Stack API",
    totalRooms: rooms.length,
    totalBookings: bookings.length,
    timestamp: new Date().toISOString(),
  });
});

// GET /api/rooms/owner/my - Get rooms belonging to current owner
app.get("/api/rooms/owner/my", (req, res) => {
  res.json({ success: true, count: rooms.length, rooms: rooms, data: rooms });
});

// GET /api/rooms - Get all or filtered rooms
app.get("/api/rooms", (req, res) => {
  const { city, type, maxPrice, verifiedOnly, searchQuery, sortBy } = req.query;

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

  res.json({ success: true, count: result.length, data: result, rooms: result });
});

// GET /api/rooms/:id - Get single room
app.get("/api/rooms/:id", (req, res) => {
  const room = rooms.find(r => r.id === req.params.id);
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  res.json({ success: true, data: room });
});

// POST /api/rooms - Create new room (Property Owner)
app.post("/api/rooms", (req, res) => {
  const body = req.body;
  const rent = Number(body.rentPerMonth || body.price || 2500);
  const title = body.title || 'Nestora Urban Suite';
  const city = body.city || 'San Francisco';
  const type = body.roomType || body.type || 'Studio';

  const newRoom = {
    id: 'room-' + Date.now(),
    title: title,
    slug: (title || 'room').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    type: type,
    roomType: type,
    propertyType: body.propertyType || 'Apartment',
    city: city,
    neighborhood: body.neighborhood || body.location || 'Central District',
    address: body.address || body.location || `${city}, CA`,
    location: body.location || body.address || `${city}, CA`,
    rentPerMonth: rent,
    price: rent,
    deposit: Number(body.deposit) || Math.round(rent * 0.8),
    maintenanceCharges: Number(body.maintenanceCharges || 100),
    sqft: Number(body.sqft) || 600,
    bedrooms: Number(body.bedrooms) || 1,
    bathrooms: Number(body.bathrooms) || 1,
    floorNumber: Number(body.floorNumber) || 2,
    numberOfRooms: Number(body.numberOfRooms) || 1,
    verified: true,
    featured: body.featured || false,
    rating: 5.0,
    reviewCount: 0,
    images: body.images && body.images.length > 0
      ? body.images
      : ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'],
    description: body.description || 'Modern, clean minimalist space with high speed internet.',
    amenities: body.amenities || ['High-Speed WiFi', 'Keyless Entry', 'Central AC'],
    houseRules: body.houseRules || ['No smoking on premises'],
    host: body.host || {
      name: 'Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      responseTime: 'within an hour',
      memberSince: 'March 2022',
      rating: 4.98,
      reviewsCount: 142
    },
    availableFrom: body.availableFrom || new Date().toISOString().split('T')[0],
    minLeaseMonths: Number(body.minLeaseMonths) || 3,
    lat: body.lat || 37.788,
    lng: body.lng || -122.399,
    status: body.available === false ? 'Paused' : 'Published',
    available: body.available !== false,
    reviews: []
  };

  rooms.unshift(newRoom);
  res.status(201).json({ success: true, message: "Room listing created successfully", data: newRoom, room: newRoom });
});

// PUT /api/rooms/:id - Update room
app.put("/api/rooms/:id", (req, res) => {
  const index = rooms.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }

  rooms[index] = { ...rooms[index], ...req.body };
  res.json({ success: true, message: "Room updated successfully", data: rooms[index], room: rooms[index] });
});

// DELETE /api/rooms/:id - Delete room
app.delete("/api/rooms/:id", (req, res) => {
  const index = rooms.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }

  const deleted = rooms.splice(index, 1);
  res.json({ success: true, message: "Room deleted successfully", data: deleted[0] });
});

// GET /api/bookings - Get user or owner bookings
app.get("/api/bookings", (req, res) => {
  const { userId } = req.query;
  let result = [...bookings];
  if (userId && typeof userId === 'string') {
    result = result.filter(b => b.userId === userId);
  }
  res.json({ success: true, count: result.length, data: result });
});

// POST /api/bookings - Submit new rental application
app.post("/api/bookings", (req, res) => {
  const { roomId, roomTitle, roomImage, moveInDate, leaseDurationMonths, monthlyRent, deposit, applicantName, applicantEmail, userId } = req.body;

  if (!roomId || !monthlyRent) {
    return res.status(400).json({ success: false, message: "Missing required booking details" });
  }

  const refCode = 'NES-' + Math.floor(100000 + Math.random() * 900000);
  const newBooking = {
    id: 'bk-' + Date.now(),
    refCode,
    roomId,
    userId: userId || 'usr-tenant-1',
    roomTitle: roomTitle || 'Nestora Studio',
    roomImage: roomImage || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    moveInDate: moveInDate || new Date().toISOString().split('T')[0],
    leaseDurationMonths: Number(leaseDurationMonths) || 3,
    monthlyRent: Number(monthlyRent),
    deposit: Number(deposit) || 2000,
    status: 'Pending',
    createdAt: new Date().toISOString().split('T')[0],
    applicantName: applicantName || 'Resident Applicant',
    applicantEmail: applicantEmail || 'applicant@nestora.com',
  };

  bookings.unshift(newBooking);
  res.status(201).json({ success: true, message: "Application submitted to host", data: newBooking });
});

// PUT /api/bookings/:id/status - Update booking status
app.put("/api/bookings/:id/status", (req, res) => {
  const { status } = req.body;
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  booking.status = status || booking.status;
  res.json({ success: true, message: `Booking status updated to ${booking.status}`, data: booking });
});

// POST /api/auth/login - Authentication endpoint
app.post("/api/auth/login", (req, res) => {
  const { email, role } = req.body;

  let existing = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!existing) {
    if (role === 'owner' || (email && email.toLowerCase().includes('owner'))) {
      existing = {
        id: 'usr-' + Date.now(),
        name: email ? email.split('@')[0] : 'Property Owner',
        email: email || 'owner@nestora.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        role: 'owner',
        phone: '+1 (415) 555-0199',
        bio: 'Verified Property Owner at Nestora.',
        wishlist: [],
        isVerifiedOwner: true,
        propertyCount: 1,
      };
    } else {
      existing = {
        id: 'usr-' + Date.now(),
        name: email ? email.split('@')[0] : 'Nestora Resident',
        email: email || 'resident@nestora.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: 'tenant',
        phone: '+1 (415) 555-0100',
        bio: 'Verified Resident at Nestora.',
        wishlist: [],
        isVerifiedOwner: false,
        propertyCount: 0,
      };
    }
    users.push(existing);
  }

  const token = `nestora_jwt_${existing.id}_${Date.now()}`;
  res.json({ success: true, message: "Login successful", token, user: existing });
});

// POST /api/auth/register - User Registration
app.post("/api/auth/register", (req, res) => {
  const { name, email, role } = req.body;

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
  res.status(201).json({ success: true, message: "Account created successfully", token, user: newUser });
});

// POST /api/contact - Submit contact form message
app.post("/api/contact", (req, res) => {
  const { name, email, topic, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Please provide name, email, and message." });
  }

  const newSubmission = {
    id: 'cnt-' + Date.now(),
    name,
    email,
    topic: topic || 'General Inquiry',
    message,
    createdAt: new Date().toISOString(),
  };

  contactSubmissions.unshift(newSubmission);
  res.status(201).json({ success: true, message: "Message received! Nestora Concierge team will respond shortly.", data: newSubmission });
});

// POST /api/ai/assistant - Gemini AI Assistant Endpoint
app.post("/api/ai/assistant", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, message: "Message query is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const availableRoomsSummary = rooms.map(r => 
        `- ID: ${r.id}, Title: "${r.title}", Type: ${r.type}, City: ${r.city}, Rent: $${r.rentPerMonth}/mo, SqFt: ${r.sqft}, Amenities: ${r.amenities.slice(0, 4).join(', ')}`
      ).join('\n');

      const systemPrompt = `You are Nestora AI Concierge, an elite assistant for Nestora—a minimalist luxury room rental platform.
Your job is to answer questions about available rooms, lease terms, escrow protection, or hosting properties with crisp, friendly, architectural design authority.

Available Rooms Dataset:
${availableRoomsSummary}

Instructions:
1. Provide a direct, helpful response in 2-3 concise sentences.
2. If the user asks about specific cities (San Francisco, New York, Austin, London), prices, or room types, mention matching room titles.
3. Be professional, clear, and reassuring about Nestora's 100% verified escrow protection.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
        ]
      });

      const replyText = response.text || "I'm happy to help you discover verified minimalist spaces on Nestora.";

      // Find matching room IDs if user mentioned city or type
      const lower = message.toLowerCase();
      let matchedRooms = rooms.filter(r => 
        lower.includes(r.city.toLowerCase()) || 
        lower.includes(r.type.toLowerCase()) ||
        lower.includes(r.neighborhood.toLowerCase())
      ).slice(0, 2);

      if (matchedRooms.length === 0 && (lower.includes('room') || lower.includes('space') || lower.includes('rent') || lower.includes('cheap'))) {
        matchedRooms = rooms.slice(0, 2);
      }

      return res.json({
        success: true,
        replyText,
        matchedRooms,
        actionLink: { label: 'Browse Matching Listings', page: 'browse' }
      });

    } catch (err) {
      console.error("Gemini AI API call error:", err);
      // Fallback gracefully
    }
  }

  // Fallback response generator if GEMINI_API_KEY is not set or API error
  const lower = message.toLowerCase();
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

  return res.json({
    success: true,
    replyText,
    matchedRooms,
    actionLink: { label: 'Explore All Listings', page: 'browse' }
  });
});

// VITE MIDDLEWARE & STATIC SERVER SETUP
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nestora Full-Stack Express Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
