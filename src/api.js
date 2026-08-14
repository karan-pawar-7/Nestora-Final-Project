import axios from 'axios';

// Backend Base URL configuration
// Use explicit VITE_API_BASE_URL if set, otherwise default to relative '/api'
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create Axios Instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Automatically attach JWT token from localStorage
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('nestora_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn('Could not read token from localStorage', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Token Expiration / Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Session expired or unauthorized. Clearing stored credentials.');
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('nestora_token');
        localStorage.removeItem('user');
        localStorage.removeItem('nestora_user');
        window.dispatchEvent(new Event('nestora_auth_expired'));
      } catch (err) {
        console.error(err);
      }
    }
    return Promise.reject(error);
  }
);

// ==========================================
// DATA MAPPING HELPERS (MongoDB <-> Frontend)
// ==========================================

/**
 * Maps a MongoDB Room Document to the rich frontend Room object.
 * Resolves _id to id, price to rentPerMonth, roomType to type, and guarantees all UI fields.
 */
export const mapBackendRoomToFrontend = (backendRoom) => {
  if (!backendRoom) return null;

  const mongoId = backendRoom._id ? String(backendRoom._id) : (backendRoom.id || `room-${Date.now()}`);
  const rent = Number(backendRoom.price || backendRoom.rentPerMonth || 1500);
  const roomType = backendRoom.roomType || backendRoom.type || 'Single Room';
  const location = backendRoom.location || backendRoom.address || backendRoom.neighborhood || 'Central District';
  const city = backendRoom.city || 'Chhatrapati Sambhajinagar';
  const images = Array.isArray(backendRoom.images) && backendRoom.images.length > 0
    ? backendRoom.images
    : [
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      ];
  const amenities = Array.isArray(backendRoom.amenities) ? backendRoom.amenities : [];

  // Determine owner/host information
  let hostName = 'Verified Host';
  let hostAvatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';
  let ownerId = '';

  if (backendRoom.owner && typeof backendRoom.owner === 'object') {
    hostName = backendRoom.owner.name || hostName;
    ownerId = String(backendRoom.owner._id || backendRoom.owner.id || '');
  } else if (backendRoom.owner) {
    ownerId = String(backendRoom.owner);
  }

  if (backendRoom.host && typeof backendRoom.host === 'object') {
    hostName = backendRoom.host.name || hostName;
    hostAvatar = backendRoom.host.avatar || hostAvatar;
  }

  return {
    ...backendRoom,
    id: mongoId,
    _id: backendRoom._id || mongoId,
    title: backendRoom.title || 'Nestora Urban Suite',
    slug: (backendRoom.title || 'room').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    type: roomType,
    roomType: roomType,
    propertyType: backendRoom.propertyType || 'Apartment',
    city: city,
    neighborhood: backendRoom.neighborhood || location,
    address: location,
    location: location,
    country: backendRoom.country || 'India',
    state: backendRoom.state || 'Maharashtra',
    rentPerMonth: rent,
    price: rent,
    deposit: backendRoom.deposit !== undefined ? Number(backendRoom.deposit) : Math.round(rent * 0.8),
    maintenanceCharges: backendRoom.maintenanceCharges !== undefined ? Number(backendRoom.maintenanceCharges) : 100,
    sqft: backendRoom.sqft || 650,
    bedrooms: backendRoom.bedrooms || 1,
    bathrooms: backendRoom.bathrooms || 1,
    floorNumber: backendRoom.floorNumber || 2,
    numberOfRooms: backendRoom.numberOfRooms || 1,
    verified: backendRoom.verified !== undefined ? backendRoom.verified : true,
    featured: backendRoom.featured || false,
    rating: backendRoom.rating || 4.9,
    reviewCount: backendRoom.reviewCount || 12,
    images: images,
    description: backendRoom.description || 'Bright and modern living space equipped with modern furnishings and amenities.',
    amenities: amenities,
    houseRules: backendRoom.houseRules || [
      'No smoking inside the premises',
      'Quiet hours after 10:00 PM',
      'Keep common areas tidy',
    ],
    host: {
      name: hostName,
      avatar: hostAvatar,
      isSuperhost: true,
      responseTime: 'within 15 mins',
      memberSince: '2024',
      rating: 4.96,
      reviewsCount: 24,
    },
    availableFrom: backendRoom.availableFrom || '2026-08-01',
    minLeaseMonths: backendRoom.minLeaseMonths || 6,
    lat: backendRoom.lat || 19.8762,
    lng: backendRoom.lng || 75.3433,
    reviews: backendRoom.reviews || [],
    status: backendRoom.available !== false ? (backendRoom.status || 'Published') : 'Paused',
    available: backendRoom.available !== false,
    viewsCount: backendRoom.viewsCount || 85,
    bookingsCount: backendRoom.bookingsCount || 2,
    owner: backendRoom.owner,
    ownerId: ownerId,
    createdAt: backendRoom.createdAt,
    updatedAt: backendRoom.updatedAt,
  };
};

/**
 * Maps a Frontend Room payload into MongoDB Schema format required by the backend.
 */
