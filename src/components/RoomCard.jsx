import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, MapPin, ShieldCheck, Eye } from 'lucide-react';

export const RoomCard = ({
  room,
  isWishlisted,
  onToggleWishlist,
  onSelectRoom,
  onQuickView,
}) => {
  return (
    <motion.div
      onClick={() => onSelectRoom(room.id)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <motion.img
          src={room.images[0]}
          alt={room.title}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Gradient Overlay for Top Badges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {room.verified ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-white shadow-xs backdrop-blur-xs">
              {room.type}
            </span>
          )}

          {/* Wishlist Button with Heart Pop Animation */}
          <motion.button
            id={`wishlist-btn-${room.id}`}
            onClick={(e) => onToggleWishlist(room.id, e)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.8 }}
            animate={{ scale: isWishlisted ? [1, 1.25, 1] : 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-xs backdrop-blur-xs focus:outline-none"
            aria-label="Save to wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
              }`}
            />
          </motion.button>
        </div>

        {/* Hover Quick View Trigger */}
        {onQuickView && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 backdrop-blur-[2px]">
            <motion.button
              id={`quick-view-btn-${room.id}`}
              onClick={(e) => onQuickView(room, e)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/95 text-slate-900 text-xs font-semibold rounded-full shadow-md hover:bg-white flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              Quick View
            </motion.button>
          </div>
        )}

        {/* Bottom Image Tag - Room Type */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="text-[11px] font-semibold text-white/90 bg-slate-900/60 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            {room.type}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3">
        <div>
          {/* Header Row: Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
              {room.title}
            </h3>
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-800 shrink-0 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{room.rating}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{room.neighborhood}, {room.city}</span>
          </div>
        </div>

        {/* Specs Pill List */}
        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-600 pt-1">
          <span className="bg-slate-100 px-2.5 py-1 rounded-md">
            {room.sqft} sq ft
          </span>
          <span className="bg-slate-100 px-2.5 py-1 rounded-md">
            Min {room.minLeaseMonths} mo lease
          </span>
        </div>

        {/* Footer: Price & View Details Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-slate-900">${room.rentPerMonth.toLocaleString()}</span>
            <span className="text-xs text-slate-500 font-normal"> / mo</span>
          </div>

          <motion.span
            className="text-xs font-semibold text-blue-600 flex items-center gap-1"
            whileHover={{ x: 3 }}
          >
            View Details →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};
