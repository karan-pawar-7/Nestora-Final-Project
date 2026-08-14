import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomCard } from '../components/RoomCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import {
  ShieldCheck,
  Star,
  MapPin,
  Heart,
  Share2,
  Check,
  ArrowRight,
  ChevronLeft,
  X
} from 'lucide-react';

export const RoomDetailPage = ({
  room,
  allRooms,
  wishlist,
  onToggleWishlist,
  onSelectRoom,
  onOpenBooking,
  onNavigateBack,
}) => {
  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [selectedLeaseMonths, setSelectedLeaseMonths] = useState(room.minLeaseMonths || 3);
  const [copiedShare, setCopiedShare] = useState(false);

  const isWishlisted = wishlist.includes(room.id);
  const similarRooms = allRooms.filter((r) => r.id !== room.id && r.city === room.city).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <motion.button
          id="room-detail-back-btn"
          onClick={onNavigateBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Listings
        </motion.button>

        <div className="flex items-center gap-2">
          <motion.button
            id="room-detail-share-btn"
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus:outline-none relative"
            title="Share room link"
          >
            <Share2 className="w-4 h-4" />
            <AnimatePresence>
              {copiedShare && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-md whitespace-nowrap shadow-md"
                >
                  Link Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            id="room-detail-wishlist-btn"
            onClick={(e) => onToggleWishlist(room.id, e)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            animate={{ scale: isWishlisted ? [1, 1.25, 1] : 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus:outline-none"
            title="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
          </motion.button>
        </div>
      </div>

      {/* Header Info Block */}
      <ScrollReveal className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {room.verified && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Verified Property
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            {room.type}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            {room.city}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {room.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{room.address}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-slate-900">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{room.rating}</span>
            <span className="text-slate-400">({room.reviewCount} reviews)</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Photo Gallery Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden border border-slate-200 shadow-xs max-h-[480px]"
      >
        
        {/* Main Large Image */}
        <div
          onClick={() => setActivePhotoModal(0)}
          className="md:col-span-2 relative aspect-[4/3] md:aspect-auto h-full bg-slate-100 cursor-pointer overflow-hidden group"
        >
          <motion.img
            src={room.images[0]}
            alt={room.title}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Thumbnails Column */}
        {room.images.slice(1, 4).map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActivePhotoModal(idx + 1)}
            className="relative aspect-[4/3] md:aspect-auto h-full bg-slate-100 cursor-pointer overflow-hidden group hidden md:block"
          >
            <motion.img
              src={img}
              alt={`Photo ${idx + 2}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {idx === 2 && room.images.length > 4 && (
              <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white font-bold text-xs">
                +{room.images.length - 4} Photos
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Main Content & Sticky Booking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (Room Details, Host, Amenities, Rules) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Key Attribute Pills Bar */}
          <ScrollReveal className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Area Size</span>
              <p className="text-sm font-extrabold text-slate-900">{room.sqft} sq ft</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Bedrooms</span>
              <p className="text-sm font-extrabold text-slate-900">{room.bedrooms} Bedroom</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Bathrooms</span>
              <p className="text-sm font-extrabold text-slate-900">{room.bathrooms} Bath</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Min Term</span>
              <p className="text-sm font-extrabold text-slate-900">{room.minLeaseMonths} Month{room.minLeaseMonths === 1 ? '' : 's'}</p>
            </div>
          </ScrollReveal>

          {/* Host Profile Block */}
          <ScrollReveal className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={room.host.avatar}
                alt={room.host.name}
                className="w-14 h-14 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">Hosted by {room.host.name}</h3>
                  {room.host.isSuperhost && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      Superhost
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Member since {room.host.memberSince} • Responds {room.host.responseTime}
                </p>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900 flex items-center justify-end gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{room.host.rating}</span>
              </div>
              <span className="text-[11px] text-slate-400">{room.host.reviewsCount} host reviews</span>
            </div>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">About this Space</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {room.description}
            </p>
          </ScrollReveal>

          {/* Included Amenities */}
          <ScrollReveal className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Included Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800"
                >
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* House Rules & Escrow Terms */}
          <ScrollReveal className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">House Rules & Terms</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {room.houseRules.map((rule, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Reviews Section */}
          <ScrollReveal className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Tenant Reviews</span>
                <span className="text-xs bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline mr-1" />
                  {room.rating}
                </span>
              </h3>
            </div>

            <div className="space-y-4">
              {room.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        className="w-8 h-8 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{rev.userName}</p>
                        <p className="text-[10px] text-slate-400">{rev.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>

        {/* Right Sticky Booking Widget */}
        <div className="lg:col-span-4 sticky top-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl space-y-6"
          >
            
            {/* Rent Rate Header */}
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-3xl font-extrabold text-slate-900">${room.rentPerMonth.toLocaleString()}</span>
                <span className="text-xs text-slate-500 font-normal"> / month</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Deposit: ${room.deposit}</span>
            </div>

            {/* Term Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Lease Term
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[1, 3, 6, 12].map((m) => {
                  const isSelected = selectedLeaseMonths === m;
                  return (
                    <motion.button
                      key={m}
                      onClick={() => setSelectedLeaseMonths(m)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {m} Month{m === 1 ? '' : 's'}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Monthly Rent</span>
                <span className="font-semibold text-slate-900">${room.rentPerMonth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Escrow Security Deposit</span>
                <span className="font-semibold text-slate-900">${room.deposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Application Fee</span>
                <span className="font-bold text-emerald-600">$0 Free</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-slate-900 text-sm">
                <span>Est. First Month Move-In</span>
                <span>${(room.rentPerMonth + room.deposit).toLocaleString()}</span>
              </div>
            </div>

            {/* Apply Button */}
            <motion.button
              id="room-detail-apply-now-btn"
              onClick={() => onOpenBooking(room)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2 group"
            >
              <span>Apply for Space</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Guarantee Note */}
            <div className="text-center text-[11px] text-slate-400 space-y-1">
              <p className="flex items-center justify-center gap-1 font-medium text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Nestora Physical Verification Guarantee
              </p>
              <p>No deposit charged until lease agreement is signed.</p>
            </div>

          </motion.div>
        </div>

      </div>

      {/* Similar / Recommended Rooms */}
      {similarRooms.length > 0 && (
        <section className="pt-12 border-t border-slate-100 space-y-6">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Similar Rooms in {room.city}
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarRooms.map((simRoom) => (
              <StaggerItem key={simRoom.id}>
                <RoomCard
                  room={simRoom}
                  isWishlisted={wishlist.includes(simRoom.id)}
                  onToggleWishlist={onToggleWishlist}
                  onSelectRoom={onSelectRoom}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* Lightbox Modal for Gallery */}
      <AnimatePresence>
        {activePhotoModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhotoModal(null)}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.button
              onClick={() => setActivePhotoModal(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-slate-800 rounded-full z-20"
            >
              <X className="w-6 h-6" />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={room.images[activePhotoModal]}
              alt="Full size view"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
