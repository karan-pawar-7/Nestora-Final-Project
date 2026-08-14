import React, { useState } from 'react';
import { MapPin, Navigation, Star, ArrowRight } from 'lucide-react';

export const InteractiveMap = ({
  rooms,
  selectedRoomId,
  onSelectRoom,
  onOpenBooking,
}) => {
  const [activePinId, setActivePinId] = useState(selectedRoomId || (rooms[0]?.id ?? null));

  const activeRoom = rooms.find((r) => r.id === activePinId) || rooms[0];

  return (
    <div className="relative w-full h-[600px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex flex-col justify-between p-4">
      {/* Map Background Canvas (Styled Minimal Vector Representation) */}
      <div className="absolute inset-0 bg-[#0F172A] opacity-95">
        {/* Vector Grid & Roads */}
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* River / Coast vector */}
          <path d="M -50,120 Q 200,180 400,100 T 900,300 T 1400,150" fill="none" stroke="#2563EB" strokeWidth="18" opacity="0.4" />
          <path d="M 100,-20 L 120,800" fill="none" stroke="#64748B" strokeWidth="3" opacity="0.3" />
          <path d="M 0,350 L 1200,350" fill="none" stroke="#64748B" strokeWidth="3" opacity="0.3" />
        </svg>
      </div>

      {/* Top Map Controls */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>Interactive Location View ({rooms.length} Pins)</span>
        </div>
      </div>

      {/* Room Price Pins Positioned across canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12">
        {rooms.map((room, idx) => {
          // Calculate stylized relative position coordinates
          const leftPercent = 15 + ((idx * 27) % 70);
          const topPercent = 20 + ((idx * 33) % 60);

          const isSelected = activePinId === room.id;

          return (
            <div
              key={room.id}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
            >
              <button
                id={`map-pin-${room.id}`}
                onClick={() => {
                  setActivePinId(room.id);
                  onSelectRoom(room.id);
                }}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-lg transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white scale-110 ring-4 ring-blue-500/40 z-30'
                    : 'bg-white text-slate-900 hover:bg-blue-50 hover:scale-105 z-20'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                <span>${(room.rentPerMonth / 1000).toFixed(1)}k</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Room Floating Preview Card */}
      {activeRoom && (
        <div className="relative z-20 max-w-sm w-full bg-slate-900/95 text-white backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-3">
          <div className="flex gap-3">
            <img
              src={activeRoom.images[0]}
              alt={activeRoom.title}
              className="w-20 h-20 rounded-xl object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase">
                  {activeRoom.city}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{activeRoom.rating}</span>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white truncate">{activeRoom.title}</h4>
              <p className="text-xs text-slate-400 truncate">{activeRoom.neighborhood}</p>

              <p className="text-sm font-bold text-white pt-1">
                ${activeRoom.rentPerMonth.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ mo</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <button
              id="map-card-view-btn"
              onClick={() => onSelectRoom(activeRoom.id)}
              className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl transition-colors text-center"
            >
              View Room Page
            </button>
            {onOpenBooking && (
              <button
                id="map-card-apply-btn"
                onClick={() => onOpenBooking(activeRoom)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-semibold rounded-xl transition-colors text-white flex items-center justify-center gap-1"
              >
                Apply
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
