import React, { useState, useEffect } from 'react';
import { INITIAL_ROOMS } from './data/rooms';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { AiHelperWidget } from './components/AiHelperWidget';
import { getRooms, createRoom, updateRoom, deleteRoom } from './api';

import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [activePage, setActivePage] = useState('home');
  const [selectedRoomId, setSelectedRoomId] = useState('room-1');
  const [wishlist, setWishlist] = useState(['room-1', 'room-3']);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user') || localStorage.getItem('nestora_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      id: 'usr-tenant-1',
      name: 'Alexandre Mercer',
      email: 'alexandre@nestora.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'tenant',
      phone: '+1 (415) 890-2101',
      bio: 'Design engineer residing in SF. Looking for minimalist lofts with fiber internet.',
      wishlist: ['room-1', 'room-3'],
      bookings: [
        {
          id: 'bk-101',
          roomId: 'room-1',
          roomTitle: 'The Solarium Loft in SoMa',
          roomImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
          moveInDate: '2026-08-01',
          leaseDurationMonths: 6,
          monthlyRent: 2850,
          deposit: 2000,
          status: 'Approved',
          createdAt: '2026-07-20',
        },
      ],
    };
  });

  // Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [bookingModalRoom, setBookingModalRoom] = useState(null);
  const [quickViewRoom, setQuickViewRoom] = useState(null);
  const [browseFilters, setBrowseFilters] = useState(undefined);

  // Fetch rooms from Backend on mount
  const fetchBackendRooms = async () => {
    try {
      const backendRooms = await getRooms();
      if (Array.isArray(backendRooms) && backendRooms.length > 0) {
        setRooms(backendRooms);
      }
    } catch (err) {
      console.log('Using initial client rooms store fallback:', err);
    }
  };

  useEffect(() => {
    fetchBackendRooms();
  }, []);

  // Listen for session expiry
  useEffect(() => {
    const handleAuthExpired = () => {
      setCurrentUser(null);
      setAuthModalMode('login');
      setAuthModalOpen(true);
    };
    window.addEventListener('nestora_auth_expired', handleAuthExpired);
    return () => window.removeEventListener('nestora_auth_expired', handleAuthExpired);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedRoomId]);

  // Handlers for Room CRUD
  const handleAddNewRoom = async (newRoom) => {
    try {
      const savedRoom = await createRoom(newRoom);
      if (savedRoom) {
        setRooms((prev) => [savedRoom, ...prev]);
        return savedRoom;
      }
    } catch (err) {
      console.error('Error saving room to MongoDB backend:', err);
      const fallbackRoom = {
        ...newRoom,
        id: newRoom.id || 'room-' + Date.now(),
        _id: newRoom._id || 'room-' + Date.now(),
      };
      setRooms((prev) => [fallbackRoom, ...prev]);
      return fallbackRoom;
    }
  };

  const handleUpdateRoom = async (updatedRoom) => {
    try {
      const saved = await updateRoom(updatedRoom.id, updatedRoom);
      if (saved) {
        setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? saved : r)));
        return saved;
      }
    } catch (err) {
      console.error('Error updating room on MongoDB backend:', err);
      setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoom(roomId);
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
    } catch (err) {
      console.error('Error deleting room from MongoDB backend:', err);
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
    }
  };

  const handleToggleWishlist = (roomId, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.includes(roomId);
      const next = exists ? prev.filter((id) => id !== roomId) : [...prev, roomId];
      if (currentUser) {
        const updatedUser = { ...currentUser, wishlist: next };
        setCurrentUser(updatedUser);
        try {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (err) {
          console.error(err);
        }
      }
      return next;
    });
  };

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
    setActivePage('room-detail');
  };

  const handleNavigate = (page) => {
    if (page === 'login') {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }
    if (page === 'register') {
      setAuthModalMode('register');
      setAuthModalOpen(true);
      return;
    }
    if (page === 'wishlist') {
      if (!currentUser) {
        setAuthModalMode('login');
        setAuthModalOpen(true);
      } else {
        setActivePage('dashboard');
      }
      return;
    }
    if (page === 'dashboard') {
      if (!currentUser) {
        setAuthModalMode('login');
        setAuthModalOpen(true);
        return;
      }
    }
    setActivePage(page);
  };

  const handleOpenBooking = (room) => {
    setBookingModalRoom(room);
  };

  const handleQuickView = (room, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setQuickViewRoom(room);
  };

  const handleHeroSearchWithFilter = (initialFilter) => {
    setBrowseFilters(initialFilter);
    setActivePage('browse');
  };

  const handleSubmitApplication = async (newBooking) => {
    const localBooking = {
      ...newBooking,
      id: 'bk-' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        bookings: [localBooking, ...currentUser.bookings],
      });
    } else {
      setCurrentUser({
        id: 'usr-guest-' + Date.now(),
        name: 'Resident Applicant',
        email: 'applicant@nestora.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: 'tenant',
        wishlist: wishlist,
        bookings: [localBooking],
      });
    }

    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBooking,
          userId: currentUser?.id,
          applicantName: currentUser?.name,
          applicantEmail: currentUser?.email,
        }),
      });
    } catch (err) {
      console.error('Error submitting application to server:', err);
    }
  };

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
      
      {/* Sticky Header */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        wishlistCount={wishlist.length}
        currentUser={currentUser}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode);
          setAuthModalOpen(true);
        }}
        onLogout={() => {
          setCurrentUser(null);
          setActivePage('home');
        }}
      />

      {/* Main Page View Switcher */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePage
            rooms={rooms}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectRoom={handleSelectRoom}
            onNavigate={handleNavigate}
            onSearchWithFilter={handleHeroSearchWithFilter}
            onQuickView={handleQuickView}
          />
        )}

        {activePage === 'browse' && (
          <BrowsePage
            rooms={rooms}
            wishlist={wishlist}
            initialFilters={browseFilters}
            onToggleWishlist={handleToggleWishlist}
            onSelectRoom={handleSelectRoom}
            onQuickView={handleQuickView}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activePage === 'room-detail' && selectedRoom && (
          <RoomDetailPage
            room={selectedRoom}
            allRooms={rooms}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectRoom={handleSelectRoom}
            onOpenBooking={handleOpenBooking}
            onNavigateBack={() => setActivePage('browse')}
          />
        )}

        {activePage === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {activePage === 'contact' && <ContactPage />}

        {activePage === 'dashboard' && currentUser && (
          <DashboardPage
            user={currentUser}
            allRooms={rooms}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectRoom={handleSelectRoom}
            onNavigate={handleNavigate}
            onLogout={() => {
              setCurrentUser(null);
              setActivePage('home');
            }}
            onUpdateUser={(updated) => setCurrentUser(updated)}
            onAddNewRoom={handleAddNewRoom}
            onUpdateRoom={handleUpdateRoom}
            onDeleteRoom={handleDeleteRoom}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Quick View Modal Overlay */}
      {quickViewRoom && (
        <QuickViewModal
          room={quickViewRoom}
          onClose={() => setQuickViewRoom(null)}
          onSelectFullDetails={handleSelectRoom}
          onOpenBooking={handleOpenBooking}
        />
      )}

      {/* Booking / Rental Application Modal Overlay */}
      {bookingModalRoom && (
        <BookingModal
          room={bookingModalRoom}
          onClose={() => setBookingModalRoom(null)}
          onSubmitApplication={handleSubmitApplication}
        />
      )}

      {/* Auth Login / Register Modal Overlay */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setWishlist(user.wishlist || []);
          setActivePage('dashboard');
        }}
      />

      {/* Floating AI Helper Widget across all pages */}
      <AiHelperWidget
        rooms={rooms}
        onSelectRoom={handleSelectRoom}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