export const mapFrontendRoomToBackend = (frontendRoom) => {
  if (!frontendRoom) return {};

  const images = Array.isArray(frontendRoom.images) && frontendRoom.images.length > 0
    ? frontendRoom.images
    : [
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      ];

  const price = Number(frontendRoom.price || frontendRoom.rentPerMonth || 5000);
  const location = frontendRoom.location || frontendRoom.address || frontendRoom.neighborhood || 'Main Road';
  const city = frontendRoom.city || 'Chhatrapati Sambhajinagar';
  const roomType = frontendRoom.roomType || frontendRoom.type || 'Single Room';
  const propertyType = frontendRoom.propertyType || 'Room';
  const amenities = Array.isArray(frontendRoom.amenities) ? frontendRoom.amenities : [];
  const available = frontendRoom.status !== 'Paused' && frontendRoom.available !== false;

  return {
    title: frontendRoom.title || 'Modern Room',
    description: frontendRoom.description || 'Comfortable and spacious living room with all essential facilities.',
    location: location,
    city: city,
    price: price,
    roomType: roomType,
    propertyType: propertyType,
    images: images,
    amenities: amenities,
    available: available,
    // Include optional extended metadata
    deposit: Number(frontendRoom.deposit || Math.round(price * 0.8)),
    maintenanceCharges: Number(frontendRoom.maintenanceCharges || 100),
    sqft: Number(frontendRoom.sqft || 650),
    bedrooms: Number(frontendRoom.bedrooms || 1),
    bathrooms: Number(frontendRoom.bathrooms || 1),
    minLeaseMonths: Number(frontendRoom.minLeaseMonths || 6),
    availableFrom: frontendRoom.availableFrom || '2026-08-01',
  };
};

// ==========================================
// API ENDPOINTS IMPLEMENTATION
// ==========================================

// --- AUTHENTICATION APIS ---

/**
 * Register a new user (tenant or owner)
 * POST /api/auth/register
 */
export const registerUser = async ({ name, email, password, role }) => {
  const response = await apiClient.post('/auth/register', {
    name,
    email,
    password,
    role: role || 'tenant',
  });

  const { token, user } = response.data;
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('nestora_token', token);
  }
  if (user) {
    const formattedUser = {
      ...user,
      id: user.id || user._id,
      avatar: user.role === 'owner'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      wishlist: [],
      bookings: [],
    };
    localStorage.setItem('user', JSON.stringify(formattedUser));
    localStorage.setItem('nestora_user', JSON.stringify(formattedUser));
    return { token, user: formattedUser };
  }
  return response.data;
};

/**
 * Login user and retrieve JWT token
 * POST /api/auth/login
 */
export const loginUser = async ({ email, password }) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });

  const { token, user } = response.data;
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('nestora_token', token);
  }
  if (user) {
    const formattedUser = {
      ...user,
      id: user.id || user._id,
      avatar: user.role === 'owner'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      wishlist: [],
      bookings: [],
    };
    localStorage.setItem('user', JSON.stringify(formattedUser));
    localStorage.setItem('nestora_user', JSON.stringify(formattedUser));
    return { token, user: formattedUser };
  }
  return response.data;
};

// --- ROOMS APIS ---

/**
 * Get all rooms with optional filtering (Public)
 * GET /api/rooms
 */
export const getRooms = async (params = {}) => {
  const response = await apiClient.get('/rooms', { params });
  const rawList = response.data?.rooms || response.data?.data || (Array.isArray(response.data) ? response.data : []);
  return rawList.map(mapBackendRoomToFrontend).filter(Boolean);
};

/**
 * Get single room by ID (Public)
 * GET /api/rooms/:id
 */
export const getRoomById = async (id) => {
  const response = await apiClient.get(`/rooms/${id}`);
  const rawRoom = response.data?.room || response.data?.data || response.data;
  return mapBackendRoomToFrontend(rawRoom);
};

/**
 * Get logged-in owner's rooms (Private - requires Owner JWT)
 * GET /api/rooms/owner/my
 */
export const getOwnerRooms = async () => {
  const response = await apiClient.get('/rooms/owner/my');
  const rawList = response.data?.rooms || response.data?.data || (Array.isArray(response.data) ? response.data : []);
  return rawList.map(mapBackendRoomToFrontend).filter(Boolean);
};

/**
 * Create a new room listing (Private - Owner only)
 * POST /api/rooms
 */
export const createRoom = async (roomData) => {
  const backendPayload = mapFrontendRoomToBackend(roomData);
  const response = await apiClient.post('/rooms', backendPayload);
  const createdRaw = response.data?.room || response.data?.data || response.data;
  return mapBackendRoomToFrontend(createdRaw);
};

/**
 * Update an existing room listing (Private - Owner only)
 * PUT /api/rooms/:id
 */
export const updateRoom = async (id, roomData) => {
  const backendPayload = mapFrontendRoomToBackend(roomData);
  const response = await apiClient.put(`/rooms/${id}`, backendPayload);
  const updatedRaw = response.data?.room || response.data?.data || response.data;
  return mapBackendRoomToFrontend(updatedRaw);
};

/**
 * Delete a room listing (Private - Owner only)
 * DELETE /api/rooms/:id
 */
export const deleteRoom = async (id) => {
  const response = await apiClient.delete(`/rooms/${id}`);
  return response.data;
};

export default {
  API_BASE_URL,
  apiClient,
  registerUser,
  loginUser,
  getRooms,
  getRoomById,
  getOwnerRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  mapBackendRoomToFrontend,
  mapFrontendRoomToBackend,
};
