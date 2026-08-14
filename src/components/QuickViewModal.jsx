import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MapPin, ShieldCheck, Check, ArrowRight, Bed, Bath, Maximize2 } from 'lucide-react';

export const QuickViewModal = ({
  room,
  onClose,
  onSelectFullDetails,
  onOpenBooking,
}) => {
  if (!room) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col md:flex-row z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            id="close-quickview-btn"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 z-20 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md backdrop-blur-xs focus:outline-none"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Left Image Showcase */}
          <div className="md:w-1/2 relative bg-slate-100 flex flex-col">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                src={room.images[activeImageIndex]}
                alt={room.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail Strip */}
            {room.images.length > 1 && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900/50 backdrop-blur-md rounded-xl">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-white scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Info Details */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Listing
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{room.rating} ({room.reviewCount} reviews)</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-snug">{room.title}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {room.address}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <Maximize2 className="w-4 h-4 mx-auto text-slate-500 mb-1" />
                  <span className="text-xs font-bold text-slate-900">{room.sqft} sq ft</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <Bed className="w-4 h-4 mx-auto text-slate-500 mb-1" />
                  <span className="text-xs font-bold text-slate-900">{room.bedrooms} Bed</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <Bath className="w-4 h-4 mx-auto text-slate-500 mb-1" />
                  <span className="text-xs font-bold text-slate-900">{room.bathrooms} Bath</span>
                </div>
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {room.description}
              </p>

              {/* Top Amenities */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  Featured Amenities
                </p>
                <div className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                  {room.amenities.slice(0, 4).map((a, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-slate-900">${room.rentPerMonth.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 font-normal"> / month</span>
                </div>
                <span className="text-xs text-slate-500">Deposit: ${room.deposit}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  id="quickview-details-btn"
                  onClick={() => {
                    onClose();
                    onSelectFullDetails(room.id);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 text-xs font-semibold border border-slate-200 rounded-xl text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  Full Room Details
                </motion.button>
                <motion.button
                  id="quickview-apply-btn"
                  onClick={() => {
                    onClose();
                    onOpenBooking(room);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 text-xs font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center gap-1"
                >
                  Apply Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
