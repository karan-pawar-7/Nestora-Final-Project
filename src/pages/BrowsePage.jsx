import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomCard } from '../components/RoomCard';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { InteractiveMap } from '../components/InteractiveMap';
import { SkeletonGrid } from '../components/SkeletonCard';
import { StaggerContainer, StaggerItem, ScrollReveal } from '../components/ScrollReveal';
import { RotateCcw, Building2 } from 'lucide-react';

export const BrowsePage = ({
  rooms,
  wishlist,
  initialFilters,
  onToggleWishlist,
  onSelectRoom,
  onQuickView,
  onOpenBooking,
}) => {
  const [filters, setFilters] = useState({
    searchQuery: initialFilters?.searchQuery || '',
    city: initialFilters?.city || '',
    roomType: initialFilters?.roomType || '',
    minPrice: 0,
    maxPrice: 5000,
    minLeaseMonths: 1,
    amenities: [],
    verifiedOnly: false,
    sortBy: 'recommended',
  });

  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);

  // Trigger brief skeleton loading on filter change for clean visual feedback
  const handleFilterChange = (newFilters) => {
    setIsLoading(true);
    setFilters(newFilters);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [filters]);

  // Filter & Sort Pipeline
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // City Filter
      if (filters.city && room.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Room Type
      if (filters.roomType && room.type !== filters.roomType) {
        return false;
      }

      // Max Rent
      if (room.rentPerMonth > filters.maxPrice) {
        return false;
      }

      // Verified Only
      if (filters.verifiedOnly && !room.verified) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = room.title.toLowerCase().includes(q);
        const matchesCity = room.city.toLowerCase().includes(q);
        const matchesNeigh = room.neighborhood.toLowerCase().includes(q);
        const matchesDesc = room.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCity && !matchesNeigh && !matchesDesc) {
          return false;
        }
      }

      // Amenities filter (must match all selected)
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((a) =>
          room.amenities.some((ra) => ra.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.rentPerMonth - b.rentPerMonth;
      if (filters.sortBy === 'price-desc') return b.rentPerMonth - a.rentPerMonth;
      if (filters.sortBy === 'rating-desc') return b.rating - a.rating;
      return 0; // recommended maintains initial editorial order
    });
  }, [rooms, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Title */}
      <ScrollReveal className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Browse Verified Rooms
        </h1>
        <p className="text-xs text-slate-500">
          Explore minimalist studios, suites, and lofts with flexible terms and transparent escrow deposits.
        </p>
      </ScrollReveal>

      {/* Filter Toolbar */}
      <SearchFilterBar
        filters={filters}
        onChangeFilters={handleFilterChange}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        totalResultsCount={filteredRooms.length}
      />

      {/* Main Listing View (Grid vs Map Split View) */}
      {viewMode === 'grid' ? (
        isLoading ? (
          <SkeletonGrid count={6} />
        ) : filteredRooms.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <StaggerItem key={room.id}>
                <RoomCard
                  room={room}
                  isWishlisted={wishlist.includes(room.id)}
                  onToggleWishlist={onToggleWishlist}
                  onSelectRoom={onSelectRoom}
                  onQuickView={onQuickView}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4"
          >
            <div className="w-12 h-12 bg-slate-100 rounded-2xl text-slate-400 mx-auto flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-lg font-bold text-slate-900">No rooms match your filter</h3>
              <p className="text-xs text-slate-500">
                Try widening your price range or clearing specific amenities.
              </p>
            </div>
            <motion.button
              id="empty-reset-filters-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                handleFilterChange({
                  searchQuery: '',
                  city: '',
                  roomType: '',
                  minPrice: 0,
                  maxPrice: 5000,
                  minLeaseMonths: 1,
                  amenities: [],
                  verifiedOnly: false,
                  sortBy: 'recommended',
                })
              }
              className="px-5 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-xs inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </motion.button>
          </motion.div>
        )
      ) : (
        /* Map View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 h-[650px] sticky top-24 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
            <InteractiveMap
              rooms={filteredRooms}
              onSelectRoom={onSelectRoom}
              onOpenBooking={onOpenBooking}
            />
          </div>

          <div className="lg:col-span-5 space-y-4 max-h-[650px] overflow-y-auto pr-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Listings ({filteredRooms.length})
            </p>
            {isLoading ? (
              <SkeletonGrid count={3} />
            ) : (
              filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isWishlisted={wishlist.includes(room.id)}
                  onToggleWishlist={onToggleWishlist}
                  onSelectRoom={onSelectRoom}
                  onQuickView={onQuickView}
                />
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};
