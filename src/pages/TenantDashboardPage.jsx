import React, { useState } from 'react';
import { RoomCard } from '../components/RoomCard';
import {
  LayoutDashboard,
  Compass,
  Heart,
  CalendarCheck,
  MessageSquare,
  Bell,
  User as UserIcon,
  Settings,
  LogOut,
  ShieldCheck,
  ArrowRight,
  Send,
  Check
} from 'lucide-react';

export const TenantDashboardPage = ({
  user,
  allRooms,
  wishlist,
  onToggleWishlist,
  onSelectRoom,
  onNavigate,
  onLogout,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Tenant state
  const [tenantBookings, setTenantBookings] = useState(user.bookings || []);
  const [profileName, setProfileName] = useState(user.name);
  const [profilePhone, setProfilePhone] = useState(user.phone || '+1 (415) 890-2101');
  const [profileBio, setProfileBio] = useState(user.bio || 'Design engineer residing in SF. Looking for minimalist lofts with fiber internet.');
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);

  // Chat State
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      participantId: 'usr-owner-1',
      participantName: 'Elena Vance (Host)',
      participantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      participantRole: 'owner',
      roomTitle: 'The Solarium Loft in SoMa',
      lastMessage: 'Hi Alexandre, your move-in date for August 1st is approved!',
      unreadCount: 1,
      updatedAt: '10:42 AM',
      messages: [
        {
          id: 'm1',
          senderId: 'usr-tenant-1',
          senderName: 'Alexandre Mercer',
          senderAvatar: user.avatar,
          text: 'Hi Elena, I submitted my rental application for the Solarium Loft.',
          timestamp: 'Yesterday 4:15 PM',
          read: true,
        },
        {
          id: 'm2',
          senderId: 'usr-owner-1',
          senderName: 'Elena Vance',
          senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
          text: 'Hi Alexandre, your move-in date for August 1st is approved!',
          timestamp: '10:42 AM',
          read: false,
        },
      ],
    },
    {
      id: 'conv-2',
      participantId: 'usr-owner-2',
      participantName: 'Julian Sterling (Host)',
      participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      participantRole: 'owner',
      roomTitle: 'Monochrome Minimalist Suite',
      lastMessage: 'Feel free to schedule a virtual walk-through anytime.',
      unreadCount: 0,
      updatedAt: 'July 24',
      messages: [
        {
          id: 'm3',
          senderId: 'usr-owner-2',
          senderName: 'Julian Sterling',
          senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
          text: 'Feel free to schedule a virtual walk-through anytime.',
          timestamp: 'July 24',
          read: true,
        },
      ],
    },
  ]);
  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [chatInputText, setChatInputText] = useState('');

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      type: 'booking_approved',
      title: 'Application Approved',
      message: 'Elena Vance approved your application for The Solarium Loft in SoMa.',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: 'n2',
      type: 'payment_received',
      title: 'Escrow Receipt Confirmed',
      message: 'Your refundable security deposit of $2,000 is safely held in Nestora Escrow.',
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: 'n3',
      type: 'new_review',
      title: 'Welcome to Nestora',
      message: 'Your tenant identity documents were verified. Verified Resident Badge active.',
      timestamp: '3 days ago',
      read: true,
    },
  ]);

  const wishlistedRooms = allRooms.filter((r) => wishlist.includes(r.id));
  const recommendedRooms = allRooms.filter((r) => !wishlist.includes(r.id)).slice(0, 3);
  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInputText.trim() || !activeConv) return;

    const newMsg = {
      id: 'msg-' + Date.now(),
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      text: chatInputText.trim(),
      timestamp: 'Just now',
      read: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            lastMessage: newMsg.text,
            updatedAt: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
    setChatInputText('');
  };

  const handleCancelBooking = (bookingId) => {
    setTenantBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name: profileName,
      phone: profilePhone,
      bio: profileBio,
    };
    onUpdateUser(updated);
    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 3000);
  };

  const navMenuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'browse', label: 'Browse Rooms', icon: Compass },
    { id: 'saved', label: 'Saved Rooms', icon: Heart, count: wishlistedRooms.length },
    { id: 'bookings', label: 'My Bookings', icon: CalendarCheck, count: tenantBookings.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: 1 },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: notifications.filter(n => !n.read).length },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/90 p-4 shadow-xs space-y-6 sticky top-24">
          
          {/* User Mini Profile */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border border-blue-600"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-0.5 min-w-0">
              <h3 className="text-xs font-bold text-slate-900 truncate">{user.name}</h3>
              <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.2 rounded-full border border-blue-100 uppercase tracking-wider">
                Tenant
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`tenant-menu-${item.id}`}
                  onClick={() => {
                    if (item.id === 'browse') {
                      onNavigate('browse');
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
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
              id="tenant-logout-btn"
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors mt-4"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Resident Account</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Welcome back, {user.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Track your upcoming move-in dates, saved lofts, and active conversations with property owners.
                  </p>
                </div>

                <button
                  id="tenant-browse-more-btn"
                  onClick={() => onNavigate('browse')}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 shrink-0"
                >
                  <span>Explore Rooms</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Top Dashboard Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Upcoming Booking */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Upcoming Booking
                  </span>
                  <p className="text-xl font-extrabold text-slate-900">
                    {tenantBookings.length > 0 ? '1 Confirmed' : 'None Active'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {tenantBookings.length > 0 ? tenantBookings[0].roomTitle : 'Browse lofts to apply'}
                  </p>
                </div>

                {/* Card 2: Saved Rooms */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Saved Wishlist
                  </span>
                  <p className="text-xl font-extrabold text-slate-900">{wishlistedRooms.length} Rooms</p>
                  <p className="text-[11px] text-slate-500">Curated spaces in SF & NYC</p>
                </div>

                {/* Card 3: Recent Searches */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Recent Searches
                  </span>
                  <p className="text-xl font-extrabold text-slate-900">San Francisco</p>
                  <p className="text-[11px] text-slate-500">Studios under $3,000/mo</p>
                </div>

                {/* Card 4: Escrow Protection */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Escrow Security
                  </span>
                  <p className="text-xl font-extrabold text-emerald-600">100% Protected</p>
                  <p className="text-[11px] text-slate-500">Institutional Escrow Account</p>
                </div>

              </div>

              {/* Section: Upcoming Booking Application Banner */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-blue-600" />
                    <span>My Move-In & Applications</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View All ({tenantBookings.length})
                  </button>
                </div>

                {tenantBookings.length > 0 ? (
                  <div className="space-y-3">
                    {tenantBookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={b.roomImage}
                            alt={b.roomTitle}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">{b.roomTitle}</h3>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                              <span>Move-in: {b.moveInDate}</span>
                              <span>•</span>
                              <span>{b.leaseDurationMonths} mo term</span>
                            </p>
                            <p className="text-xs font-bold text-slate-900 mt-1">
                              ${b.monthlyRent.toLocaleString()} / mo
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              b.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : b.status === 'Cancelled'
                                ? 'bg-slate-100 text-slate-500 border border-slate-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            Status: {b.status}
                          </span>
                          <button
                            id={`tenant-view-room-${b.roomId}`}
                            onClick={() => onSelectRoom(b.roomId)}
                            className="px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50 text-slate-800"
                          >
                            View Space
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                    No active rental applications submitted yet.
                  </div>
                )}
              </div>

              {/* Section: Recommended Rooms */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Recommended for You</h2>
                  <button
                    onClick={() => onNavigate('browse')}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    See All Listings
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {recommendedRooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      isWishlisted={wishlist.includes(room.id)}
                      onToggleWishlist={onToggleWishlist}
                      onSelectRoom={onSelectRoom}
                    />
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SAVED ROOMS */}
          {activeTab === 'saved' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Saved Wishlist Rooms</h1>
                <p className="text-xs text-slate-500">
                  {wishlistedRooms.length} room{wishlistedRooms.length === 1 ? '' : 's'} saved to your personal collection.
                </p>
              </div>

              {wishlistedRooms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistedRooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      isWishlisted={true}
                      onToggleWishlist={onToggleWishlist}
                      onSelectRoom={onSelectRoom}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
                  <Heart className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">Your wishlist is currently empty.</p>
                  <button
                    onClick={() => onNavigate('browse')}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-xl"
                  >
                    Explore Available Spaces
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BOOKINGS / APPLICATIONS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Booking Applications & History</h1>
                <p className="text-xs text-slate-500">
                  Review lease durations, deposit statuses, and owner approvals.
                </p>
              </div>

              {tenantBookings.length > 0 ? (
                <div className="space-y-4">
                  {tenantBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={b.roomImage}
                            alt={b.roomTitle}
                            className="w-20 h-20 rounded-2xl object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                              Application #{b.id}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-1">{b.roomTitle}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Submitted on {b.createdAt}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                              b.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : b.status === 'Cancelled'
                                ? 'bg-slate-100 text-slate-500 border border-slate-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            Status: {b.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-2xl text-xs text-slate-700">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Move-in Date</span>
                          <span className="font-bold text-slate-900">{b.moveInDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Lease Term</span>
                          <span className="font-bold text-slate-900">{b.leaseDurationMonths} Months</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Rent</span>
                          <span className="font-bold text-slate-900">${b.monthlyRent.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Escrow Deposit</span>
                          <span className="font-bold text-slate-900">${b.deposit.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setActiveTab('messages');
                          }}
                          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat with Property Owner</span>
                        </button>

                        {b.status === 'Pending' && (
                          <button
                            id={`cancel-booking-btn-${b.id}`}
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-3.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors"
                          >
                            Cancel Application
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                  No booking applications submitted yet.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden h-[600px] grid grid-cols-1 md:grid-cols-12 animate-in fade-in duration-200">
              
              {/* Conversation List Left */}
              <div className="md:col-span-4 border-r border-slate-200 p-4 space-y-3 overflow-y-auto">
                <h2 className="text-sm font-bold text-slate-900">Conversations</h2>
                <div className="space-y-1">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConvId(conv.id)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 ${
                        activeConvId === conv.id ? 'bg-blue-50/80 border border-blue-200' : 'hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={conv.participantAvatar}
                        alt={conv.participantName}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900 truncate">{conv.participantName}</p>
                          <span className="text-[10px] text-slate-400">{conv.updatedAt}</span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">{conv.roomTitle}</p>
                        <p className="text-xs text-slate-600 truncate mt-1">{conv.lastMessage}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Window Right */}
              <div className="md:col-span-8 flex flex-col justify-between h-full bg-slate-50/50">
                {activeConv ? (
                  <>
                    {/* Chat Header */}
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
                          <p className="text-[10px] text-slate-500">Regarding {activeConv.roomTitle}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Verified Host
                      </span>
                    </div>

                    {/* Chat Messages Body */}
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

                    {/* Chat Input Bar */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type message to property owner..."
                        value={chatInputText}
                        onChange={(e) => setChatInputText(e.target.value)}
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
                    Select a conversation to start chatting
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-slate-900">Notification Center</h1>
                  <p className="text-xs text-slate-500">Updates on room requests and escrow receipts</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Mark All as Read
                </button>
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition-all ${
                      n.read ? 'bg-white border-slate-200/80' : 'bg-blue-50/50 border-blue-200 font-medium'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-900">{n.title}</p>
                        <p className="text-xs text-slate-600">{n.message}</p>
                        <span className="text-[10px] text-slate-400 block pt-1">{n.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Tenant Profile</h1>
                <p className="text-xs text-slate-500">Manage your verified contact info and bio</p>
              </div>

              {profileSavedMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
                <div className="flex items-center gap-4 pb-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{user.name}</span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                  <input
                    type="text"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Bio & Resident Overview</label>
                  <textarea
                    rows={3}
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
                <p className="text-xs text-slate-500">Security preferences and email notifications</p>
              </div>

              <div className="space-y-4 max-w-xl text-xs text-slate-700">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Email Notifications</p>
                    <p className="text-[11px] text-slate-500">Receive alerts when host approves booking</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">SMS Direct Alerts</p>
                    <p className="text-[11px] text-slate-500">Instant SMS when host sends chat message</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
