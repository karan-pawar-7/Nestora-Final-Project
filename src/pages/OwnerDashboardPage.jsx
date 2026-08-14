import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarCheck,
  MessageSquare,
  DollarSign,
  Star,
  ShieldCheck,
  Settings,
  LogOut,
  Eye,
  PauseCircle,
  PlayCircle,
  Copy,
  Trash2,
  Upload,
  MapPin,
  Check,
  Send,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const AMENITY_OPTIONS = [
  'High-Speed Fiber WiFi',
  'Garage Parking',
  'Full Kitchen',
  'Air Conditioning',
  'Attached Bathroom',
  'Private Balcony',
  'Elevator Access',
  'Power Backup',
  'Fully Furnished',
  'In-Unit Washer & Dryer',
  '24/7 CCTV Security',
  'Water Supply'
];

export const OwnerDashboardPage = ({
  user,
  ownerRooms,
  onAddNewRoom,
  onUpdateRoom,
  onDeleteRoom,
  onSelectRoom,
  onNavigate,
  onLogout,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Listings state
  const [myListings, setMyListings] = useState(
    ownerRooms.length > 0
      ? ownerRooms
      : [
          {
            id: 'owner-room-1',
            title: 'The Solarium Loft in SoMa',
            slug: 'solarium-loft-soma',
            type: 'Loft',
            propertyType: 'Loft',
            city: 'San Francisco',
            neighborhood: 'SoMa District',
            address: '420 Mission Street #1200',
            country: 'United States',
            state: 'California',
            rentPerMonth: 2850,
            deposit: 2000,
            maintenanceCharges: 150,
            sqft: 850,
            bedrooms: 1,
            bathrooms: 1,
            floorNumber: 12,
            numberOfRooms: 2,
            verified: true,
            featured: true,
            rating: 4.95,
            reviewCount: 18,
            images: [
              'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
            ],
            description: 'Luxury floor-to-ceiling glass loft with high-speed fiber internet and views of standard city skylines.',
            amenities: ['High-Speed Fiber WiFi', 'Private Balcony', 'In-Unit Washer & Dryer'],
            houseRules: ['No smoking indoors', 'Quiet hours after 10 PM'],
            host: {
              name: user.name,
              avatar: user.avatar,
              isSuperhost: true,
              responseTime: '15 mins',
              memberSince: '2024',
              rating: 4.95,
              reviewsCount: 18,
            },
            availableFrom: '2026-08-01',
            minLeaseMonths: 6,
            lat: 37.7892,
            lng: -122.4014,
            reviews: [],
            status: 'Published',
            viewsCount: 1240,
            bookingsCount: 4,
          },
          {
            id: 'owner-room-2',
            title: 'Monochrome Urban Studio',
            slug: 'monochrome-urban-studio',
            type: 'Studio',
            propertyType: 'Studio',
            city: 'San Francisco',
            neighborhood: 'Hayes Valley',
            address: '550 Hayes Street',
            country: 'United States',
            state: 'California',
            rentPerMonth: 2100,
            deposit: 1500,
            maintenanceCharges: 100,
            sqft: 520,
            bedrooms: 1,
            bathrooms: 1,
            floorNumber: 3,
            numberOfRooms: 1,
            verified: true,
            featured: false,
            rating: 4.88,
            reviewCount: 9,
            images: [
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            ],
            description: 'Ultra-clean studio designed with matte black finishes and custom wooden millwork.',
            amenities: ['High-Speed Fiber WiFi', 'Full Kitchen', 'Air Conditioning'],
            houseRules: ['No pets allowed'],
            host: {
              name: user.name,
              avatar: user.avatar,
              isSuperhost: true,
              responseTime: '15 mins',
              memberSince: '2024',
              rating: 4.88,
              reviewsCount: 9,
            },
            availableFrom: '2026-09-01',
            minLeaseMonths: 3,
            lat: 37.7765,
            lng: -122.4242,
            reviews: [],
            status: 'Booked',
            viewsCount: 890,
            bookingsCount: 2,
          },
        ]
  );

  useEffect(() => {
    if (ownerRooms && ownerRooms.length > 0) {
      setMyListings(ownerRooms);
    }
  }, [ownerRooms]);

  // Booking Requests State
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 'req-1',
      tenantId: 'usr-tenant-1',
      tenantName: 'Alexandre Mercer',
      tenantPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (415) 890-2101',
      email: 'alexandre@nestora.com',
      roomId: 'owner-room-1',
      roomTitle: 'The Solarium Loft in SoMa',
      roomImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      bookingDate: '2026-07-26',
      requestedMoveInDate: '2026-08-01',
      leaseMonths: 6,
      message: 'Hi Elena, I am a design engineer looking for a quiet loft close to SoMa tech hubs. Clean background history available.',
      status: 'Pending',
    },
    {
      id: 'req-2',
      tenantId: 'usr-tenant-2',
      tenantName: 'Sophie Lin',
      tenantPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (415) 771-0022',
      email: 'sophie.lin@example.com',
      roomId: 'owner-room-2',
      roomTitle: 'Monochrome Urban Studio',
      roomImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      bookingDate: '2026-07-25',
      requestedMoveInDate: '2026-09-01',
      leaseMonths: 12,
      message: 'Interested in a 1-year lease for your Hayes Valley studio. I work in product design.',
      status: 'Approved',
    },
  ]);

  // Chat State
  const [conversations, setConversations] = useState([
    {
      id: 'conv-owner-1',
      participantId: 'usr-tenant-1',
      participantName: 'Alexandre Mercer (Tenant)',
      participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      participantRole: 'tenant',
      roomTitle: 'The Solarium Loft in SoMa',
      lastMessage: 'Thank you Elena! Looking forward to moving in August 1st.',
      unreadCount: 1,
      updatedAt: '11:15 AM',
      messages: [
        {
          id: 'm10',
          senderId: 'usr-tenant-1',
          senderName: 'Alexandre Mercer',
          senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          text: 'Hi Elena, I submitted my rental application for the Solarium Loft.',
          timestamp: 'Yesterday 4:15 PM',
          read: true,
        },
        {
          id: 'm11',
          senderId: user.id,
          senderName: user.name,
          senderAvatar: user.avatar,
          text: 'Hi Alexandre, I reviewed your profile and approved your move-in request!',
          timestamp: '11:00 AM',
          read: true,
        },
        {
          id: 'm12',
          senderId: 'usr-tenant-1',
          senderName: 'Alexandre Mercer',
          senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          text: 'Thank you Elena! Looking forward to moving in August 1st.',
          timestamp: '11:15 AM',
          read: false,
        },
      ],
    },
  ]);
  const [activeConvId, setActiveConvId] = useState('conv-owner-1');
  const [chatText, setChatText] = useState('');

  // Reviews State
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      roomId: 'owner-room-1',
      roomTitle: 'The Solarium Loft in SoMa',
      tenantName: 'Marcus Vance',
      tenantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: 'June 2026',
      comment: 'Elena is an exceptional host. The loft was immaculately clean, with blazingly fast fiber internet and seamless keyless entry.',
      ownerReply: 'Thank you Marcus! You were a model tenant and welcome back anytime.',
    },
    {
      id: 'rev-2',
      roomId: 'owner-room-2',
      roomTitle: 'Monochrome Urban Studio',
      tenantName: 'Clara Hayes',
      tenantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: 'May 2026',
      comment: 'Fantastic location in Hayes Valley. Maintenance requests were responded to in minutes!',
    },
  ]);
  const [replyTextMap, setReplyTextMap] = useState({});

  // MULTI-STEP "ADD NEW ROOM" FORM STATE (6 Steps)
  const [addStep, setAddStep] = useState(1);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPropType, setNewPropType] = useState('Apartment');
  const [newRoomType, setNewRoomType] = useState('Studio');
  const [newSqft, setNewSqft] = useState(650);
  const [newFloor, setNewFloor] = useState(4);
  const [newTotalRooms, setNewTotalRooms] = useState(2);

  const [newCountry, setNewCountry] = useState('United States');
  const [newState, setNewState] = useState('California');
  const [newCity, setNewCity] = useState('San Francisco');
  const [newNeighborhood, setNewNeighborhood] = useState('SoMa District');
  const [newAddress, setNewAddress] = useState('');

  const [newRent, setNewRent] = useState(2500);
  const [newDeposit, setNewDeposit] = useState(2000);
  const [newMaintenance, setNewMaintenance] = useState(100);
  const [newAvailableDate, setNewAvailableDate] = useState('2026-09-01');
  const [newMinLease, setNewMinLease] = useState(6);

  const [selectedAmenities, setSelectedAmenities] = useState([
    'High-Speed Fiber WiFi',
    'Full Kitchen',
  ]);

  const [newCoverImage, setNewCoverImage] = useState(
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
  );
  const [newGalleryImages, setNewGalleryImages] = useState([
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
  ]);

  // Handlers for Listings
  const handleTogglePauseStatus = (roomId) => {
    setMyListings((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          const nextStatus = r.status === 'Published' ? 'Paused' : 'Published';
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  const handleDeleteListing = (roomId) => {
    setMyListings((prev) => prev.filter((r) => r.id !== roomId));
    onDeleteRoom(roomId);
  };

  const handleDuplicateListing = (room) => {
    const dup = {
      ...room,
      id: 'dup-' + Date.now(),
      title: `${room.title} (Copy)`,
      status: 'Draft',
    };
    setMyListings((prev) => [dup, ...prev]);
  };

  // Handlers for Booking Requests
  const handleAcceptRequest = (reqId) => {
    setBookingRequests((prev) =>
      prev.map((req) => (req.id === reqId ? { ...req, status: 'Approved' } : req))
    );
  };

  const handleRejectRequest = (reqId) => {
    setBookingRequests((prev) =>
      prev.map((req) => (req.id === reqId ? { ...req, status: 'Rejected' } : req))
    );
  };

  // Handler for Chat
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    const activeConv = conversations.find((c) => c.id === activeConvId);
    if (!activeConv) return;

    const newM = {
      id: 'msg-' + Date.now(),
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      text: chatText.trim(),
      timestamp: 'Just now',
      read: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: newM.text,
            updatedAt: 'Just now',
            messages: [...c.messages, newM],
          };
        }
        return c;
      })
    );
    setChatText('');
  };

  // Handler for Review Reply
  const handleReplyReview = (reviewId) => {
    const text = replyTextMap[reviewId];
    if (!text || !text.trim()) return;

    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, ownerReply: text.trim() } : r))
    );
    setReplyTextMap((prev) => ({ ...prev, [reviewId]: '' }));
  };

  // Finish Multi-step Add Room Form
  const handlePublishNewRoom = async (isDraft = false) => {
    const createdRoom = {
      title: newTitle || 'Minimalist Urban Residence',
      slug: (newTitle || 'minimalist-residence').toLowerCase().replace(/\s+/g, '-'),
      type: newRoomType,
      roomType: newRoomType,
      propertyType: newPropType,
      city: newCity,
      neighborhood: newNeighborhood || 'Downtown',
      address: newAddress || '100 Main Street',
      location: newAddress || newNeighborhood || newCity,
      country: newCountry,
      state: newState,
      rentPerMonth: Number(newRent),
      price: Number(newRent),
      deposit: Number(newDeposit),
      maintenanceCharges: Number(newMaintenance),
      sqft: Number(newSqft),
      bedrooms: 1,
      bathrooms: 1,
      floorNumber: Number(newFloor),
      numberOfRooms: Number(newTotalRooms),
      verified: true,
      featured: false,
      rating: 5.0,
      reviewCount: 0,
      images: [newCoverImage, ...newGalleryImages],
      description: newDesc || 'Ultra-clean room designed with premium finishes.',
      amenities: selectedAmenities,
      houseRules: ['No smoking indoors', 'Quiet hours after 10 PM'],
      host: {
        name: user?.name || 'Property Owner',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        isSuperhost: true,
        responseTime: '10 mins',
        memberSince: '2025',
        rating: 5.0,
        reviewsCount: 1,
      },
      availableFrom: newAvailableDate,
      minLeaseMonths: Number(newMinLease),
      lat: 19.8762,
      lng: 75.3433,
      reviews: [],
      status: isDraft ? 'Draft' : 'Published',
      available: !isDraft,
      viewsCount: 1,
      bookingsCount: 0,
    };

    const saved = await onAddNewRoom(createdRoom);
    if (saved) {
      setMyListings((prev) => [saved, ...prev.filter((l) => l.id !== saved.id)]);
    } else {
      setMyListings((prev) => [{ ...createdRoom, id: 'room-' + Date.now() }, ...prev]);
    }

    // Reset Form
    setAddStep(1);
    setNewTitle('');
    setNewDesc('');
    setActiveTab('listings');
  };

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const totalEarnings = myListings.reduce((sum, r) => sum + r.rentPerMonth, 0);
  const activeBookingsCount = bookingRequests.filter((r) => r.status === 'Approved').length;
  const pendingRequestsCount = bookingRequests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Minimal Owner Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/90 p-4 shadow-xs space-y-6 sticky top-24">
          
          {/* Owner Host Profile Badge */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="text-xs font-bold text-slate-900 truncate">{user.name}</h3>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 fill-blue-50 shrink-0" />
              </div>
              <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.2 rounded-full border border-blue-100 uppercase tracking-wider">
                Verified Host
              </span>
            </div>
          </div>

          {/* Navigation Menu Links */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'listings', label: 'My Listings', icon: Building2, count: myListings.length },
              { id: 'add_room', label: 'Add New Room', icon: PlusCircle },
              { id: 'requests', label: 'Booking Requests', icon: CalendarCheck, count: pendingRequestsCount },
              { id: 'messages', label: 'Messages', icon: MessageSquare, count: 1 },
              { id: 'earnings', label: 'Earnings Analytics', icon: DollarSign },
              { id: 'reviews', label: 'Tenant Reviews', icon: Star },
              { id: 'verification', label: 'Identity & Verification', icon: ShieldCheck },
              { id: 'settings', label: 'Account Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`owner-menu-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white text-blue-600' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              id="owner-logout-btn"
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors mt-4"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Host Portal</span>
            </button>
          </nav>
        </aside>

        {/* Main Content View Container */}
        <main className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Nestora Premier Host Portal</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Host Control Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Manage high-yielding property listings, accept tenant bookings, and track escrow revenues.
                  </p>
                </div>

                <button
                  id="owner-header-add-room-btn"
                  onClick={() => setActiveTab('add_room')}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List New Property</span>
                </button>
              </div>

              {/* Statistics Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Listings</span>
                  <p className="text-xl font-extrabold text-slate-900">{myListings.length}</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Bookings</span>
                  <p className="text-xl font-extrabold text-emerald-600">{activeBookingsCount}</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly Revenue</span>
                  <p className="text-xl font-extrabold text-slate-900">${totalEarnings.toLocaleString()}</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Views</span>
                  <p className="text-xl font-extrabold text-blue-600">2,130</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Requests</span>
                  <p className="text-xl font-extrabold text-amber-600">{pendingRequestsCount}</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Occupancy Rate</span>
                  <p className="text-xl font-extrabold text-slate-900">92%</p>
                </div>
              </div>

              {/* Pending Requests Quick Action */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-blue-600" />
                    <span>Recent Tenant Booking Requests</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View All Requests
                  </button>
                </div>

                {bookingRequests.length > 0 ? (
                  <div className="space-y-3">
                    {bookingRequests.map((req) => (
                      <div
                        key={req.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={req.tenantPhoto}
                            alt={req.tenantName}
                            className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">{req.tenantName}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Property: <span className="font-semibold text-slate-800">{req.roomTitle}</span>
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Requested Move-In: {req.requestedMoveInDate} • {req.leaseMonths} mo lease
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          {req.status === 'Pending' ? (
                            <>
                              <button
                                id={`accept-req-btn-${req.id}`}
                                onClick={() => handleAcceptRequest(req.id)}
                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                              >
                                Accept Application
                              </button>
                              <button
                                id={`reject-req-btn-${req.id}`}
                                onClick={() => handleRejectRequest(req.id)}
                                className="px-3.5 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs rounded-xl transition-colors"
                              >
                                Decline
                              </button>
                            </>
                          ) : (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                req.status === 'Approved'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              Status: {req.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                    No booking requests right now.
                  </div>
                )}
              </div>

              {/* Recent Activity Timeline */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-base font-bold text-slate-900">Recent Activity Log</h2>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <span className="font-semibold text-slate-900">The Solarium Loft</span>
                      <span className="text-slate-500">gained 42 new listing views</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="font-semibold text-slate-900">Escrow Transfer</span>
                      <span className="text-slate-500">Security deposit $2,000 confirmed</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Yesterday</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MY LISTINGS */}
          {activeTab === 'listings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">My Property Listings</h1>
                  <p className="text-xs text-slate-500">
                    Manage active spaces, pause availability, or adjust monthly pricing.
                  </p>
                </div>

                <button
                  id="add-room-top-btn"
                  onClick={() => setActiveTab('add_room')}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Listing</span>
                </button>
              </div>

              {/* Listings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myListings.map((room, rIdx) => (
                  <div
                    key={room.id || room._id || `owner-listing-${rIdx}`}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/9] bg-slate-100">
                      <img
                        src={(room.images && room.images[0]) || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'}
                        alt={room.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold shadow-xs backdrop-blur-xs ${
                            room.status === 'Published'
                              ? 'bg-emerald-500 text-white'
                              : room.status === 'Booked'
                              ? 'bg-blue-600 text-white'
                              : room.status === 'Paused'
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-700 text-white'
                          }`}
                        >
                          {room.status || 'Published'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-slate-900 text-base">{room.title}</h3>
                          <span className="font-bold text-slate-900 text-sm">
                            ${Number(room.rentPerMonth || room.price || 0).toLocaleString()}/mo
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{room.address || room.location || 'Central'}, {room.city}</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-2 bg-slate-50 rounded-xl text-center text-xs text-slate-600">
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase font-bold">Views</span>
                          <span className="font-bold text-slate-800">{room.viewsCount || 420}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase font-bold">Rating</span>
                          <span className="font-bold text-slate-800">★ {room.rating || 5.0}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase font-bold">Min Lease</span>
                          <span className="font-bold text-slate-800">{room.minLeaseMonths || 3} mo</span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                        <button
                          id={`view-listing-${room.id}`}
                          onClick={() => onSelectRoom(room.id)}
                          className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Public Page</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            id={`pause-listing-${room.id}`}
                            onClick={() => handleTogglePauseStatus(room.id)}
                            className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                            title={room.status === 'Published' ? 'Pause Listing' : 'Publish Listing'}
                          >
                            {room.status === 'Published' ? (
                              <PauseCircle className="w-4 h-4 text-amber-600" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-emerald-600" />
                            )}
                          </button>

                          <button
                            id={`duplicate-listing-${room.id}`}
                            onClick={() => handleDuplicateListing(room)}
                            className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                            title="Duplicate Listing"
                          >
                            <Copy className="w-4 h-4 text-slate-600" />
                          </button>

                          <button
                            id={`delete-listing-${room.id}`}
                            onClick={() => handleDeleteListing(room.id)}
                            className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW ROOM MULTI-STEP FORM (6 STEPS) */}
          {activeTab === 'add_room' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-8 animate-in fade-in duration-200">
              
              {/* Header */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Add New Property Listing</h1>
                <p className="text-xs text-slate-500">
                  Step {addStep} of 6 — Complete basic details, pricing, amenities, and imagery.
                </p>
              </div>

              {/* Progress Steps Indicator */}
              <div className="grid grid-cols-6 gap-1 sm:gap-2">
                {[
                  '1. Basic Details',
                  '2. Location',
                  '3. Pricing',
                  '4. Amenities',
                  '5. Images',
                  '6. Review',
                ].map((sName, idx) => {
                  const stepNum = idx + 1;
                  const isCurrent = addStep === stepNum;
                  const isDone = addStep > stepNum;
                  return (
                    <div
                      key={sName}
                      onClick={() => {
                        if (isDone) setAddStep(stepNum);
                      }}
                      className={`h-2 rounded-full cursor-pointer transition-all ${
                        isCurrent ? 'bg-blue-600' : isDone ? 'bg-emerald-500' : 'bg-slate-100'
                      }`}
                      title={sName}
                    />
                  );
                })}
              </div>

              {/* STEP 1: Basic Details */}
              {addStep === 1 && (
                <div className="space-y-4 max-w-xl animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Step 1: Basic Property Details
                  </h3>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Property Title</label>
                    <input
                      type="text"
                      placeholder="e.g. The Glass House Penthouse in SoMa"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Property Type</label>
                      <select
                        value={newPropType}
                        onChange={(e) => setNewPropType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Loft">Loft</option>
                        <option value="Condo">Condo</option>
                        <option value="Studio">Studio</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Room Category</label>
                      <select
                        value={newRoomType}
                        onChange={(e) => setNewRoomType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="Studio">Studio</option>
                        <option value="Private Room">Private Room</option>
                        <option value="Penthouse Suite">Penthouse Suite</option>
                        <option value="Loft">Loft</option>
                        <option value="1-Bedroom">1-Bedroom</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Area (sq ft)</label>
                      <input
                        type="number"
                        value={newSqft}
                        onChange={(e) => setNewSqft(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Floor Number</label>
                      <input
                        type="number"
                        value={newFloor}
                        onChange={(e) => setNewFloor(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Number of Rooms</label>
                      <input
                        type="number"
                        value={newTotalRooms}
                        onChange={(e) => setNewTotalRooms(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Detailed Description</label>
                    <textarea
                      rows={4}
                      placeholder="Describe architectural style, natural lighting, and neighborhood perks..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Location */}
              {addStep === 2 && (
                <div className="space-y-4 max-w-xl animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Step 2: Property Location & Address
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Country</label>
                      <input
                        type="text"
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">State / Region</label>
                      <input
                        type="text"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">City</label>
                      <select
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="San Francisco">San Francisco</option>
                        <option value="New York">New York</option>
                        <option value="Austin">Austin</option>
                        <option value="London">London</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="Berlin">Berlin</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Neighborhood / Area</label>
                      <input
                        type="text"
                        placeholder="e.g. SoMa / Hayes Valley"
                        value={newNeighborhood}
                        onChange={(e) => setNewNeighborhood(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Street Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 420 Mission Street, Suite 1200"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Simulated Map Pin */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Google Maps Pin Verified</p>
                      <p className="text-[11px] text-slate-500">
                        Latitude 37.7892, Longitude -122.4014 auto-geocoded.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Pricing */}
              {addStep === 3 && (
                <div className="space-y-4 max-w-xl animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Step 3: Pricing & Lease Schedule
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Monthly Rent ($)</label>
                      <input
                        type="number"
                        value={newRent}
                        onChange={(e) => setNewRent(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Security Deposit ($)</label>
                      <input
                        type="number"
                        value={newDeposit}
                        onChange={(e) => setNewDeposit(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Maintenance ($/mo)</label>
                      <input
                        type="number"
                        value={newMaintenance}
                        onChange={(e) => setNewMaintenance(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Available From</label>
                      <input
                        type="date"
                        value={newAvailableDate}
                        onChange={(e) => setNewAvailableDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Minimum Lease (Months)</label>
                      <input
                        type="number"
                        value={newMinLease}
                        onChange={(e) => setNewMinLease(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Amenities */}
              {addStep === 4 && (
                <div className="space-y-4 max-w-xl animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Step 4: Select Included Amenities
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {AMENITY_OPTIONS.map((a) => {
                      const checked = selectedAmenities.includes(a);
                      return (
                        <button
                          key={a}
                          type="button"
                          onClick={() => {
                            if (checked) {
                              setSelectedAmenities(selectedAmenities.filter((item) => item !== a));
                            } else {
                              setSelectedAmenities([...selectedAmenities, a]);
                            }
                          }}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                            checked
                              ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold shadow-2xs'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{a}</span>
                          {checked && <Check className="w-3.5 h-3.5 text-blue-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: Images */}
              {addStep === 5 && (
                <div className="space-y-4 max-w-xl animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Step 5: High-Res Photo Gallery
                  </h3>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Main Cover Photo URL</label>
                    <input
                      type="text"
                      value={newCoverImage}
                      onChange={(e) => setNewCoverImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Drag & Drop Upload Zone Simulation */}
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 p-6 rounded-2xl text-center bg-slate-50/50 space-y-2 cursor-pointer transition-colors">
                    <Upload className="w-8 h-8 text-blue-600 mx-auto" />
                    <p className="text-xs font-bold text-slate-900">Drag & Drop additional gallery photos here</p>
                    <p className="text-[11px] text-slate-400">Supports JPG, PNG, WEBP up to 10MB each</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700">Gallery Preview</label>
                    <div className="grid grid-cols-3 gap-2">
                      <img
                        src={newCoverImage}
                        alt="Cover"
                        className="w-full h-20 object-cover rounded-xl border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      {newGalleryImages.map((imgUrl, i) => (
                        <img
                          key={i}
                          src={imgUrl}
                          alt={`Gallery ${i}`}
                          className="w-full h-20 object-cover rounded-xl border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Review & Publish */}
              {addStep === 6 && (
                <div className="space-y-6 max-w-xl animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Step 6: Review & Publish Listing
                  </h3>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={newCoverImage}
                        alt={newTitle}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{newTitle || 'Untitled Room'}</h4>
                        <p className="text-slate-500">{newAddress || 'Main Street'}, {newCity}</p>
                        <p className="font-bold text-blue-600 mt-0.5">${newRent}/mo rent</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-slate-600">
                      <p>Category: <span className="font-semibold text-slate-800">{newRoomType}</span></p>
                      <p>Type: <span className="font-semibold text-slate-800">{newPropType}</span></p>
                      <p>Area: <span className="font-semibold text-slate-800">{newSqft} sq ft</span></p>
                      <p>Deposit: <span className="font-semibold text-slate-800">${newDeposit}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      id="save-draft-btn"
                      onClick={() => handlePublishNewRoom(true)}
                      className="flex-1 py-3 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-50"
                    >
                      Save as Draft
                    </button>
                    <button
                      id="publish-listing-btn"
                      onClick={() => handlePublishNewRoom(false)}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Publish Listing Now
                    </button>
                  </div>
                </div>
              )}

              {/* Wizard Nav Controls */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  disabled={addStep === 1}
                  onClick={() => setAddStep((s) => Math.max(1, s - 1))}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1 ${
                    addStep === 1 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {addStep < 6 && (
                  <button
                    onClick={() => setAddStep((s) => Math.min(6, s + 1))}
                    className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 flex items-center gap-1"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: BOOKING REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Tenant Booking Applications</h1>
                <p className="text-xs text-slate-500">
                  Review applicant profiles, approve lease agreements, or start direct chat conversations.
                </p>
              </div>

              <div className="space-y-4">
                {bookingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={req.tenantPhoto}
                          alt={req.tenantName}
                          className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{req.tenantName}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{req.email} • {req.phone}</p>
                          <p className="text-xs font-semibold text-blue-600 mt-1">
                            Applied for: {req.roomTitle}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-3.5 py-1 rounded-full text-xs font-bold ${
                          req.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : req.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        Status: {req.status}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-700 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Applicant Message</span>
                      <p className="italic">"{req.message}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat with {req.tenantName}</span>
                      </button>

                      {req.status === 'Pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRejectRequest(req.id)}
                            className="px-3.5 py-1.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => handleAcceptRequest(req.id)}
                            className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-xs"
                          >
                            Accept & Approve Lease
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden h-[600px] grid grid-cols-1 md:grid-cols-12 animate-in fade-in duration-200">
              
              {/* Left Conversation List */}
              <div className="md:col-span-4 border-r border-slate-200 p-4 space-y-3 overflow-y-auto">
                <h2 className="text-sm font-bold text-slate-900">Tenant Messages</h2>
                <div className="space-y-1">
                  {conversations.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveConvId(c.id)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 ${
                        activeConvId === c.id ? 'bg-blue-50/80 border border-blue-200' : 'hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={c.participantAvatar}
                        alt={c.participantName}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{c.participantName}</p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{c.roomTitle}</p>
                        <p className="text-xs text-slate-600 truncate mt-1">{c.lastMessage}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Chat Body */}
              <div className="md:col-span-8 flex flex-col justify-between h-full bg-slate-50/50">
                {activeConv ? (
                  <>
                    <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={activeConv.participantAvatar}
                          alt={activeConv.participantName}
                          className="w-9 h-9 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">{activeConv.participantName}</h3>
                          <p className="text-[10px] text-slate-500">{activeConv.roomTitle}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 overflow-y-auto flex-1">
                      {activeConv.messages.map((m) => {
                        const isMe = m.senderId === user.id;
                        return (
                          <div
                            key={m.id}
                            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                          >
                            <div
                              className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-xs ${
                                isMe
                                  ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                              }`}
                            >
                              <p>{m.text}</p>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
                          </div>
                        );
                      })}
                    </div>

                    <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type reply to tenant..."
                        value={chatText}
                        onChange={(e) => setChatText(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-slate-400">
                    Select a conversation
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 6: EARNINGS ANALYTICS */}
          {activeTab === 'earnings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Earnings & Revenue Analytics</h1>
                <p className="text-xs text-slate-500">Real-time payouts held securely in Nestora Escrow</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total YTD Earnings</span>
                  <p className="text-2xl font-extrabold text-slate-900">$17,100</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">July Escrow Payout</span>
                  <p className="text-2xl font-extrabold text-emerald-600">$4,950</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Next Scheduled Payout</span>
                  <p className="text-2xl font-extrabold text-blue-600">August 1, 2026</p>
                </div>
              </div>

              {/* Monthly Revenue Visualizer Bar Graph */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">2026 Revenue Trends ($)</h3>
                <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-slate-100">
                  {[
                    { month: 'Jan', val: 3200 },
                    { month: 'Feb', val: 3800 },
                    { month: 'Mar', val: 4100 },
                    { month: 'Apr', val: 4200 },
                    { month: 'May', val: 4950 },
                    { month: 'Jun', val: 4950 },
                    { month: 'Jul', val: 4950 },
                  ].map((item) => (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <div
                        className="w-full bg-blue-600 group-hover:bg-blue-700 rounded-t-lg transition-all"
                        style={{ height: `${(item.val / 5000) * 100}%` }}
                      />
                      <span className="text-[10px] font-bold text-slate-500">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Tenant Reviews & Ratings</h1>
                <p className="text-xs text-slate-500">Maintain a 4.9+ rating to earn Superhost status</p>
              </div>

              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.tenantAvatar}
                          alt={rev.tenantName}
                          className="w-10 h-10 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{rev.tenantName}</h4>
                          <p className="text-[10px] text-slate-500">{rev.roomTitle} • {rev.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 italic">"{rev.comment}"</p>

                    {rev.ownerReply ? (
                      <div className="p-3 bg-blue-50/70 rounded-2xl text-xs text-slate-800 border border-blue-100">
                        <span className="font-bold text-blue-900 block mb-0.5">Your Host Reply:</span>
                        <p>{rev.ownerReply}</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <input
                          type="text"
                          placeholder="Write a polite public response..."
                          value={replyTextMap[rev.id] || ''}
                          onChange={(e) => setReplyTextMap({ ...replyTextMap, [rev.id]: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => handleReplyReview(rev.id)}
                          className="px-3.5 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                        >
                          Submit Host Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: IDENTITY & VERIFICATION */}
          {activeTab === 'verification' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Host Verification & Credentials</h1>
                <p className="text-xs text-slate-500">Verified hosts receive 3.5x more tenant applications</p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-emerald-900">Verified Property Owner Status Active</h3>
                  <p className="text-[11px] text-emerald-700">All identity and property ownership documents are confirmed.</p>
                </div>
              </div>

              <div className="space-y-3 max-w-xl text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">Government Photo ID</p>
                    <p className="text-[11px] text-slate-500">Passport / Driver License verified</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">Verified</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">Property Ownership Deed / Proof</p>
                    <p className="text-[11px] text-slate-500">Deed tax record confirmed</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">Verified</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Host Account Settings</h1>
                <p className="text-xs text-slate-500">Payout bank details and notification preferences</p>
              </div>

              <div className="space-y-4 max-w-xl text-xs text-slate-700">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Direct Deposit Escrow Bank Account</p>
                    <p className="text-[11px] text-slate-500">Chase Bank •••• 8812</p>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:underline">Edit Bank</button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
